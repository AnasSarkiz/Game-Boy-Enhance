"""Audit the connected stage against pinned XML, including pin/net partitions."""

import hashlib
import json
import math
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
S4 = ROOT / "s4"
POWER_INPUTS = {20, 26, 29, 34, 46, 48, 49, 50, 51, 65, 66, 77, 81, 83, 89, 97, 107, 116, 117, 128}
USB_CONTACTS = {"A1": ["5"], "B12": ["5"], "A12": ["7"], "B1": ["7"],
                "A4": ["6"], "B9": ["6"], "A9": ["8"], "B4": ["8"],
                "A5": ["15"], "B5": ["9"], "A6": ["13"], "B6": ["11"],
                "A7": ["12"], "B7": ["14"], "S1": ["1", "2", "3", "4"]}


def reference_endpoints(net, expected_refs):
    endpoints = set()
    for node in net.findall("node"):
        ref, pin = node.attrib["ref"], node.attrib["pin"]
        if ref not in expected_refs:
            continue
        if ref == "J1":
            endpoints.update((ref, mapped) for mapped in USB_CONTACTS[pin])
        else:
            if ref == "U3" and pin == "53":
                pin = "39"  # BOARD_ID_2: PD21 -> PE8, preserve LCD VSYNC.
            elif ref == "U3" and pin == "52":
                pin = "38"  # BOARD_ID_3: PD22 -> PE9.
            elif ref == "D1":
                pin = {"1": "2", "2": "1"}[pin]  # Everlight 1=anode, 2=cathode.
            endpoints.add((ref, pin))
    return endpoints


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
    reference_groups = {}
    schematic = ET.parse(S4 / "reference/netlist.xml").getroot()
    for net in schematic.findall("./nets/net"):
        if net.attrib["name"].startswith("unconnected-"):
            continue
        endpoints = reference_endpoints(net, expected_refs)
        if net.attrib["name"] == "+3V3":
            endpoints.remove(("R11", "1"))
        if net.attrib["name"] == "+1V8":
            endpoints.add(("R11", "1"))
        if len(endpoints) >= 2:
            reference_groups[net.attrib["name"]] = endpoints
    # Verify actual continuous nets through ST's two internally connected paths.
    for cpu_net, connector_net in [("/Architecture/USB/USB0_DN", "Net-(J1-D--PadA7)"),
                                   ("/Architecture/USB/USB0_DP", "Net-(J1-D+-PadA6)")]:
        reference_groups[cpu_net].update(reference_groups.pop(connector_net))
    console = json.loads((S4 / "console.json").read_text())
    assert console["form_factor"] == "tabletop_hdmi_console"
    assert not any(entry["name"].startswith("SW") and entry["name"] not in ["SW1", "SW2"] for entry in components.values())
    assert not any(entry["name"] in ["VR1", "U7", "U8", "J2", "J3"] for entry in components.values()), "Handheld audio remains active"
    for net_name, endpoints in console["connections"].items():
        reference_name = {"SYS_3V3": "+3V3", "INPUT_5V": "VBUS"}.get(net_name, net_name)
        reference_groups.setdefault(reference_name, set()).update(tuple(endpoint.split(".")) for endpoint in endpoints)
    expected_partitions = list(map(frozenset, reference_groups.values()))
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
    by_ref_pin = {(components[port["source_component_id"]]["name"], port["pin_number"]): port for port in ports}
    for ref, required_pins in {"U4": range(1, 7), "U5": range(1, 9), "U6": range(1, 6),
                               "J1": [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15]}.items():
        for pin in required_pins:
            port = by_ref_pin[(ref, pin)]
            assert port["must_be_connected"] and port.get("subcircuit_connectivity_map_key"), f"Required interface pin missing: {ref}.{pin}"
    for pin in [10, 16]:
        port = by_ref_pin[("J1", pin)]
        assert port["do_not_connect"] and not port.get("subcircuit_connectivity_map_key"), "USB SBU must stay unused in USB2-only port"
    for pin in [52, 53, 62, 63]:
        assert not cpu_ports[pin].get("subcircuit_connectivity_map_key"), "Future display pins conflict with straps/debug"
    allocation = json.loads((S4 / "pin-allocation.json").read_text())["assignments"]
    assert len({entry["cpu_pin"] for entry in allocation}) == len(allocation), "CPU pin allocated twice"
    assert len({entry["signal"] for entry in allocation}) == len(allocation), "Signal allocated twice"
    named_nets = {entry["name"]: entry for entry in circuit if entry["type"] == "source_net"}
    for assigned in allocation:
        port = cpu_ports[assigned["cpu_pin"]]
        assert assigned["gpio"] in port["port_hints"], "Allocation disagrees with physical CPU pin label"
        if assigned["status"] == "reserved_unwired":
            assert not port.get("subcircuit_connectivity_map_key"), f"Reserved pin is already occupied: {assigned}"
        else:
            assert assigned["status"] == "connected"
            assert port["subcircuit_connectivity_map_key"] == named_nets[assigned["signal"]]["subcircuit_connectivity_map_key"]
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
    assert min(clearances) >= 0.1, "Less than 0.1mm spacing between supplier courtyards"
    diagnostics = [entry for entry in circuit if entry["type"].endswith(("_error", "_warning")) or "error_type" in entry]
    assert not any(entry["type"] in ["pcb_trace", "pcb_via"] for entry in circuit), "Routing must remain disabled"
    assert len([entry for entry in circuit if entry["type"] == "schematic_sheet"]) == 7
    report = {"scope": "tabletop_console_core_indicators_usb_host_stage_only", "component_count": len(components),
              "courtyard_count": len(courtyards), "minimum_courtyard_gap_mm": round(min(clearances), 6),
              "net_partitions_checked": len(expected_partitions),
              "reference_net_partitions_checked": len(expected_partitions) - len(console["connections"]) + 3,
              "console_net_partitions_checked": len(console["connections"]),
              "connected_endpoints_checked": sum(map(len, expected_partitions)),
              "game_input_interface": "USB1 host; enumeration and firmware untested",
              "allocated_cpu_signal_pins_checked": len(allocation),
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
