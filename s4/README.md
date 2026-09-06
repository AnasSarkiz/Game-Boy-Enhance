# S4 Game Boy console redesign

The selected processor is **Allwinner T113-S4 / T113M4020DC0, C41411351**. This supersedes the earlier Nintendo CPU design as the development target. Status: **reference and sourcing audit; implementation blocked on the exact CPU import**. There is no S4 console PCB or validated firmware yet. The repository's root `index.circuit.tsx` still contains the older AGBM-02 work and must not be mistaken for this redesign.

## Required result

- Linux GB/GBC/GBA emulation, tested on the actual S4; compatibility and frame rate must be measured.
- HDMI monitor connection including audio, USB controller support, game/save storage, reset/recovery/debug, and properly sequenced power.
- Preserve the intended controls and audio functions. The old Nintendo display, SRAM, cartridge and link circuitry cannot be transferred electrically; any compatibility loss must remain explicit. No component may be marked DNP to hide a missing function.
- TI preferred for suitable supporting ICs. Only genuine JLCPCB component imports with courtyards; no handwritten footprints or relabeled S3 component.
- A larger console PCB is allowed. Start with a four-layer plan, but verify the stackup, current paths, USB/HDMI impedances and signal timing before selecting final dimensions. Minimum via copper diameter 0.45 mm and hole 0.30 mm.
- Keep routing disabled until all components have real footprints and placement passes. Use schematic sheets and sections for power, processor/clock/reset, storage, HDMI/audio, and controls/USB/debug. Then evaluate fanout, route, and run copper DRC.

## Work completed

The [Trellis Core reference](https://github.com/protolux-electronics/trellis_core/tree/db4fe71623c14bcea47d7457d0db4c99d3899124) is pinned and retained under `reference/trellis_core/` for its circuit information. Its original license and notices are included. Local custom KiCad footprint libraries have **not** been imported into the tscircuit design.

KiCad exported 84 reference components and 129 processor pins including the exposed ground pad. Reproducible reports include the complete reference BOM, CPU pin/net table, supply-net checks and ERC diagnostics. These describe the reference, not a newly connected console.

The exact TI TLV62569PDDCR regulator and Analog Devices ADV7513BSWZ HDMI transmitter were imported from JLCPCB. Their supplier geometry is unchanged. Each has a closed courtyard enclosing all pads, with no overlapping pad bounding boxes. This is only a component-geometry check; neither part is yet wired into an S4 board.

See [BLOCKERS.md](BLOCKERS.md), [connection review](CONNECTION-REVIEW.md) and [sourcing table](JLCPCB-PARTS.md). No PCB preview, manufacturing output or S4 registry release is provided while the CPU geometry is missing.

## Reproduce the audits

From the repository root:

```sh
bun run typecheck
bun run audit:s4:imports
bun run audit:s4:reference
```

The reference audit currently exits with status 1 because the upstream reference contains unresolved values and ERC errors. These are not suppressed. `reports/reference-erc.json` records the separate KiCad ERC run, including ignored checks and unavailable-library warnings. A clean result requires more than completing an export.

## Acceptance before manufacturing

Require a qualified BOM and manufacturer pin map, power/current/sequencing budgets, a schematic-to-compiled-net comparison, zero actionable placement/copper DRC errors, complete required connections and ground returns, and fabrication review. Prototype testing must demonstrate power-up/brownout/recovery, 256 MB RAM operation, game/save storage, controllers/buttons, HDMI video and audio, and representative games. Software checks cannot prove that a physical board has no assembly shorts or that every game works.
