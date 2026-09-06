"""Verify S4 procurement identity and unchanged supplier geometry in the preview."""

import csv
import hashlib
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def main():
    imported = (ROOT / "s4/imports/T113_S3.tsx").read_text()
    circuit_path = ROOT / "dist/s4/previews/cpu-package/circuit.json"
    circuit = json.loads(circuit_path.read_text())
    components = [entry for entry in circuit if entry["type"] == "source_component"]
    assert len(components) == 1, "Expected the isolated CPU package inspection"
    cpu = components[0]
    assert cpu["manufacturer_part_number"] == "T113M4020DC0", "Wrong CPU MPN"
    assert cpu["supplier_part_numbers"] == {"jlcpcb": ["C41411351"]}, "Wrong ordering identity"
    assert not any(entry["type"] in ["pcb_trace", "pcb_via"] for entry in circuit), "Preview must remain unrouted"
    assert all(not entry.get("do_not_place", False) for entry in circuit), "DNP is prohibited"

    source_ports = [entry for entry in circuit if entry["type"] == "source_port"]
    assert len(source_ports) == 129, "Expected exactly 129 physical CPU ports"
    ports = {str(entry["pin_number"]): entry for entry in source_ports}
    assert set(ports) == {str(pin) for pin in range(1, 130)}, "Missing or duplicate CPU ports"
    with (ROOT / "s4/reports/reference-cpu-pins.csv").open() as handle:
        reference_pins = list(csv.DictReader(handle))
    for pin in reference_pins:
        reference_label = re.sub(r"_\d+$", "", pin["reference_pin_function"])
        assert ports[pin["physical_pin"]]["name"] == reference_label, f"Reference pin mismatch: {pin}"
    ground = next(entry for entry in circuit if entry["type"] == "source_net" and entry["name"] == "GND")
    for pin_number in ["91", "129"]:
        assert ports[pin_number]["subcircuit_connectivity_map_key"] == ground["subcircuit_connectivity_map_key"]
    assert ports["106"]["do_not_connect"] is True
    assert not ports["106"].get("subcircuit_connectivity_map_key"), "NC pin connected"

    pads = [entry for entry in circuit if entry["type"] == "pcb_smtpad"]
    assert len(pads) == 129
    imported_pads = re.findall(r"<smtpad\b.*?/>", imported, re.DOTALL)
    assert len(imported_pads) == 129
    for original in imported_pads:
        pin_number = re.search(r'portHints=\{\["pin(\d+)"\]\}', original).group(1)
        compiled = next(pad for pad in pads if pad["port_hints"] == [f"pin{pin_number}"])
        for jsx_name, compiled_name in [("pcbX", "x"), ("pcbY", "y"), ("width", "width"), ("height", "height")]:
            millimeters = float(re.search(rf'{jsx_name}="([^"]+)mm"', original).group(1))
            assert abs(compiled[compiled_name] - millimeters) < 1e-9, f"Changed supplier pad {pin_number}"
        assert compiled["shape"] == re.search(r'shape="([^"]+)"', original).group(1)
    courtyards = [entry for entry in circuit if entry["type"] == "pcb_courtyard_outline"]
    assert len(courtyards) == 1
    assert courtyards[0]["outline"] == json.loads(re.search(r"<courtyardoutline outline=\{(\[.*?\])\}", imported).group(1))
    assert any(entry["type"] == "schematic_sheet" for entry in circuit)
    assert any(entry["type"] == "schematic_text" and entry["text"] == "S4 — SUPPLIER PACKAGE / PIN MAP CHECK ONLY"
               for entry in circuit), "Missing rendered functional section heading"
    errors = [entry for entry in circuit if entry["type"].endswith("_error")]
    warnings = [entry for entry in circuit if entry["type"].endswith("_warning")]
    report = {
        "scope": "isolated_cpu_package_inspection_only",
        "manufacturer_part_number": cpu["manufacturer_part_number"],
        "supplier_part_numbers": cpu["supplier_part_numbers"],
        "geometry_source": "JLCPCB C5197687 / T113-S3",
        "import_sha256": hashlib.sha256(imported.encode()).hexdigest(),
        "compiled_circuit_sha256": hashlib.sha256(circuit_path.read_bytes()).hexdigest(),
        "unchanged_supplier_pads_and_courtyard": True,
        "pins_matching_reference": len(reference_pins),
        "ground_pins": [91, 129],
        "unconnected_inspection_pins": sum(not port.get("subcircuit_connectivity_map_key") for port in source_ports),
        "copper_trace_count": sum(entry["type"] == "pcb_trace" for entry in circuit),
        "dnp_count": sum(bool(entry.get("do_not_place")) for entry in circuit),
        "errors": errors,
        "warnings": [{"type": entry["type"], "message": entry["message"]} for entry in warnings],
        "s4_package_and_electrical_qualification_complete": False,
        "console_board_implemented": False,
    }
    (ROOT / "s4/reports/cpu-package-inspection.json").write_text(json.dumps(report, indent=2) + "\n")
    print(json.dumps(report, indent=2))
    assert not errors, "Compiled package has DRC errors"


if __name__ == "__main__":
    main()
