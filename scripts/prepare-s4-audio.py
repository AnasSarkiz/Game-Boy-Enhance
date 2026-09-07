"""Record the reviewed Enhance audio adaptation and reuse genuine imports."""
import json
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
S4 = ROOT / "s4"
REUSED_IMPORTS = ["LM4853MM_NOPB", "TPS74525PQWDRVRQ1", "RK10J12R0A0B", "SJ_3524_SMT_TR",
                  "B2B_PH_K_S_LF__SN_", "MMBT3904LT1G", "CL10B105KA8NNNC", "CL32A107MQVNNNE",
                  "A_0603WAF2002T5E", "A_0603WAF1001T5E"]
for name in REUSED_IMPORTS:
    shutil.copy2(ROOT / f"imports/{name}.tsx", S4 / f"imports/{name}.tsx")

# Original designators are explicit; new coupling/control parts have no source reference.
rows = [
    ("U7", "AudioAmplifier", "LM4853MM_NOPB", "U6", -32, -13, 0),
    ("U8", "AudioSupply", "TPS74525PQWDRVRQ1", "U4", -23, -26, 0),
    ("VR1", "AudioVolume", "RK10J12R0A0B", "VR2", -43, 0, 90),
    ("J2", "HeadphoneJack", "SJ_3524_SMT_TR", "P3", -43, -37, 0),
    ("J3", "SpeakerConnector", "B2B_PH_K_S_LF__SN_", "SP1", -32, -48, 180),
    ("Q1", "AudioEnableTransistor", "MMBT3904LT1G", None, -22, -14, 0),
]
capacitors = [
    (55, "CL10B105KA8NNNC", None, -21, 3), (56, "CL10B105KA8NNNC", None, -21, -0.5),
    (57, "CL10B105KA8NNNC", "C56", -33, -5.4), (58, "CL10B105KA8NNNC", "C55", -30, -5.4),
    (59, "CL10B105KA8NNNC", "C38", -37, -13),
    (60, "CL32A107MQVNNNE", "CP3", -38, -23), (61, "CL32A107MQVNNNE", "CP2", -32, -23),
    (62, "CL32A107MQVNNNE", "CP1", -29, -40),
    (63, "CL10B105KA8NNNC", None, -20, -25), (64, "CL10A106MA8NRNC", "C59", -27, -26),
    (65, "CL05B104KB54PNC", None, -29, -18), (66, "CL05B104KB54PNC", None, -17, -7),
    (67, "CL05B104KB54PNC", None, -20, 6), (68, "CL05B104KB54PNC", None, -20, 9),
    (69, "CL10A106MA8NRNC", None, -36, -17),
]
rows += [(f"C{number}", part, part, original, x, y, 90) for number, part, original, x, y in capacitors]
resistors = [
    (36, "A_0402WGF1003TCE", "R31", -30, -8.5), (37, "A_0402WGF1003TCE", "R30", -33, -8.5),
    (38, "A_0603WAF2002T5E", "R56", -28, -13), (39, "A_0603WAF2002T5E", "R57", -27, -9),
    (40, "A_0402WGF1003TCE", "R14", -26, -33),
    (41, "A_0603WAF1001T5E", "R19", -38, -28), (42, "A_0603WAF1001T5E", "R20", -32, -28),
    (43, "A_0402WGF1003TCE", "R37", -25, -14),
    (44, "A_0603WAF1001T5E", None, -18.8, -13), (45, "A_0402WGF1003TCE", None, -19, -16),
    (46, "A_0402WGF220JTCE", None, -17, 6), (47, "A_0402WGF220JTCE", None, -17, 9),
]
rows += [(f"R{number}", part, part, original, x, y, 90) for number, part, original, x, y in resistors]
parts = []
for ref, component, imported, original, x, y, rotation in rows:
    source = (S4 / f"imports/{imported}.tsx").read_text()
    parts.append({"reference": ref, "component": component, "import": imported,
                  "original_enhance_reference": original, "section": "audio",
                  "manufacturer_part_number": re.search(r'manufacturerPartNumber="([^"]+)"', source)[1],
                  "jlcpcb_part_number": re.search(r'"jlcpcb":\s*\[\s*"(C\d+)"', source)[1],
                  "pcbX": x, "pcbY": y, "pcbRotation": rotation})

connections = {
    "GND": ["U7.4", "U8.2", "U8.3", "U8.7", "VR1.1", "J2.1", "Q1.2", "C59.2", "C63.2", "C64.2", "C65.2", "C66.2", "C69.2", "R41.2", "R42.2", "R45.2", "R46.2", "R47.2"],
    "SYS_3V3": ["U8.6", "U8.4", "C63.1"],
    "AUDIO_2V5": ["U8.1", "U7.9", "C64.1", "C65.1", "C69.1", "R40.1", "R43.1"],
    "CODEC_HP_LEFT": ["U3.99", "C55.1", "C67.1"],
    "CODEC_HP_RIGHT": ["U3.98", "C56.1", "C68.1"],
    "CODEC_HP_FEEDBACK": ["U3.100", "C66.1"],
    "CODEC_LEFT_ZOBEL": ["C67.2", "R46.1"],
    "CODEC_RIGHT_ZOBEL": ["C68.2", "R47.1"],
    "AUDIO_VOLUME_LEFT_IN": ["C55.2", "VR1.3"],
    "AUDIO_VOLUME_RIGHT_IN": ["C56.2", "VR1.5"],
    "AUDIO_VOLUME_LEFT_OUT": ["VR1.2", "C57.1"],
    "AUDIO_VOLUME_RIGHT_OUT": ["VR1.4", "C58.1"],
    "AUDIO_LEFT_COUPLED": ["C57.2", "R36.1"],
    "AUDIO_RIGHT_COUPLED": ["C58.2", "R37.1"],
    # TI requires HP-IN sensing on ROUT. Swap internal channel use to retain tip=left.
    "AMP_RIGHT_INPUT": ["R36.2", "U7.5", "R38.1"],
    "AMP_LEFT_INPUT": ["R37.2", "U7.1", "R39.1"],
    "AMP_RIGHT_OUTPUT": ["U7.6", "R38.2", "C60.1"],
    "AMP_LEFT_OUTPUT": ["U7.10", "R39.2", "C61.1", "J3.1"],
    "AMP_BRIDGE_OUTPUT": ["U7.8", "C62.1"],
    "SPEAKER_COUPLED": ["C62.2", "J3.2"],
    "HEADPHONE_TIP_LEFT": ["C60.2", "J2.2", "R41.1"],
    "HEADPHONE_RING_RIGHT": ["C61.2", "J2.3", "R42.1"],
    "HEADPHONE_DETECT": ["J2.4", "R40.2", "U7.3"],
    "AMP_BYPASS": ["U7.7", "C59.1"],
    "AMP_SHUTDOWN": ["U7.2", "Q1.3", "R43.2"],
    "AUDIO_ENABLE": ["U3.120", "R44.1"],
    "AUDIO_ENABLE_BASE": ["R44.2", "Q1.1", "R45.1"],
}
(S4 / "audio.json").write_text(json.dumps({"components": parts, "connections": connections}, indent=2) + "\n")
print(f"Prepared {len(parts)} audio components; supplier imports copied unchanged")
