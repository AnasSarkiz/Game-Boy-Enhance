# Game Boy Enhance AGBM-02 in tscircuit

**2026-09-06: the active development target is the [T113-S4 console redesign](s4/README.md).** Its reference, sourcing results and connection audit are in `s4/`. The CPU now reuses an unchanged JLCPCB S3 import with S4 MPN/ordering metadata, as authorized. Package qualification remains open; only an isolated CPU preview exists, not a console PCB. The root circuit and the published registry package still contain the earlier AGBM-02 adaptation described below.

**Work in progress. Routing is disabled. This is not a complete or fabrication-ready board.**

Adaptation of [MouseBiteLabs/Game-Boy-Enhance](https://github.com/MouseBiteLabs/Game-Boy-Enhance), AGBM-02 AA-battery revision 1.1, pinned to commit `1c4d928bbfe7ed568c83c68ddea11a5f65f4e830`. Original design and this derivative are licensed under [CC BY-SA 4.0](LICENSE.md).

The KiCad schematic is the connectivity reference; the PCB supplies relative placement, the outline, and cutouts. The extraction retains 240 schematic components. Five schematic sheets cover power, processor/memory/cartridge, controls/link/clock, display, and audio, with labeled functional sections and nets. The four-layer, 1.2 mm board is enlarged by 1.8 around its center to provide placement and routing space. Component packages keep their real dimensions. This enlarged layout does not fit the original shell.

## Current stage

Genuine JLCPCB imports are in `imports/`, created by `tsci import --jlcpcb --use-exact-footprint`. Their footprints and courtyards are retained. Handwritten/custom component footprints are not used. Components without verified catalog replacements remain explicitly unresolved in the schematic; missing PCB geometry is a release blocker, not an approved omission. TI parts are preferred for active circuitry. See the [JLCPCB blocker table](JLCPCB-BLOCKERS.md) and [BLOCKERS.md](BLOCKERS.md).

The reference includes cartridge and link ports, SRAM, LCD FFC, clock, buttons/hotkey logic, battery protection, converters, sequencing, reset, stereo filtering, headphone/speaker amplifier, volume control, and test points. Their connectivity is being audited against manufacturer documentation. A passing netlist comparison alone does not establish electrical correctness.

Required functions must be populated and operational; DNP is not a workaround for an unavailable or unqualified part. The [assembly requirements](docs/ASSEMBLY-REQUIREMENTS.md) record the current controls/display selections, CPU decision and outstanding functional gaps.

The current compiled circuit has 245 physical component records (the three composite button symbols become eight switches), 242 imported courtyards, and three unresolved footprints: U1, P1 and P4. The reference audit checks 830 mapped pin-to-net endpoints across 217 connected nets. These counts do not imply datasheet qualification or completed routing. See `reports/current-status.json`.

## Develop

```sh
bun install
bun run typecheck
bun run check:netlist
bun run check:placement
bun run build
bun run audit:reference
bun run check:release # Expected to fail until the release blockers are resolved
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

## Published projects

- [GitHub source and complete KiCad reference](https://github.com/AnasSarkiz/Game-Boy-Enhance)
- [tscircuit project](https://tscircuit.com/AnasSarkiz/Game-Boy-Enhance)

`python3 scripts/publish-registry.py` stages the runnable circuit source and calls `tsci push`. The registry rejects the original 16 MB KiCad PCB with HTTP 413, so the original design and investigation reports remain in GitHub. No circuit source, imported part, or extracted net is excluded from the runnable package.
