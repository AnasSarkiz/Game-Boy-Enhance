# Connected power, CPU, clocks and reset stage

Entry: `power-core.circuit.tsx`. This is an **incomplete console**, with 58 populated components, two schematic sheets/sections and routing disabled on a 110 × 110 mm, four-layer placement board. Minimum via settings remain 0.45/0.30 mm. No manufacturing outputs are released.

## Implemented and checked

The exact JLCPCB imports supply all component footprints and courtyards. The S4 CPU retains C5197687 geometry but orders **T113M4020DC0 / C41411351**. The audit compares 157 connected endpoints across 21 net groups against the pinned schematic, accounting for the documented reset change. It checks procurement identities, every CPU supply/ground role, NC106, courtyard separation and emitted DRC diagnostics.

The two TI TLV62569PDDCR stages include inductors, input/output capacitors, feedback resistors, feed-forward capacitors, enable pulls, power-good sequencing and the status LED. Nominal calculated outputs are 3.318 V and 0.906 V. Feedback lower resistors are 100 kΩ, below TI's 200 kΩ recommendation. The retained 10 pF feed-forward capacitors differ from TI's 6.8 pF example; loop stability and load transients still need qualification. [TI datasheet, section 8.2](https://www.ti.com/lit/ds/symlink/tlv62569.pdf)

CPU supply inputs now require connections; pins 28/30 are internal-LDO outputs, pins 91/129 require ground, and pin 106 must remain unconnected. Exact S4 voltage tolerances are not asserted. R11.1 moves from 3.3 V to 1.8 V because RESET belongs to VCC-RTC. The family document requires reset hold after rails settle; the retained RC network has not been proven to meet startup or brownout timing. [Allwinner tables 4-2/5-2 and section 5.12](https://dl.linux-sunxi.org/T113-S3/T113-S3_Datasheet_v1.6_20220303.pdf)

Both clocks use standard crystal primitives/symbols with unchanged imported footprints. The 24 MHz part has a catalog load specification of 8 pF. The RTC part is 32.768 kHz/12.5 pF; its imported 1.0 × 1.8 mm lands at 2.5 mm spacing agree with the Epson drawing. External capacitors remain 10 pF and 18 pF respectively; actual stray capacitance, drive and startup margins require measurement. [Main clock catalog](https://www.lcsc.com/product-detail/C7294624.html), [Epson manufacturer drawing](https://datasheet.lcsc.com/datasheet/pdf/d4d1bd2e87b2e72a8e8e7fe7d590f4c0.pdf?productCode=C32346)

The CPU decoupler rows retain their radial distance from the reference. Extra spacing runs along each edge. Bulk capacitors and crystals/load capacitors have explicit layout overrides to clear imported courtyards and shorten clock connections. These are placement changes; high-frequency return paths remain unrouted.

The pre-route DXIN analysis totals 10.46 mm across its three estimated branches. This is not a routed clock length or a timing pass. The routing-difficulty report flags a region near C23 at an estimated 10.4% failure probability; this is a solver heuristic, not a measured outcome. Both reports are retained for the later fanout/routing stage.

## What remains

- **26 reference components remain unimplemented**, explicitly listed in `generated/power-core.json`: input connector/protection, storage/recovery, straps and the unresolved R8/R9 ADC divider. They have not been designated DNP or removed from the intended design.
- HDMI/audio, controllers/buttons, debug/recovery access and firmware are additional unfinished console functions. The present input is only the named `INPUT_5V` net; a complete external power interface is still required.
- Exact S4 package/ground-land approval, all voltage limits, sequencing, load budgets, brownout reset, regulator stability, effective decoupling and thermal performance remain open.
- No routed copper, ground planes, fanout result, impedance check or prototype test exists. Netlist agreement and placement DRC cannot prove operating functionality or assembly shorts.

## Reproduce

```sh
# To refresh reference positions, use KiCad's Python with pcbnew:
# <KiCad Python> scripts/extract-s4-placement.py
bun run generate:s4:core
bun run typecheck
bun run audit:s4:imports
bun run check:s4:netlist
bun run check:s4:placement
bun run build:s4:core
bun run audit:s4:core
```

`audit:s4:core` fails on emitted errors **or warnings**, independently of the CLI exit status. The isolated CPU preview is separately retained as a negative test: `audit:s4:cpu` expects exactly 22 missing-required-connection errors after its build, rather than treating the deliberately unwired fixture as a valid circuit.
