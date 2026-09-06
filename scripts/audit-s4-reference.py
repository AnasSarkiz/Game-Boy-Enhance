"""Audit the pinned S4 reference; this is not an audit of a finished console.

Uses KiCad's exported XML rather than inferring connections from drawing positions.
Run after refreshing s4/reference/netlist.xml with KiCad's netlist exporter.
"""

import csv
import hashlib
import json
import xml.etree.ElementTree as ET
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
S4 = ROOT / "s4"


def write_csv(filename, rows):
    with (S4 / "reports" / filename).open("w", newline="") as output:
        writer = csv.DictWriter(output, fieldnames=list(rows[0]), lineterminator="\n")
        writer.writeheader()
        writer.writerows(rows)


def component_properties(component):
    return {prop.get("name"): prop.get("value", "") for prop in component.findall("property")}


def main():
    manifest = json.loads((S4 / "reference/manifest.json").read_text())
    for filename, expected_digest in manifest["files"].items():
        actual_digest = hashlib.sha256((S4 / "reference" / filename).read_bytes()).hexdigest()
        if actual_digest != expected_digest:
            raise ValueError(f"Pinned reference changed: {filename}")
    netlist_path = S4 / "reference/netlist.xml"
    netlist = ET.parse(netlist_path).getroot()
    components = {component.get("ref"): component for component in netlist.findall("components/comp")}
    pin_nets = defaultdict(set)
    cpu_rows = []
    for net in netlist.findall("nets/net"):
        for node in net.findall("node"):
            pin_nets[(node.get("ref"), node.get("pin"))].add(net.get("name"))
            if node.get("ref") == "U3":
                cpu_rows.append({
                    "physical_pin": node.get("pin"),
                    "reference_pin_function": node.get("pinfunction"),
                    "reference_net": net.get("name"),
                    "s4_datasheet_verified": False,
                })
    cpu_rows.sort(key=lambda row: int(row["physical_pin"]))
    write_csv("reference-cpu-pins.csv", cpu_rows)
    write_csv("reference-bom.csv", [{
        "reference": reference,
        "symbol_value": component.findtext("value"),
        "manufacturer_part_number": component_properties(component).get("MPN", ""),
        "jlcpcb_part_number": component_properties(component).get("LCSC", ""),
        "reference_sheet": component.find("sheetpath").get("names"),
        "import_status": "not_qualified",
    } for reference, component in components.items()])

    duplicate_pin_assignments = [{"reference": pin[0], "physical_pin": pin[1], "nets": sorted(nets)}
                                 for pin, nets in pin_nets.items() if len(nets) != 1]
    # Explicit physical supply pins transcribed from the reference and S3 pin table.
    # S4 limits still require its own authoritative documentation.
    supply_pins = {
        "+0V9": [46, 51, 81, 116, 117],
        "+1V5": [30, 48, 49],
        "+1V8": [20, 26, 28, 50, 65, 89, 97, 107],
        "+3V3": [29, 34, 66, 77, 83, 128],
        "GND": [91, 129],
    }
    supply_pin_mismatches = [
        {"physical_pin": pin, "expected_reference_net": rail,
         "actual_nets": sorted(pin_nets[("U3", str(pin))])}
        for rail, pins in supply_pins.items() for pin in pins
        if pin_nets[("U3", str(pin))] != {rail}
    ]
    invalid_components = [{"reference": reference, "symbol_value": component.findtext("value")}
                          for reference, component in components.items()
                          if component.findtext("value") in [None, "", "TODO"]]

    erc = json.loads((S4 / "reports/reference-erc.json").read_text())
    violations = [violation for sheet in erc["sheets"] for violation in sheet["violations"]]
    feedback_outputs = []
    for regulator, upper, lower in [("U1", "R2", "R3"), ("U2", "R5", "R7")]:
        upper_ohms = float(components[upper].findtext("value").removesuffix("k")) * 1000
        lower_ohms = float(components[lower].findtext("value").removesuffix("k")) * 1000
        feedback_outputs.append({"reference": regulator, "upper_resistor_ohms": upper_ohms,
                                 "lower_resistor_ohms": lower_ohms,
                                 "nominal_output_volts": round(0.6 * (1 + upper_ohms / lower_ohms), 6),
                                 "basis": "TI TLV62569 Rev C feedback equation; nominal only"})

    report = {
        "scope": "unmodified_trellis_reference_only",
        "reference_commit": "db4fe71623c14bcea47d7457d0db4c99d3899124",
        "netlist_sha256": hashlib.sha256(netlist_path.read_bytes()).hexdigest(),
        "component_count": len(components),
        "net_count_including_unconnected": len(netlist.findall("nets/net")),
        "cpu_pin_count": len(cpu_rows),
        "duplicate_pin_assignments": duplicate_pin_assignments,
        "supply_pin_mismatches": supply_pin_mismatches,
        "undefined_component_values": invalid_components,
        "nominal_regulator_outputs": feedback_outputs,
        "reference_erc": {
            "severity_counts": dict(Counter(violation["severity"] for violation in violations)),
            "type_counts": dict(Counter(violation["type"] for violation in violations)),
            "ignored_checks": erc["ignored_checks"],
            "limitation": "148 library-configuration warnings; this is not clean ERC or PCB DRC",
        },
        "cpu_identity": {"symbol_value": components["U3"].findtext("value"),
                         "requested_mpn": component_properties(components["U3"])["MPN"],
                         "jlcpcb_part_number": component_properties(components["U3"])["LCSC"]},
        "storage_identity": {"symbol_value": components["U5"].findtext("value"),
                             "mpn": component_properties(components["U5"])["MPN"],
                             "datasheet": components["U5"].findtext("datasheet")},
        "console_implemented": False,
        "s4_placement_checked": False,
        "s4_routing_checked": False,
        "s4_copper_drc_passed": False,
        "all_connections_datasheet_verified": False,
        "prototype_tested": False,
    }
    (S4 / "reports/reference-audit.json").write_text(json.dumps(report, indent=2) + "\n")
    print(json.dumps({key: report[key] for key in ["component_count", "cpu_pin_count",
          "duplicate_pin_assignments", "supply_pin_mismatches", "undefined_component_values"]}, indent=2))
    # A completed extraction is not a passed electrical check.
    if duplicate_pin_assignments or supply_pin_mismatches or invalid_components or any(
        violation["severity"] == "error" for violation in violations
    ):
        raise SystemExit(1)


if __name__ == "__main__":
    main()
