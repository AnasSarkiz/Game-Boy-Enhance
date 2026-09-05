"""Extract the pinned KiCad files with KiCad's own geometry/netlist readers.

Run with the Python distributed with KiCad (pcbnew must be importable).
No reference connectivity is inferred from PCB tracks: the schematic is authoritative.
"""

import json
import hashlib
import xml.etree.ElementTree as ET
from collections import Counter
from pathlib import Path
import pcbnew

ROOT = Path(__file__).resolve().parent.parent
PCB_PATH = ROOT / "reference/kicad/AGBM-02_AA_1-1.kicad_pcb"


def point(position):
    return {"x": round(pcbnew.ToMM(position.x), 6), "y": round(-pcbnew.ToMM(position.y), 6)}


def polygon(chain):
    return [point(chain.CPoint(index)) for index in range(chain.PointCount())]


def extract_pad(pad):
    width_mm, height_mm = pcbnew.ToMM(pad.GetSize())
    drill_width_mm, drill_height_mm = pcbnew.ToMM(pad.GetDrillSize())
    rotation_degrees = pad.GetOrientationDegrees() % 180
    copper_layers = ["bottom" if pad.GetLayer() == pcbnew.B_Cu else "top"]
    if pad.GetAttribute() in [pcbnew.PAD_ATTRIB_PTH, pcbnew.PAD_ATTRIB_NPTH]:
        copper_layers = ["top", "inner1", "inner2", "bottom"]
    result = {
        "number": pad.GetNumber(), "center": point(pad.GetPosition()),
        "width": width_mm, "height": height_mm,
        "rotation": pad.GetOrientationDegrees(),
        "layers": copper_layers, "net": pad.GetNetname(),
        "drillWidth": drill_width_mm, "drillHeight": drill_height_mm,
        "npth": pad.GetAttribute() == pcbnew.PAD_ATTRIB_NPTH,
        "shape": pad.GetShape(), "points": [],
        "cornerRadius": pcbnew.ToMM(pad.GetRoundRectCornerRadius()),
    }
    if pad.GetShape() not in [pcbnew.PAD_SHAPE_RECT, pcbnew.PAD_SHAPE_ROUNDRECT, pcbnew.PAD_SHAPE_OVAL, pcbnew.PAD_SHAPE_CIRCLE] or rotation_degrees not in [0, 90]:
        effective_polygon = pad.GetEffectivePolygon(pad.GetLayer())
        if effective_polygon.OutlineCount() != 1 or effective_polygon.HoleCount(0):
            raise ValueError(f"Unsupported compound pad: {pad.GetParentFootprint().GetReference()}.{pad.GetNumber()}")
        result["points"] = polygon(effective_polygon.Outline(0))
    return result


def extract_netlist():
    schematic = ET.parse(ROOT / "reference/netlist.xml").getroot()
    symbols = {}
    for symbol in schematic.findall("libparts/libpart"):
        symbols[(symbol.get("lib"), symbol.get("part"))] = [pin.attrib for pin in symbol.findall("pins/pin")]
    components = []
    for component in schematic.findall("components/comp"):
        symbol = component.find("libsource")
        components.append({
            "reference": component.get("ref"), "value": component.findtext("value"),
            "footprint": component.findtext("footprint"),
            "sheet": component.find("sheetpath").get("names"),
            "pins": symbols[(symbol.get("lib"), symbol.get("part"))],
            "properties": {prop.get("name"): prop.get("value", "") for prop in component.findall("property")},
        })
    nets = [{"name": net.get("name"), "nodes": [node.attrib for node in net.findall("node")]} for net in schematic.findall("nets/net")]
    return {"components": components, "nets": nets}


def main():
    board = pcbnew.LoadBoard(str(PCB_PATH))
    outlines = pcbnew.SHAPE_POLY_SET()
    if not board.GetBoardPolygonOutlines(outlines, False):
        raise ValueError("KiCad could not recover a closed outline")
    if outlines.OutlineCount() != 1:
        raise ValueError("Expected one board")
    netlist = extract_netlist()
    schematic_refs = {component["reference"] for component in netlist["components"]}
    footprints = []
    graphics = []
    for footprint in board.GetFootprints():
        if footprint.GetReference() not in schematic_refs:
            continue  # The five upstream bitmap logos are documented cosmetic omissions.
        footprints.append({
            "reference": footprint.GetReference(), "value": footprint.GetValue(),
            "position": point(footprint.GetPosition()), "rotation": footprint.GetOrientationDegrees(),
            "layer": "bottom" if footprint.GetLayer() == pcbnew.B_Cu else "top",
            "pads": [extract_pad(pad) for pad in footprint.Pads()],
        })
        for graphic in footprint.GraphicalItems():
            if graphic.GetLayer() in [pcbnew.F_Cu, pcbnew.B_Cu]:
                if graphic.GetShape() != pcbnew.SHAPE_T_POLY:
                    raise ValueError(f"Unsupported copper graphic in {footprint.GetReference()}")
                graphics.append({"reference": footprint.GetReference(), "layer": "top" if graphic.GetLayer() == pcbnew.F_Cu else "bottom", "points": polygon(graphic.GetPolyShape().Outline(0))})
    vias = [track for track in board.GetTracks() if isinstance(track, pcbnew.PCB_VIA)]
    result = {
        "upstreamCommit": "1c4d928bbfe7ed568c83c68ddea11a5f65f4e830",
        "pcbSha256": hashlib.sha256(PCB_PATH.read_bytes()).hexdigest(),
        "layers": board.GetCopperLayerCount(),
        "thickness": pcbnew.ToMM(board.GetDesignSettings().GetBoardThickness()),
        "outline": polygon(outlines.Outline(0)),
        "cutouts": [polygon(outlines.Hole(0, index)) for index in range(outlines.HoleCount(0))],
        "footprints": footprints, "copperGraphics": graphics, **netlist,
        "referenceRouting": {"tracks": len(list(board.GetTracks())) - len(vias), "vias": len(vias),
            "viaSizes": dict(Counter(f"{pcbnew.ToMM(via.GetWidth(pcbnew.F_Cu))}/{pcbnew.ToMM(via.GetDrillValue())}" for via in vias)),
            "zones": len(list(board.Zones()))},
    }
    (ROOT / "lib/generated/reference.json").write_text(json.dumps(result, indent=2) + "\n")
    print(json.dumps({"components": len(result["components"]), "nets": len(result["nets"]), "pads": sum(len(fp["pads"]) for fp in footprints), "outlineVertices": len(result["outline"]), "cutouts": len(result["cutouts"]), "referenceRouting": result["referenceRouting"]}, indent=2))


if __name__ == "__main__":
    main()
