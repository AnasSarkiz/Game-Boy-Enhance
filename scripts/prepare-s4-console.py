"""Specify the authorized tabletop-console indicators and controller interface."""
import json
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
S4 = ROOT / "s4"
shutil.copy2(ROOT / "imports/RC0603FR_0710KL.tsx", S4 / "imports/RC0603FR_0710KL.tsx")

# Power LED D1 and R4 belong to the retained core; their substitutions are in the generator.
rows = [
    ("LED2", "GreenIndicator", "A_19_21SYGC_S530_E2_4T", "indicators", -12, 46, 0),
    ("LED3", "RedIndicator", "A_19_217_R6C_AL1M2VY_6T", "indicators", 0, 46, 0),
    ("LED4", "RedIndicator", "A_19_217_R6C_AL1M2VY_6T", "indicators", 12, 46, 0),
    ("Q2", "IndicatorDriver", "MMBT3904LT1G", "indicators", -12, 37, 0),
    ("Q3", "IndicatorDriver", "MMBT3904LT1G", "indicators", 0, 37, 0),
    ("R48", "A_0603WAF1001T5E", "A_0603WAF1001T5E", "indicators", -12, 42, 90),
    ("R49", "A_0603WAF1001T5E", "A_0603WAF1001T5E", "indicators", 0, 42, 90),
    ("R50", "A_0603WAF1001T5E", "A_0603WAF1001T5E", "indicators", 12, 42, 90),
    ("R51", "RC0603FR_0710KL", "RC0603FR_0710KL", "indicators", -16, 37, 90),
    ("R52", "A_0402WGF1003TCE", "A_0402WGF1003TCE", "indicators", -12, 33, 90),
    ("R53", "RC0603FR_0710KL", "RC0603FR_0710KL", "indicators", -4, 37, 90),
    ("R54", "A_0402WGF1003TCE", "A_0402WGF1003TCE", "indicators", 0, 33, 90),
    ("U9", "UsbHostPower", "TPS2051BDBVR", "usb_host", -32, 19, 0),
    ("U10", "UsbRecoveryProtection", "USBLC6_2SC6", "usb_host", -38, 9, 0),
    ("J4", "UsbHostConnector", "A_902_131A1011D10100", "usb_host", -53, 10, 270),
    ("R55", "A_0402WGF1003TCE", "A_0402WGF1003TCE", "usb_host", -28, 20, 90),
    ("R56", "RC0603FR_0710KL", "RC0603FR_0710KL", "usb_host", -28, 17, 90),
    ("C70", "CL05B104KB54PNC", "CL05B104KB54PNC", "usb_host", -35, 19, 90),
    ("C71", "CL10A106MA8NRNC", "CL10A106MA8NRNC", "usb_host", -35, 23, 90),
    ("C72", "UsbHostReservoir", "EEEFT1A221AP", "usb_host", -37, 29, 0),
    ("C73", "CL05B104KB54PNC", "CL05B104KB54PNC", "usb_host", -38, 13, 90),
]
components = []
for ref, component, imported, section, x, y, rotation in rows:
    source = (S4 / f"imports/{imported}.tsx").read_text()
    components.append({"reference": ref, "component": component, "import": imported, "section": section,
        "manufacturer_part_number": re.search(r'manufacturerPartNumber="([^"]+)"', source)[1],
        "jlcpcb_part_number": re.search(r'"jlcpcb":\s*\[\s*"(C\d+)"', source)[1],
        "pcbX": x, "pcbY": y, "pcbRotation": rotation})

connections = {
    "SYS_3V3": ["LED2.1", "LED3.1", "LED4.1", "R56.1"],
    "GND": ["Q2.2", "Q3.2", "R52.2", "R54.2", "U9.2", "U10.2", "J4.4", "J4.5", "J4.6", "R55.2", "C70.2", "C71.2", "C72.2", "C73.2"],
    "INPUT_5V": ["U9.5", "C70.1", "C71.1"],
    "LED_RUN": ["U3.44", "R51.1"],
    "LED_RUN_BASE": ["R51.2", "Q2.1", "R52.1"],
    "LED_RUN_CATHODE": ["LED2.2", "R48.1"],
    "LED_RUN_SINK": ["R48.2", "Q2.3"],
    "LED_ERROR": ["U3.45", "R53.1"],
    "LED_ERROR_BASE": ["R53.2", "Q3.1", "R54.1"],
    "LED_ERROR_CATHODE": ["LED3.2", "R49.1"],
    "LED_ERROR_SINK": ["R49.2", "Q3.3"],
    "LED_USB_FAULT_CATHODE": ["LED4.2", "R50.1"],
    "USB_HOST_FAULT_N": ["U9.3", "U3.4", "R56.2", "R50.2"],
    "USB_HOST_ENABLE": ["U9.4", "U3.5", "R55.1"],
    "USB_HOST_5V": ["U9.1", "J4.1", "U10.5", "C72.1", "C73.1"],
    "USB1_DM": ["U3.113", "U10.1", "U10.6", "J4.2"],
    "USB1_DP": ["U3.112", "U10.3", "U10.4", "J4.3"],
}
manifest = {"form_factor": "tabletop_hdmi_console", "components": components, "connections": connections,
    "labels": {"D1": "POWER", "LED2": "RUN", "LED3": "ERROR", "LED4": "USB FAULT", "J4": "CONTROLLER", "SW1": "RESET", "SW2": "RECOVERY"},
    "label_positions": {"J4": {"pcbX": -52, "pcbY": -3}, "SW2": {"pcbX": 18, "pcbY": -21}},
    "removed_handheld_functions": ["onboard_game_buttons", "analog_headphone_and_speaker_audio", "volume_wheel"],
    "replacement_functions": {"controls": "USB HID controllers", "display_and_audio": "HDMI; interface remains required"},
    "full_console": False}
(S4 / "console.json").write_text(json.dumps(manifest, indent=2) + "\n")
print(f"Prepared {len(components)} console additions")
