"""Check imported candidate packages, without claiming board-level DRC."""

import hashlib
import json
import math
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
IMPORTS = ROOT / "s4/imports"


def attribute(pad, name):
    match = re.search(rf'\b{name}="([^"]+)"', pad)
    if match is None:
        raise ValueError(f"Missing {name} in imported pad")
    return match.group(1)


def check_package(filename, expected_pins):
    source = (IMPORTS / filename).read_text()
    pads = []
    for pad in re.findall(r"<(?:smtpad|platedhole)\b.*?/>", source, re.DOTALL):
        shape = attribute(pad, "shape")
        if shape not in ["rect", "pill", "circle"]:
            raise ValueError("Unsupported supplier pad shape")
        pin = re.search(r'portHints=\{\["pin(\d+)"(?:,"[^"]+")*\]\}', pad)
        if pin is None:
            raise ValueError("Imported pad has no unique numbered pin hint")
        is_plated_hole = pad.startswith("<platedhole")
        dimensions = {field: float(attribute(pad, field).removesuffix("mm")) for field in ["pcbX", "pcbY"]}
        dimensions.update({field: float(attribute(pad, "outerDiameter" if shape == "circle" and is_plated_hole else "diameter" if shape == "circle" else f"outer{field.title()}" if is_plated_hole else field).removesuffix("mm"))
                           for field in ["width", "height"]})
        if is_plated_hole:
            for field in ["width", "height"]:
                drill = float(attribute(pad, "holeDiameter" if shape == "circle" else f"hole{field.title()}").removesuffix("mm"))
                assert 0 < drill < dimensions[field], "Invalid plated slot or missing copper annulus"
        if "pcbRotation" in pad:
            rotation = float(attribute(pad, "pcbRotation").removesuffix("deg")) % 360
            assert rotation in [0, 90, 180, 270], "Non-cardinal pad rotation requires polygon audit"
            if rotation in [90, 270]:
                dimensions["width"], dimensions["height"] = dimensions["height"], dimensions["width"]
        pads.append({"pin": int(pin.group(1)), **dimensions})
    expected_pin_numbers = expected_pins if isinstance(expected_pins, list) else list(range(1, expected_pins + 1))
    if sorted(pad["pin"] for pad in pads) != expected_pin_numbers:
        raise ValueError(f"Missing or duplicated copper pad in {filename}")
    outline_match = re.search(r"<courtyardoutline outline=\{(\[.*?\])\}", source)
    if outline_match is None:
        raise ValueError(f"Missing imported courtyard in {filename}")
    outline = json.loads(outline_match.group(1))
    if outline[0] != outline[-1] or len(outline) != 5:
        raise ValueError("Expected a closed rectangular supplier courtyard")
    min_x, max_x = min(p["x"] for p in outline), max(p["x"] for p in outline)
    min_y, max_y = min(p["y"] for p in outline), max(p["y"] for p in outline)
    if any(p["x"] not in [min_x, max_x] or p["y"] not in [min_y, max_y] for p in outline):
        raise ValueError("Supplier courtyard is not rectangular")
    for pad in pads:
        if not (min_x <= pad["pcbX"] - pad["width"] / 2
                and max_x >= pad["pcbX"] + pad["width"] / 2
                and min_y <= pad["pcbY"] - pad["height"] / 2
                and max_y >= pad["pcbY"] + pad["height"] / 2):
            raise ValueError(f"Pad {pad['pin']} extends outside the supplier courtyard")
    for hole in re.findall(r"<hole\b.*?/>", source, re.DOTALL):
        radius = float(attribute(hole, "diameter").removesuffix("mm")) / 2
        x_mm = float(attribute(hole, "pcbX").removesuffix("mm"))
        y_mm = float(attribute(hole, "pcbY").removesuffix("mm"))
        assert min_x <= x_mm - radius < x_mm + radius <= max_x
        assert min_y <= y_mm - radius < y_mm + radius <= max_y
        for pad in pads:
            dx = max(abs(x_mm - pad["pcbX"]) - pad["width"] / 2, 0)
            dy = max(abs(y_mm - pad["pcbY"]) - pad["height"] / 2, 0)
            assert math.hypot(dx, dy) > radius, "Non-plated hole intersects copper pad"
    clearances = []
    for index, first in enumerate(pads):
        for second in pads[index + 1:]:
            dx = abs(first["pcbX"] - second["pcbX"]) - (first["width"] + second["width"]) / 2
            dy = abs(first["pcbY"] - second["pcbY"]) - (first["height"] + second["height"]) / 2
            if dx <= 0 and dy <= 0:
                raise ValueError(f"Copper bounds overlap: {first['pin']} and {second['pin']}")
            clearances.append(math.hypot(max(dx, 0), max(dy, 0)))
    return {"file": filename, "sha256": hashlib.sha256(source.encode()).hexdigest(),
            "pad_count": len(pads), "closed_courtyard_contains_pads": True,
            "pad_bounding_boxes_overlap": False,
            "minimum_pad_bound_clearance_mm": round(min(clearances), 6)}


def main():
    expected_pins = {"TLV62569PDDCR.tsx": 6, "ADV7513BSWZ.tsx": 65, "T113_S3.tsx": 129,
                     "LM4853MM_NOPB.tsx": 10, "TPS74525PQWDRVRQ1.tsx": 7,
                     "RK10J12R0A0B.tsx": [1, 2, 3, 4, 5, 6, 6, 7, 7],
                     "SJ_3524_SMT_TR.tsx": 4, "B2B_PH_K_S_LF__SN_.tsx": 2, "MMBT3904LT1G.tsx": 3,
                     "CM4024M00008001.tsx": 4,
                     "HX_TYPE_C_16P_L8_35.tsx": 16, "USBLC6_2SC6.tsx": 6,
                     "ZDSD04GLGEAG.tsx": 8, "SN74AHC1G08DCKR.tsx": 5,
                     **{f"{name}.tsx": 2 for name in [
                         "CL10A106MA8NRNC", "CL05C100JB5NNNC", "CL21A226MAQNNNE", "CL05B104KB54PNC",
                         "NCD0805R1", "XRIM252012S2R2MBCA", "A_0402WGF1003TCE", "A_0402WGF4533TCE",
                         "A_0402WGF5101TCE", "A_0402WGF5102TCE", "CL05A225MQ5NSNC", "A_0402CG180J500NT",
                         "A_0603WAF2400T5E", "TSA010A2026B", "Q13FC13500004",
                         "JK_nSMD100_16", "A_0402WGF220JTCE",
                         "CL10B105KA8NNNC", "CL32A107MQVNNNE", "A_0603WAF2002T5E", "A_0603WAF1001T5E",
                     ]}}
    report = {
        "scope": "candidate_import_geometry_only",
        "limitation": "No circuit connections, board placement, copper routing, solder-mask or assembly check",
        "packages": [check_package(path.name, expected_pins[path.name])
                     for path in sorted(IMPORTS.glob("*.tsx"))],
    }
    (ROOT / "s4/reports/import-geometry.json").write_text(json.dumps(report, indent=2) + "\n")
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
