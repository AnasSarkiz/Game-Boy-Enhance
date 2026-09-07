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
    status, target = "reference_only_pending_review", ""
    reason = "Historical handheld component; individual disposition is not yet reviewed. This is not an active console BOM entry or a DNP designation."
    if ref == "U1":
        status, target, reason = "replaced", "U3", "Nintendo CPU replaced by T113M4020DC0; emulator software is required."
    elif ref in ["U2", "JP2", "JP3"]:
        status, reason = "replaced", "Original SRAM and its configuration are replaced by S4 in-package RAM; no external SRAM is required for this design."
    elif ref == "X1":
        status, target, reason = "replaced", "Y1/Y2", "S4 requires its own 24 MHz and RTC clocks; original 4.194304 MHz clock cannot be retained."
    elif ref in adapted or component["sheet"] == "/CPU/Audio/":
        status, reason = "moved_to_hdmi", "User-authorized console scope moves sound and volume to the TV; analog handheld audio is removed. Required HDMI audio remains unfinished."
    elif ref in ["P1", "P4"]:
        status, reason = "outside_console_scope", "User-authorized console uses emulators and USB controllers; original cartridge/link interfaces are outside this scope."
    elif component["sheet"] == "/CPU/Display/" or ref == "P2":
        status, reason = "moved_to_hdmi", "User-authorized console replaces handheld LCD with monitor output; required HDMI implementation remains unfinished."
    elif ref in ["SW2", "SW3", "SW4", "SW5", "SW6"]:
        status, target, reason = "moved_to_usb_controllers", "J4/U9/U10", "User-authorized console replaces onboard game buttons with USB controllers; host wiring exists, firmware and hardware qualification remain open."
    rows.append({"original_reference": ref, "original_value": component["value"], "original_sheet": component["sheet"],
                 "status": status, "s4_reference": target, "reason": reason})
assert len(rows) == 240 and len({row["original_reference"] for row in rows}) == 240
with (ROOT / "s4/reports/enhance-retention.csv").open("w") as handle:
    writer = csv.DictWriter(handle, fieldnames=list(rows[0]), lineterminator="\n")
    writer.writeheader()
    writer.writerows(rows)
summary = {"upstream_commit": original["upstreamCommit"], "original_components_accounted_for": len(rows),
           "status_counts": dict(Counter(row["status"] for row in rows)), "complete_adaptation": False,
           "meaning": "Historical 240-part handheld reference disposition after the user-authorized tabletop console scope change; not an active BOM or proof of full qualification. Pending rows still require review; no component is marked DNP."}
(ROOT / "s4/reports/enhance-retention.json").write_text(json.dumps(summary, indent=2) + "\n")
print(json.dumps(summary, indent=2))
