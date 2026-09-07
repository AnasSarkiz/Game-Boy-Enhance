"""Account for every original Enhance component during the S4 adaptation."""
import csv
import json
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
original = json.loads((ROOT / "lib/generated/reference.json").read_text())
audio = json.loads((ROOT / "s4/audio.json").read_text())
adapted = {component["original_enhance_reference"]: component for component in audio["components"] if component["original_enhance_reference"]}
rows = []
for component in original["components"]:
    ref = component["reference"]
    status, target = "pending_review", ""
    reason = "Retain the function; component and S4-domain connections still require individual qualification."
    if ref in adapted:
        status, target = "adapted_audio", adapted[ref]["reference"]
        reason = "Retained in the audio adaptation with explicit pin/value/procurement changes in AUDIO-RETENTION-REVIEW.md; tool acceptance remains blocked."
    elif ref == "U1":
        status, target, reason = "replaced", "U3", "Nintendo CPU replaced by T113M4020DC0; emulator software is required."
    elif ref in ["U2", "JP2", "JP3"]:
        status, reason = "replaced", "Original SRAM and its configuration are replaced by S4 in-package RAM; no external SRAM is required for this design."
    elif ref == "X1":
        status, target, reason = "replaced", "Y1/Y2", "S4 requires its own 24 MHz and RTC clocks; original 4.194304 MHz clock cannot be retained."
    elif component["sheet"] == "/CPU/Audio/":
        if ref.startswith("TP"):
            status, reason = "pending_test_access", "Retain audio measurement access; testpoint parts and placement are still to be added."
        elif ref == "Q6":
            status, target, reason = "replaced", "Q1/R44/R45", "GPIO-controlled NPN shutdown replaces the VDD5-driven MOSFET; amplifier defaults disabled."
        else:
            status, reason = "replaced_by_codec", "Nintendo PWM reconstruction/filter/bias support replaced by S4 analog DAC output and its coupling/stability network."
    elif ref in ["P1", "P4"]:
        status, reason = "pending_compatibility", "Original cartridge/link hardware protocols and compatible JLCPCB connectors remain unresolved. Do not connect directly to S4."
    elif component["sheet"] == "/CPU/Display/" or ref == "P2":
        status, reason = "pending_display", "Original display compatibility needs an identified panel/adapter and verified signaling; HDMI is a separate unfinished interface."
    elif ref in ["SW2", "SW3", "SW4", "SW5", "SW6"]:
        status, target, reason = "function_present_parts_review", "SW3–SW12", "All ten game inputs exist; current small switches differ from original shoulder/tactile parts. Returning to the original imported switch choices remains to be reviewed."
    rows.append({"original_reference": ref, "original_value": component["value"], "original_sheet": component["sheet"],
                 "status": status, "s4_reference": target, "reason": reason})
assert len(rows) == 240 and len({row["original_reference"] for row in rows}) == 240
with (ROOT / "s4/reports/enhance-retention.csv").open("w") as handle:
    writer = csv.DictWriter(handle, fieldnames=list(rows[0]), lineterminator="\n")
    writer.writeheader()
    writer.writerows(rows)
summary = {"upstream_commit": original["upstreamCommit"], "original_components_accounted_for": len(rows),
           "status_counts": dict(Counter(row["status"] for row in rows)), "complete_adaptation": False,
           "meaning": "Pending components retain a requirement; this ledger does not authorize dropping them or marking them DNP."}
(ROOT / "s4/reports/enhance-retention.json").write_text(json.dumps(summary, indent=2) + "\n")
print(json.dumps(summary, indent=2))
