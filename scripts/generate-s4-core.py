"""Generate the explicitly scoped power/clock/reset stage from pinned connectivity.

Supplier footprints are imported, never generated here. Incomplete reference
sections are listed in the stage manifest instead of represented by DNP parts.
"""

import csv
import json
import math
import re
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
S4 = ROOT / "s4"
STAGE_REFS = ([f"C{n}" for n in range(1, 41)] + [f"R{n}" for n in [1, 2, 3, 4, 5, 6, 7, 10, 11]]
              + ["U1", "U2", "U3", "L1", "L2", "D1", "SW1", "Y1", "Y2"])
NET_LABELS = {"+0V9": "VDD_CORE_0V9", "+1V5": "DDR_1V5", "+1V8": "LDOA_1V8", "+3V3": "SYS_3V3",
              "VBUS": "INPUT_5V", "GND": "GND", "Net-(U1-EN)": "BUCK_3V3_EN",
              "Net-(U1-FB)": "BUCK_3V3_FB", "Net-(U1-SW)": "BUCK_3V3_SW",
              "Net-(U2-FB)": "BUCK_CORE_FB", "Net-(U2-SW)": "BUCK_CORE_SW",
              "/Architecture/Power/3V3_PG": "SYS_3V3_PG", "Net-(U3B-DZQ)": "DDR_ZQ",
              "/Architecture/CPU Core/~{RESET}": "RESET_N"}


def label(net_name):
    return NET_LABELS.get(net_name, re.sub(r"[^A-Za-z0-9_]", "_", net_name.split("/")[-1]))


def imported_part(part_number):
    matches = [path for path in (S4 / "imports").glob("*.tsx") if f'"{part_number}"' in path.read_text()]
    assert len(matches) == 1, f"Expected exactly one supplier import: {part_number}"
    return matches[0]


def placement(component, imported_source):
    reference_pad = next(pad for pad in component["pads"] if pad["number"] == "1")
    match = re.search(r'<smtpad\s+portHints=\{\["pin1"[^\]]*\]\}[^>]+>', imported_source)
    assert match, f"Missing supplier pin1: {component['reference']}"
    x_mm = float(re.search(r'pcbX="([\-\d.]+)mm"', match[0]).group(1))
    y_mm = float(re.search(r'pcbY="([\-\d.]+)mm"', match[0]).group(1))
    ref_angle = math.atan2(reference_pad["y_mm"] - component["y_mm"], reference_pad["x_mm"] - component["x_mm"])
    source_angle = math.atan2(y_mm, x_mm)
    # Angle comparison selects orientation without redrawing or transforming pads.
    rotation = round(math.degrees(ref_angle - source_angle) / 90) * 90 % 360
    dx = component["x_mm"] - 69.699993
    dy = component["y_mm"] + 67.6
    # Preserve radial distance of CPU decouplers; expand spacing along each edge.
    if component["reference"].startswith("C") and int(component["reference"][1:]) >= 9:
        if abs(dx) > abs(dy):
            dy *= 1.45
        else:
            dx *= 1.45
    else:
        dx *= 1.45
        dy *= 1.45
    return {"pcbX": round(dx, 4), "pcbY": round(dy, 4), "pcbRotation": rotation}


