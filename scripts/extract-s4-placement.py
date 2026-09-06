"""Extract reference placement, not manufacturing geometry. Run with KiCad Python."""

import json
from pathlib import Path

import pcbnew

ROOT = Path(__file__).resolve().parent.parent


def main():
    board = pcbnew.LoadBoard(str(ROOT / "s4/reference/trellis_core/src/trellis_core.kicad_pcb"))
    placements = []
    for footprint in board.GetFootprints():
        placements.append({
            "reference": footprint.GetReference(),
            "x_mm": pcbnew.ToMM(footprint.GetPosition().x),
            "y_mm": -pcbnew.ToMM(footprint.GetPosition().y),
            "rotation_degrees": footprint.GetOrientationDegrees(),
            "pads": [{"number": pad.GetNumber(), "x_mm": pcbnew.ToMM(pad.GetPosition().x),
                      "y_mm": -pcbnew.ToMM(pad.GetPosition().y)} for pad in footprint.Pads()],
        })
    (ROOT / "s4/reference/placement.json").write_text(json.dumps(placements, indent=2) + "\n")


if __name__ == "__main__":
    main()
