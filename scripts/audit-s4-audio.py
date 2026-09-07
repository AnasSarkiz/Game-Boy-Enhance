"""Check critical audio paths independently of the generated net declarations."""
import hashlib
import json
import math
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
circuit = json.loads((ROOT / "dist/s4/power-core/circuit.json").read_text())
components = {entry["source_component_id"]: entry for entry in circuit if entry["type"] == "source_component"}
ports = {(components[entry["source_component_id"]]["name"], entry["pin_number"]): entry
         for entry in circuit if entry["type"] == "source_port"}

def net(endpoint):
    ref, pin = endpoint.split(".")
    return ports[(ref, int(pin))].get("subcircuit_connectivity_map_key")

def same(endpoints):
    keys = {net(endpoint) for endpoint in endpoints}
    assert len(keys) == 1 and None not in keys, f"Audio connection incorrect: {endpoints}"

for endpoints in [
    ["U3.99", "C55.1", "C67.1"], ["C55.2", "VR1.3"], ["VR1.2", "C57.1"],
    ["C57.2", "R36.1"], ["R36.2", "U7.5", "R38.1"],
    ["U7.6", "R38.2", "C60.1"], ["C60.2", "J2.2", "R41.1"],
    ["U3.98", "C56.1", "C68.1"], ["C56.2", "VR1.5"], ["VR1.4", "C58.1"],
    ["C58.2", "R37.1"], ["R37.2", "U7.1", "R39.1"],
    ["U7.10", "R39.2", "C61.1", "J3.1"], ["C61.2", "J2.3", "R42.1"],
    ["J2.4", "U7.3", "R40.2"], ["U7.8", "C62.1"], ["C62.2", "J3.2"],
    ["U3.100", "C66.1"], ["C66.2", "VR1.1", "J2.1", "U7.4", "Q1.2"],
    ["U8.1", "U7.9", "R43.1", "R40.1"], ["U7.2", "Q1.3", "R43.2"],
    ["U3.120", "R44.1"], ["R44.2", "Q1.1", "R45.1"],
]:
    same(endpoints)
assert len({net("J3.1"), net("J3.2"), net("J2.1")}) == 3, "Speaker must remain floating"
assert net("J2.2") != net("J2.4"), "Jack switch is conditional, not a permanent net join"
for ref in ["C55", "C56", "C57", "C58", "C60", "C61", "C62", "C66"]:
    assert net(f"{ref}.1") != net(f"{ref}.2"), f"Coupling capacitor bypassed: {ref}"
for pin in [6, 7]:
    assert not net(f"VR1.{pin}"), "Mounting tabs must not carry audio or supply nets"

audio = json.loads((ROOT / "s4/audio.json").read_text())
unchanged_imports = []
for component in audio["components"]:
    original = ROOT / "imports" / (component["import"] + ".tsx")
    imported = ROOT / "s4/imports" / original.name
    if original.exists():
        assert imported.read_bytes() == original.read_bytes(), f"Supplier geometry changed: {original.name}"
        unchanged_imports.append(original.name)
diagnostics = [entry for entry in circuit if entry["type"].endswith(("_error", "_warning")) or "error_type" in entry]
report = {
    "scope": "audio_wiring_and_supplier_reuse_only", "audio_components": len(audio["components"]),
    "retained_reference_designators": sorted(component["original_enhance_reference"] for component in audio["components"] if component["original_enhance_reference"]),
    "unchanged_supplier_imports": sorted(set(unchanged_imports)),
    "stereo_mapping_checked": True, "headphone_detect_uses_amplifier_rout": True,
    "speaker_is_floating": True, "coupling_capacitors_not_shorted": True,
    "nominal_headphone_gain": 20000 / 100000,
    "nominal_headphone_highpass_hz_at_32_ohms": round(1 / (2 * math.pi * 100e-6 * (32 * 1000 / 1032)), 2),
    "nominal_speaker_highpass_hz_at_8_ohms": round(1 / (2 * math.pi * 100e-6 * 8), 2),
    "nominal_headphone_detect_low_v": round(2.5 * 1000 / 101000, 4),
    "hardware_qualified": False, "diagnostics": [{"type": entry["type"], "message": entry["message"]} for entry in diagnostics],
    "compiled_sha256": hashlib.sha256((ROOT / "dist/s4/power-core/circuit.json").read_bytes()).hexdigest(),
}
(ROOT / "s4/reports/audio-audit.json").write_text(json.dumps(report, indent=2) + "\n")
print(json.dumps(report, indent=2))
assert not diagnostics, "Audio wiring checks passed, but unsuppressed tool diagnostics block acceptance"
