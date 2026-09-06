"""Check the two imported candidate packages, without claiming board-level DRC."""

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
    for pad in re.findall(r"<smtpad\b.*?/>", source, re.DOTALL):
        if attribute(pad, "shape") not in ["rect", "pill"] or "pcbRotation" in pad:
            raise ValueError("Audit requires an axis-aligned rectangular or pill pad")
        pin = re.search(r'portHints=\{\["pin(\d+)"\]\}', pad)
        if pin is None:
            raise ValueError("Imported pad has no unique numbered pin hint")
        pads.append({"pin": int(pin.group(1)), **{
            field: float(attribute(pad, field).removesuffix("mm"))
            for field in ["pcbX", "pcbY", "width", "height"]
        }})
    if sorted(pad["pin"] for pad in pads) != list(range(1, expected_pins + 1)):
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
    report = {
        "scope": "candidate_import_geometry_only",
        "limitation": "No circuit connections, board placement, copper routing, solder-mask or assembly check",
        "packages": [check_package("TLV62569PDDCR.tsx", 6), check_package("ADV7513BSWZ.tsx", 65)],
    }
    (ROOT / "s4/reports/import-geometry.json").write_text(json.dumps(report, indent=2) + "\n")
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
