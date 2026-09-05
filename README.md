# Game Boy Enhance AGBM-02 in tscircuit

**Work in progress. Routing is disabled. This is not a complete or fabrication-ready board.**

Adaptation of [MouseBiteLabs/Game-Boy-Enhance](https://github.com/MouseBiteLabs/Game-Boy-Enhance), AGBM-02 AA-battery revision 1.1, pinned to commit `1c4d928bbfe7ed568c83c68ddea11a5f65f4e830`. Original design and this derivative are licensed under [CC BY-SA 4.0](LICENSE.md).

The KiCad schematic is the connectivity reference; the PCB supplies relative placement, the outline, and cutouts. The extraction retains 240 schematic components. Four schematic sheets cover power, CPU/interfaces/buttons, display, and audio, with labeled functional sections and nets. The four-layer, 1.2 mm board is enlarged by 1.4 around its center to provide placement and routing space. Component packages keep their real dimensions. This enlarged layout does not fit the original shell.

## Current stage

Genuine JLCPCB imports are in `imports/`, created by `tsci import --jlcpcb --use-exact-footprint`. Their footprints and courtyards are retained. Handwritten/custom component footprints are not used. Components without verified catalog replacements remain explicitly unresolved in the schematic; missing PCB geometry is a release blocker, not an approved omission. TI parts are preferred for active circuitry. See [BLOCKERS.md](BLOCKERS.md) for the sourcing conflict involving the original Game Boy CPU.

The reference includes cartridge and link ports, SRAM, LCD FFC, clock, buttons/hotkey logic, battery protection, converters, sequencing, reset, stereo filtering, headphone/speaker amplifier, volume control, and test points. Their connectivity is being audited against manufacturer documentation. A passing netlist comparison alone does not establish electrical correctness.

## Develop

```sh
bun install
bun run typecheck
bun run check:netlist
bun run check:placement
bun run build
tsci dev index.circuit.tsx
```

`index.circuit.tsx` explicitly sets `routingDisabled`; placement must be checked before routing is enabled. Fanout phases for the dense interfaces are defined in `lib/routing.tsx` for later evaluation. Minimum routing vias are configured as 0.45 mm copper diameter / 0.30 mm hole. Do not interpret an exit code of zero from the CLI as a clean DRC: inspect the emitted errors and unresolved component list.

## Reference and audit trail

- `reference/kicad/`: original upstream design files.
- `reference/netlist.xml`: KiCad schematic export.
- `scripts/extract-reference.py`: extraction using KiCad's geometry API.
- `lib/generated/reference.json`: extracted geometry, component pins, and nets.
- `reference/UPSTREAM-AGBM-02.md`: upstream BOM and assembly notes.
- `reports/`: investigation and check results; dated stage reports distinguish current from superseded checks.

No fabrication outputs are released while sourcing, placement, connection verification, and routing remain incomplete.