def main():
    with (S4 / "reports/reference-bom.csv").open() as handle:
        bom = {row["reference"]: row for row in csv.DictReader(handle)}
    positions = {row["reference"]: row for row in json.loads((S4 / "reference/placement.json").read_text())}
    layout_overrides = json.loads((S4 / "layout-overrides.json").read_text())
    schematic = ET.parse(S4 / "reference/netlist.xml").getroot()
    nets = []
    for net in schematic.findall("./nets/net"):
        if net.attrib["name"].startswith("unconnected-"):
            continue
        nodes = [{"reference": node.attrib["ref"], "pin": node.attrib["pin"]} for node in net.findall("node")
                 if node.attrib["ref"] in STAGE_REFS]
        # RESET is supplied by VCC-RTC per Allwinner table 4-2; avoid 3.3V pull-up.
        if net.attrib["name"] == "+3V3":
            nodes.remove({"reference": "R11", "pin": "1"})
        if net.attrib["name"] == "+1V8":
            nodes.append({"reference": "R11", "pin": "1"})
        if len(nodes) >= 2:
            nets.append({"reference_net": net.attrib["name"], "name": label(net.attrib["name"]), "nodes": nodes})
    assert len({net["name"] for net in nets}) == len(nets), "Net-label collision"
    imports = {'import { T113M4020DC0 } from "../components/T113M4020DC0"',
               'import { MainClock, RtcClock } from "../components/clocks"'}
    components = []
    for ref in STAGE_REFS:
        part = bom[ref]
        path = imported_part("C5197687" if ref == "U3" else part["jlcpcb_part_number"])
        function_name = re.search(r"export const (\w+)", path.read_text()).group(1)
        if ref == "U3":
            function_name = "T113M4020DC0"
        elif ref in ["Y1", "Y2"]:
            function_name = "MainClock" if ref == "Y1" else "RtcClock"
        else:
            imports.add(f'import {{ {function_name} }} from "../imports/{path.stem}"')
        section = "power" if part["reference_sheet"].endswith("/Power/") else "cpu_core"
        components.append({"reference": ref, "component": function_name, "section": section,
                           "manufacturer_part_number": part["manufacturer_part_number"].strip(),
                           "jlcpcb_part_number": part["jlcpcb_part_number"],
                           **placement(positions[ref], path.read_text())})
        for key, setting in layout_overrides.get(ref, {}).items():
            if key != "reason":
                assert key in ["pcbX", "pcbY", "pcbRotation"], f"Unknown layout override: {key}"
                components[-1][key] = setting
    out = ["// Generated by scripts/generate-s4-core.py; edit the generator or reviewed layout overrides."]
    out += sorted(imports)
    out += ["", "export function PowerCoreComponents() {", "  return <>"]
    for section in ["power", "cpu_core"]:
        title = "TI REGULATORS / SEQUENCING" if section == "power" else "S4 SUPPLIES / CLOCKS / RESET"
        out += [f'    <schematicsheet name="{section}" displayName="{title}" sheetWidth={{700}} sheetHeight={{550}}>',
                f'      <schematicsection name="{section}" displayName="{title}" />']
        for index, component in enumerate(c for c in components if c["section"] == section):
            ref = component["reference"]
            x = (index % 6) * 6 - 15 if section == "power" else (index % 6) * 6 + 18
            y = 10 - (index // 6) * 4
            if ref == "U3":
                x, y = 0, 0
            props = [f'name="{ref}"', f'schX={{{x}}}', f'schY={{{y}}}', f'schSectionName="{section}"']
            props += [f'{key}={{{component[key]}}}' for key in ["pcbX", "pcbY", "pcbRotation"]]
            if ref == "U3":
                props += ['schWidth={12}', 'schHeight={38}']
            out.append(f'      <{component["component"]} ' + " ".join(props) + " />")
        out.append("    </schematicsheet>")
    out += ["  </>", "}", "", "export function PowerCoreNets() {", "  return <>"]
    for net in nets:
        flags = " isGroundNet" if net["name"] == "GND" else " isPowerNet" if net["reference_net"] in ["+0V9", "+1V5", "+1V8", "+3V3", "VBUS"] else ""
        out.append(f'    <net name="{net["name"]}"{flags} />')
        for node in net["nodes"]:
            out.append(f'    <trace from=".{node["reference"]} > .pin{node["pin"]}" to="net.{net["name"]}" schDisplayLabel="{net["name"]}" />')
    out += ["  </>", "}", ""]
    (S4 / "generated").mkdir(exist_ok=True)
    (S4 / "generated/power-core.tsx").write_text("\n".join(out))
    manifest = {"scope": "power_cpu_clock_reset_stage", "components": components, "nets": nets,
                "unimplemented_reference_components": sorted(set(bom) - set(STAGE_REFS)),
                "deviations": [{"pin": "R11.1", "reference_net": "+3V3", "implemented_net": "+1V8",
                                "reason": "RESET pin 27 belongs to VCC-RTC (1.8V), Allwinner table 4-2"}],
                "full_console": False, "routing_disabled": True}
    (S4 / "generated/power-core.json").write_text(json.dumps(manifest, indent=2) + "\n")
    with (S4 / "reports/power-core-bom.csv").open("w") as handle:
        writer = csv.writer(handle, lineterminator="\n")
        writer.writerow(["reference", "manufacturer_part_number", "jlcpcb_part_number", "imported_geometry", "electrical_qualification"])
        for component in components:
            writer.writerow([component["reference"], component["manufacturer_part_number"], component["jlcpcb_part_number"],
                             "S3 C5197687 reused" if component["reference"] == "U3" else "exact supplier import", "incomplete"])
    print(f"Generated {len(components)} components and {len(nets)} stage nets; remaining reference sections are explicit in manifest")


if __name__ == "__main__":
    main()
