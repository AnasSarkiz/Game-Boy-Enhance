"""Audit the connected stage against pinned XML, including pin/net partitions."""

import hashlib
import json
import math
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
S4 = ROOT / "s4"
POWER_INPUTS = {20, 26, 29, 34, 46, 48, 49, 50, 51, 65, 66, 77, 81, 83, 89, 97, 107, 116, 117, 128}


def main():
    circuit_path = ROOT / "dist/s4/power-core/circuit.json"
    circuit = json.loads(circuit_path.read_text())
    manifest = json.loads((S4 / "generated/power-core.json").read_text())
    components = {entry["source_component_id"]: entry for entry in circuit if entry["type"] == "source_component"}
    expected_refs = {entry["reference"] for entry in manifest["components"]}
    assert {entry["name"] for entry in components.values()} == expected_refs
    ports = [entry for entry in circuit if entry["type"] == "source_port"]
    partitions = {}
    for port in ports:
        key = port.get("subcircuit_connectivity_map_key")
        if key:
            partitions.setdefault(key, set()).add((components[port["source_component_id"]]["name"], str(port["pin_number"])))
    expected_partitions = []
    schematic = ET.parse(S4 / "reference/netlist.xml").getroot()
    for net in schematic.findall("./nets/net"):
        if net.attrib["name"].startswith("unconnected-"):
            continue
        endpoints = {(node.attrib["ref"], node.attrib["pin"]) for node in net.findall("node") if node.attrib["ref"] in expected_refs}
        if net.attrib["name"] == "+3V3":
            endpoints.remove(("R11", "1"))
        if net.attrib["name"] == "+1V8":
            endpoints.add(("R11", "1"))
        if len(endpoints) >= 2:
            expected_partitions.append(frozenset(endpoints))
    assert set(map(frozenset, partitions.values())) == set(expected_partitions), "Missing connection or unexpected net merge"
    for selected in manifest["components"]:
        component = next(entry for entry in components.values() if entry["name"] == selected["reference"])
        assert component["manufacturer_part_number"] == selected["manufacturer_part_number"]
        assert component["supplier_part_numbers"]["jlcpcb"] == [selected["jlcpcb_part_number"]]
    cpu = next(entry for entry in components.values() if entry["name"] == "U3")
    cpu_ports = {entry["pin_number"]: entry for entry in ports if entry["source_component_id"] == cpu["source_component_id"]}
    assert set(cpu_ports) == set(range(1, 130))
    assert {pin for pin, port in cpu_ports.items() if port.get("requires_power")} == POWER_INPUTS
    assert {pin for pin, port in cpu_ports.items() if port.get("provides_power")} == {28, 30}
    assert {pin for pin, port in cpu_ports.items() if port.get("requires_ground")} == {91, 129}
    assert cpu_ports[106]["do_not_connect"] and not cpu_ports[106].get("subcircuit_connectivity_map_key")
    for pin in POWER_INPUTS | {28, 30, 91, 129}:
        assert cpu_ports[pin]["must_be_connected"] and cpu_ports[pin].get("subcircuit_connectivity_map_key")
    pcb_components = [entry for entry in circuit if entry["type"] == "pcb_component"]
    assert len(pcb_components) == len(components) and all(not entry.get("do_not_place") for entry in pcb_components)
    courtyards = [entry for entry in circuit if entry["type"] == "pcb_courtyard_outline"]
    assert {entry["pcb_component_id"] for entry in courtyards} == {entry["pcb_component_id"] for entry in pcb_components}
    boxes = []
    for courtyard in courtyards:
        outline = courtyard["outline"]
        assert len(outline) == 5 and outline[0] == outline[-1]
        boxes.append((min(p["x"] for p in outline), max(p["x"] for p in outline), min(p["y"] for p in outline), max(p["y"] for p in outline)))
    clearances = []
    for index, first in enumerate(boxes):
        for second in boxes[index + 1:]:
            dx = max(first[0] - second[1], second[0] - first[1])
            dy = max(first[2] - second[3], second[2] - first[3])
            assert dx > 0 or dy > 0, "Overlapping imported courtyards"
            clearances.append(math.hypot(max(dx, 0), max(dy, 0)))
    diagnostics = [entry for entry in circuit if entry["type"].endswith(("_error", "_warning"))]
    assert not any(entry["type"] in ["pcb_trace", "pcb_via"] for entry in circuit), "Routing must remain disabled"
    assert len([entry for entry in circuit if entry["type"] == "schematic_sheet"]) == 2
    report = {"scope": "connected_power_cpu_clock_reset_stage_only", "component_count": len(components),
              "courtyard_count": len(courtyards), "minimum_courtyard_gap_mm": round(min(clearances), 6),
              "reference_net_partitions_checked": len(expected_partitions),
              "connected_endpoints_checked": sum(map(len, expected_partitions)),
              "cpu_supply_inputs_required_and_connected": sorted(POWER_INPUTS),
              "cpu_ldo_outputs_required_and_connected": [28, 30], "cpu_ground_pins_required_and_connected": [91, 129],
              "reference_deviations": manifest["deviations"],
              "remaining_reference_components": manifest["unimplemented_reference_components"],
              "routing_disabled": True, "routed_copper_drc_performed": False, "full_console": False,
              "diagnostics": [{"type": entry["type"], "message": entry["message"]} for entry in diagnostics],
              "compiled_circuit_sha256": hashlib.sha256(circuit_path.read_bytes()).hexdigest()}
    (S4 / "reports/power-core-audit.json").write_text(json.dumps(report, indent=2) + "\n")
    print(json.dumps(report, indent=2))
    assert not diagnostics, "Stage still has emitted DRC errors or warnings"


if __name__ == "__main__":
    main()
