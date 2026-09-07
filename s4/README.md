# T113-S4 tabletop HDMI console

The user approved a tabletop console instead of a handheld. The active processor remains **T113M4020DC0 / C41411351**, using the authorized unchanged S3 supplier geometry. Exact S4 electrical/package qualification remains open.

The connected core has **103 components, 54 nets and seven schematic sheets** on a **130 × 110 mm four-layer board**. Power, CPU/clocks/reset, SD boot storage, USB-C power/recovery, one protected USB-A controller port and four status LEDs are present. HDMI video/audio, source-current management, debug access and a tested Linux/emulator image remain required. Routing stays disabled, with minimum vias of 0.45/0.30 mm.

| Indicator | Meaning |
|---|---|
| POWER, green | 3.3 V rail present |
| RUN, green | Firmware-driven Linux heartbeat |
| ERROR, red | Firmware-reported fault/panic when integrated |
| USB FAULT, red | Hardware USB power-switch fault |

See [connection details and sources](CONSOLE-REVIEW.md), [blockers](BLOCKERS.md), [supplier table](JLCPCB-PARTS.md) and [firmware integration fragment](firmware/console-leds.dtsi). None of the LEDs proves full-board health. The firmware fragment is not a bootable or tested image.

## Active checks

From the repository root, using the installed Bun/tsci toolchain:

```sh
bun run prepare:s4:console
bun run generate:s4:core
bun run typecheck
bun run audit:s4:imports
bun run check:s4:netlist
bun run check:s4:placement
bun run build:s4:core
bun run audit:s4:core
bun run audit:s4:console
bun run audit:s4:retention
bun run preview:s4:sheets
bun run check:release
```

The active stage checks pass with zero emitted diagnostics and a minimum courtyard gap of 0.1044 mm. `check:release` intentionally fails because required console circuitry and routed copper are absent. The separate upstream reference audit still reports unresolved source ERC findings; a successful export never means the reference was electrically qualified.

## Reference and history

The [Trellis Core reference](https://github.com/protolux-electronics/trellis_core/tree/db4fe71623c14bcea47d7457d0db4c99d3899124) supplies selected connections and parts; its custom KiCad footprints are not copied. Manufacturer documentation is reviewed separately. Local imports are genuine `tsci import --jlcpcb --use-exact-footprint` outputs, not handwritten footprints or a fabricated package.

The original AGB CPU/SRAM, LCD, cartridge/link interfaces, battery operation and handheld controls/audio are outside the new tabletop product scope. The [240-row historical disposition table](reports/enhance-retention.csv) records this change without DNP entries. `audio.json`, `controls.json`, audio-only scripts and their reports describe the previous handheld adaptation; they are not inputs to the active console generator or current acceptance checks.

Registry v1.0.3 remains the earlier 112-component stage. The current console entrypoint is available on GitHub; a future registry update must revise its explicit package boundary and release gate, then validate the packaged entrypoint.
