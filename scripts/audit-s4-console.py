"""Independently verify status polarity, current limiting and host power separation."""
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
circuit_path = ROOT / "dist/s4/power-core/circuit.json"
circuit = json.loads(circuit_path.read_text())
components = {entry["source_component_id"]: entry for entry in circuit if entry["type"] == "source_component"}
by_name = {entry["name"]: entry for entry in components.values()}
ports = {(components[entry["source_component_id"]]["name"], entry["pin_number"]): entry
         for entry in circuit if entry["type"] == "source_port"}

def net(endpoint):
    ref, pin = endpoint.split(".")
    return ports[(ref, int(pin))].get("subcircuit_connectivity_map_key")

def same(endpoints):
    keys = {net(endpoint) for endpoint in endpoints}
    assert len(keys) == 1 and None not in keys, f"Connection missing: {endpoints}"

for endpoints in [
    ["D1.1", "LED2.1", "LED3.1", "LED4.1", "U3.128", "R56.1"],
    ["D1.2", "R4.1"], ["R4.2", "Q2.2", "Q3.2", "R52.2", "R54.2", "U3.129"],
    ["U3.44", "R51.1"], ["R51.2", "Q2.1", "R52.1"],
    ["LED2.2", "R48.1"], ["R48.2", "Q2.3"],
    ["U3.45", "R53.1"], ["R53.2", "Q3.1", "R54.1"],
    ["LED3.2", "R49.1"], ["R49.2", "Q3.3"],
    ["LED4.2", "R50.1"], ["R50.2", "U9.3", "R56.2", "U3.4"],
    ["U9.4", "U3.5", "R55.1"],
    ["U9.2", "R55.2", "J4.4", "J4.5", "J4.6", "U10.2", "C72.2", "U3.129"],
    ["U9.5", "C70.1", "C71.1", "F1.2"],
    ["U9.1", "C72.1", "C73.1", "U10.5", "J4.1"],
    ["U3.113", "U10.1", "U10.6", "J4.2"],
    ["U3.112", "U10.3", "U10.4", "J4.3"],
]:
    same(endpoints)
for ref in ["D1", "LED2", "LED3", "LED4"]:
    assert by_name[ref]["ftype"] == "simple_led"
    assert "anode" in ports[(ref, 1)]["port_hints"] and "cathode" in ports[(ref, 2)]["port_hints"]
    assert net(f"{ref}.1") != net(f"{ref}.2")
for ref in ["R4", "R48", "R49", "R50"]:
    assert by_name[ref]["resistance"] == 1000
    assert net(f"{ref}.1") != net(f"{ref}.2"), "LED current limiter bypassed"
for ref in ["R51", "R53", "R56"]:
    assert by_name[ref]["resistance"] == 10000
for ref in ["R52", "R54", "R55"]:
    assert by_name[ref]["resistance"] == 100000
assert len({net("U9.1"), net("U9.5"), net("U9.4"), net("U9.3"), net("U9.2"), net("D1.1")}) == 6
assert len({net("J4.1"), net("J4.2"), net("J4.3"), net("J4.4")}) == 4
assert by_name["C72"]["capacitance"] == 220e-6 and not by_name["C72"]["are_pins_interchangeable"]
assert by_name["U9"]["manufacturer_part_number"] == "TPS2051BDBVR"
assert by_name["J4"]["supplier_part_numbers"]["jlcpcb"] == ["C2345"]
for pin in [35, 33, 41, 40, 37, 36, 32, 31, 98, 99, 100, 120]:
    assert not net(f"U3.{pin}"), "Removed handheld function still connected"
assert set(entry["name"] for entry in circuit if entry["type"] == "schematic_sheet") == {
    "power", "cpu_core", "cpu_io", "usb", "storage", "indicators", "usb_host"}
diagnostics = [entry for entry in circuit if entry["type"].endswith(("_error", "_warning")) or "error_type" in entry]
report = {
    "scope": "console_indicators_and_usb_host_connections_only", "component_count": len(components),
    "led_count": 4, "power_led_independent_of_software": True,
    "run_and_error_active_high_with_transistor_pulldowns": True,
    "usb_fault_indicator_independent_of_software": True, "usb_host_default_off": True,
    "led_series_resistance_ohms": 1000, "nominal_led_current_ma_at_vf_2v": 1.3,
    "absolute_current_bound_ma_at_3v6_zero_vf_and_1pct_resistor": round(3.6 / 990 * 1000, 3),
    "usb_reservoir_minimum_initial_capacitance_uf": 220 * 0.8,
    "usb_host_design_load_ma": 500, "full_console": False, "hardware_qualified": False,
    "diagnostics": diagnostics, "compiled_sha256": hashlib.sha256(circuit_path.read_bytes()).hexdigest(),
}
(ROOT / "s4/reports/console-audit.json").write_text(json.dumps(report, indent=2) + "\n")
print(json.dumps(report, indent=2))
assert not diagnostics, "Console stage has unresolved diagnostics"
