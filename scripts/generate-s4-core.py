"""Generate the connected S4 power and interface stage from pinned connectivity.

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
STAGE_REFS = ([f"C{n}" for n in range(1, 45)] + [f"R{n}" for n in range(1, 26) if n not in [8, 9]]
              + ["U1", "U2", "U3", "U4", "U5", "U6", "L1", "L2", "D1", "SW1", "SW2", "Y1", "Y2", "F1", "J1"])
SECTIONS = {"power": "TI REGULATORS / SEQUENCING", "cpu_core": "S4 SUPPLIES / CLOCKS / RESET",
            "cpu_io": "BOOT STRAPS / BOARD IDENTIFICATION", "usb": "USB-C POWER / RECOVERY",
            "storage": "512 MB SD STORAGE / FEL RECOVERY", "indicators": "POWER / RUN / ERROR / USB FAULT",
            "usb_host": "USB CONTROLLER / PROTECTED HOST POWER"}
INTERFACE_COMPONENTS = {"F1": "UsbInputFuse", "J1": "UsbRecoveryConnector", "U4": "UsbRecoveryProtection",
                        "U5": "BootStorage", "U6": "RecoveryClockGate"}
# Hanxia drawing: joined GND/VBUS contacts share solder tails; four shell stakes.
USB_CONTACTS = {"A1": ["5"], "B12": ["5"], "A12": ["7"], "B1": ["7"],
                "A4": ["6"], "B9": ["6"], "A9": ["8"], "B4": ["8"],
                "A5": ["15"], "B5": ["9"], "A6": ["13"], "B6": ["11"],
                "A7": ["12"], "B7": ["14"], "S1": ["1", "2", "3", "4"]}
NET_LABELS = {"+0V9": "VDD_CORE_0V9", "+1V5": "DDR_1V5", "+1V8": "LDOA_1V8", "+3V3": "SYS_3V3",
              "VBUS": "INPUT_5V", "GND": "GND", "Net-(U1-EN)": "BUCK_3V3_EN",
              "Net-(U1-FB)": "BUCK_3V3_FB", "Net-(U1-SW)": "BUCK_3V3_SW",
              "Net-(U2-FB)": "BUCK_CORE_FB", "Net-(U2-SW)": "BUCK_CORE_SW",
              "/Architecture/Power/3V3_PG": "SYS_3V3_PG", "Net-(U3B-DZQ)": "DDR_ZQ",
              "/Architecture/CPU Core/~{RESET}": "RESET_N"}
NET_LABELS.update({"/Architecture/USB/USB0_DN": "USB0_DM", "Net-(J1-D--PadA7)": "USB0_DM",
                   "/Architecture/USB/USB0_DP": "USB0_DP", "Net-(J1-D+-PadA6)": "USB0_DP",
                   "Net-(U4-VBUS)": "USB_C_VBUS_5V", "Net-(C44-Pad1)": "FEL_CLOCK_ENABLE",
                   "Net-(R23-Pad1)": "SDC0_CLK_BUFFERED", "Net-(U5-CLK)": "SDC0_CLK_STORAGE"})


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
    console = json.loads((S4 / "console.json").read_text())
    schematic = ET.parse(S4 / "reference/netlist.xml").getroot()
    net_groups = {}
    for net in schematic.findall("./nets/net"):
        if net.attrib["name"].startswith("unconnected-"):
            continue
        endpoints = set()
        for node in net.findall("node"):
            ref, pin = node.attrib["ref"], node.attrib["pin"]
            if ref not in STAGE_REFS:
                continue
            pins = USB_CONTACTS[pin] if ref == "J1" else [{"53": "39", "52": "38"}.get(pin, pin) if ref == "U3" else {"1": "2", "2": "1"}[pin] if ref == "D1" else pin]
            endpoints.update((ref, mapped_pin) for mapped_pin in pins)
        nodes = [{"reference": ref, "pin": pin} for ref, pin in sorted(endpoints)]
        # RESET is supplied by VCC-RTC per Allwinner table 4-2; avoid 3.3V pull-up.
        if net.attrib["name"] == "+3V3":
            nodes.remove({"reference": "R11", "pin": "1"})
        if net.attrib["name"] == "+1V8":
            nodes.append({"reference": "R11", "pin": "1"})
        if len(nodes) >= 2:
            net_name = label(net.attrib["name"])
            if net_name in net_groups:
                assert net_name in ["USB0_DM", "USB0_DP"], "Unexpected net-label collision"
                net_groups[net_name]["nodes"] += nodes
                net_groups[net_name]["reference_nets"].append(net.attrib["name"])
            else:
                net_groups[net_name] = {"reference_net": net.attrib["name"], "reference_nets": [net.attrib["name"]], "name": net_name, "nodes": nodes}
    imports = {'import { T113M4020DC0 } from "../components/T113M4020DC0"',
               'import { MainClock, RtcClock } from "../components/clocks"',
               'import { BootStorage, RecoveryClockGate, UsbInputFuse, UsbRecoveryConnector, UsbRecoveryProtection } from "../components/interfaces"',
               'import { GreenIndicator, RedIndicator, IndicatorDriver, UsbHostPower, UsbHostConnector, UsbHostReservoir } from "../components/console"'}
    components = []
    for ref in STAGE_REFS:
        part = dict(bom[ref])
        if ref == "D1":
            part.update(manufacturer_part_number="19-21SYGC/S530-E2/4T", jlcpcb_part_number="C2986011")
        elif ref == "R4":
            part.update(manufacturer_part_number="0603WAF1001T5E", jlcpcb_part_number="C21190")
        path = imported_part("C5197687" if ref == "U3" else part["jlcpcb_part_number"])
        function_name = re.search(r"export const (\w+)", path.read_text()).group(1)
        if ref == "U3":
            function_name = "T113M4020DC0"
        elif ref == "D1":
            function_name = "GreenIndicator"
        elif ref in ["Y1", "Y2"]:
            function_name = "MainClock" if ref == "Y1" else "RtcClock"
        elif ref in INTERFACE_COMPONENTS:
            function_name = INTERFACE_COMPONENTS[ref]
        else:
            imports.add(f'import {{ {function_name} }} from "../imports/{path.stem}"')
        section = part["reference_sheet"].strip("/").split("/")[-1].lower().replace(" ", "_")
        if ref in ["D1", "R4"]:
            section = "indicators"
        assert section in SECTIONS
        # J1 has alphabetic reference contacts and numbered imported solder tails.
        # Use its fully specified, reviewed edge placement rather than pad-1 inference.
        coordinates = ({key: layout_overrides[ref][key] for key in ["pcbX", "pcbY", "pcbRotation"]}
                       if ref == "J1" else placement(positions[ref], path.read_text()))
        components.append({"reference": ref, "component": function_name, "section": section,
                           "manufacturer_part_number": part["manufacturer_part_number"].strip(),
                           "jlcpcb_part_number": part["jlcpcb_part_number"],
                           **coordinates})
        for key, setting in layout_overrides.get(ref, {}).items():
            if key != "reason":
                assert key in ["pcbX", "pcbY", "pcbRotation"], f"Unknown layout override: {key}"
                components[-1][key] = setting
    for component in console["components"]:
        assert component["reference"] not in {entry["reference"] for entry in components}
        components.append(component)
        if component["component"] == component["import"]:
            imports.add(f'import {{ {component["component"]} }} from "../imports/{component["import"]}"')
    for net_name, endpoints in console["connections"].items():
        if net_name not in net_groups:
            net_groups[net_name] = {"reference_net": None, "reference_nets": [], "name": net_name, "nodes": []}
        net_groups[net_name]["nodes"] += [{"reference": endpoint.split(".")[0], "pin": endpoint.split(".")[1]} for endpoint in endpoints]
    nets = list(net_groups.values())
    out = ["// Generated by scripts/generate-s4-core.py; edit the generator or reviewed layout overrides."]
    out += sorted(imports)
    out += ["", "export function PowerCoreComponents() {", "  return <>"]
    for section, title in SECTIONS.items():
        sheet_width, sheet_height = (850, 550) if section == "cpu_core" else (600, 500)
        out += [f'    <schematicsheet name="{section}" displayName="{title}" sheetWidth={{{sheet_width}}} sheetHeight={{{sheet_height}}}>',
                f'      <schematicsection name="{section}" displayName="{title}" />']
        for index, component in enumerate(c for c in components if c["section"] == section):
            ref = component["reference"]
            x = (index % 6) * 7 - 17.5
            y = 10 - (index // 6) * 6
            if section == "cpu_core":
                x, y = (index % 6) * 7 - 5, 17 - (index // 6) * 5
            elif section == "usb":
                x, y = {"J1": (-12, 5), "U4": (0, 5), "F1": (12, 5),
                        "R15": (-12, -4), "R16": (-4, -4)}[ref]
            elif section == "storage":
                x, y = {"U5": (12, -3), "U6": (-8, -3), "SW2": (-8, -10),
                        "R23": (2, -3), "R22": (-16, -3)}.get(ref, (x, y))
            elif section == "indicators":
                x, y = (index % 4) * 12 - 18, 15 - (index // 4) * 8
            elif section == "usb_host":
                x, y = (index % 3) * 16 - 16, 12 - (index // 3) * 10
            if ref == "U3":
                x, y = -24, 3
            props = [f'name="{ref}"', f'schX={{{x}}}', f'schY={{{y}}}', f'schSectionName="{section}"']
            props += [f'{key}={{{component[key]}}}' for key in ["pcbX", "pcbY", "pcbRotation"]]
            if ref == "U3":
                props += ['schWidth={8}', 'schHeight={17}']
            out.append(f'      <{component["component"]} ' + " ".join(props) + " />")
            if ref in console["labels"]:
                label_position = console["label_positions"].get(ref, {"pcbX": component["pcbX"], "pcbY": component["pcbY"] + 4})
                out.append(f'      <silkscreentext text="{console["labels"][ref]}" pcbX={{{label_position["pcbX"]}}} pcbY={{{label_position["pcbY"]}}} fontSize="1.2mm" />')
        out.append("    </schematicsheet>")
    out += ["  </>", "}", "", "export function PowerCoreNets() {", "  return <>"]
    for net in nets:
        flags = " isGroundNet" if net["name"] == "GND" else " isPowerNet" if net["name"] == "USB_HOST_5V" or net["reference_net"] in ["+0V9", "+1V5", "+1V8", "+3V3", "VBUS", "Net-(U4-VBUS)"] else ""
        out.append(f'    <net name="{net["name"]}"{flags} />')
        for node in net["nodes"]:
            out.append(f'    <trace from=".{node["reference"]} > .pin{node["pin"]}" to="net.{net["name"]}" schDisplayLabel="{net["name"]}" />')
    out += ["  </>", "}", ""]
    (S4 / "generated").mkdir(exist_ok=True)
    (S4 / "generated/power-core.tsx").write_text("\n".join(out))
    manifest = {"scope": "tabletop_console_core_indicators_usb_host_stage", "components": components, "nets": nets,
                "unimplemented_reference_components": sorted(set(bom) - set(STAGE_REFS)),
                "deviations": [{"pin": "R11.1", "reference_net": "+3V3", "implemented_net": "+1V8",
                                "reason": "RESET pin 27 belongs to VCC-RTC (1.8V), Allwinner table 4-2"},
                               {"reference_pin": "U3.53", "implemented_pin": "U3.39", "net": "BOARD_ID_2",
                                "reason": "Move PD21 board-ID input to PE8 to free LCD VSYNC"},
                               {"reference_pin": "U3.52", "implemented_pin": "U3.38", "net": "BOARD_ID_3",
                                "reason": "Move PD22 board-ID input to PE9 to reserve audio-capable PD22"},
                               {"component": "U5", "reason": "Resolve incorrect ZDSD08 symbol display to exact 4-Gbit/512-MByte ZDSD04GLGEAG MPN"},
                               {"component": "J1", "reason": "Map alphabetic contacts to genuine supplier solder-tail and shield pad numbers"},
                               {"component": "U4", "reason": "Represent internally connected USBLC6 paths 1-6 and 3-4 as continuous USB nets"},
                               {"section": "console", "reason": "User-authorized tabletop conversion removes onboard game buttons and analog audio; USB controllers and HDMI take over their functions. HDMI remains required, not marked DNP."},
                               {"component": "D1/R4", "reason": "Replace old red power LED with green Everlight (1=anode, 2=cathode) and 1k current limit; remap original D1 terminals accordingly."},
                               {"section": "indicators", "reason": "Add transistor-driven active-high RUN/ERROR indicators on PE0/PE1 and hardware active-low USB fault indicator."},
                               {"section": "usb_host", "reason": "Add USB1 Type-A connector, ST ESD array and TI TPS2051B 500mA power switch with default-off enable and hardware fault indication; source-current qualification remains required."}],
                "schematic_sections": SECTIONS,
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
