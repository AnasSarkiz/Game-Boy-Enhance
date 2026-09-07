# Blockers and deviations

## Active tabletop console

The user approved an HDMI console with USB controllers. The active 103-component core adds POWER/RUN/ERROR/USB FAULT indicators and a protected host port; its placement/connection checks pass. HDMI, input-power qualification, S4 documentation, firmware, routing and prototype validation remain unfinished. See [current blockers](s4/BLOCKERS.md), [console review](s4/CONSOLE-REVIEW.md), and [parts table](s4/JLCPCB-PARTS.md).

The following notes describe the historical `agbm-02.circuit.tsx` design.

**Placement-stage work in progress, 2026-09-05. Routing is disabled. Do not fabricate this revision.**

## Sourcing

The [JLCPCB blocker table](JLCPCB-BLOCKERS.md) distinguishes missing exact matches, available alternatives, and catalog import failures.

The [assembly requirements](docs/ASSEMBLY-REQUIREMENTS.md) require every intended function to remain populated and operational. No DNP workaround is permitted. The unresolved CPU/ports, unqualified screen assembly and ineffective legacy JP3 are completion blockers even though no component is marked DNP.

1. **U1 Nintendo AGB CPU:** no verified JLCPCB listing for the original processor. A different TI MCU would not run this hardware as wired. The user's requirements to retain this CPU, import it from JLCPCB and avoid custom footprints cannot all be satisfied without a real catalog listing. All 128 real schematic pins remain; the PCB footprint is unresolved.
2. **P1 cartridge and P4 link connectors:** no verified compatible JLCPCB matches. Their signals and contacts remain in the schematic with unresolved PCB geometry. Generic connectors are not silently substituted.
3. **Requested `@tscircuit/jlcpcb` npm module:** npm returned 404. The available official workflow is `tsci import --jlcpcb --use-exact-footprint`. Genuine generated imports with supplier part numbers and courtyards are used. No fake package or custom component footprint is supplied.

## Electrical and mechanical deviations

Detailed physical pin assignments and manufacturer links are in [PIN-MAPPING.md](docs/PIN-MAPPING.md); electrical checks and unresolved operating limits are in [DATASHEET-AUDIT.md](docs/DATASHEET-AUDIT.md).

| Block | Change from the reference | Remaining qualification |
|---|---|---|
| U2 SRAM | C466866 CY62146EV30LL-45ZSXI; 256 K × 16, 44-pin TSOP, remapped to the original 128 K × 16 bus. JP2 is populated 0 Ω to ground A17. | CPU timing, 200 µs SRAM startup access restriction, loading and compatibility. Original optional BYTE mode is unavailable; JP3 remains an unused legacy header. |
| U4/U8 LDOs | TI TPS74525PQWDRVRQ1 C2865628 replaces NCV8164ASN250T1G; explicit EN/PG/IN/OUT/thermal-pad remap. | PG timing, current limit, output discharge, output noise and current budget differ. |
| U7 audio filters | TI TLV9064IPWR C779410 replaces TLV9364, whose 4.5 V minimum exceeds the reference's 2.5 V VAUD. Same 14-pin quad layout. | Filter response, stability, noise and output loading. |
| U14 timer | MIC1557YM5-TR C144169 follows the upstream BOM instead of the MIC1553 symbol value. | Blink frequency/thresholds; no qualified TI substitution. |
| U9 buffer | Actual noninverting SN74LVC2G34DBVR selected. | The upstream G14 datasheet link describes a different, inverting part. |
| SW1 power | CSS-1210TB C2921710, two-position OFF/ON; correct physical common is pin 3. | Original middle position and nonexistent shield-pad node are omitted. New mechanical actuation differs. |
| SW4/SW5/SW6 | Eight individual Alps SKRRABE010 C125046 switches replace three composite symbols and membrane/contact artwork. | Tactile behavior replaces conductive-pad options; manufacturer underside copper keepouts still need implementation before routing. |
| SW2/SW3 | Exact TE 1825027-5 C86476 is now imported. | Supplier land/hole dimensions and actuation clearance need physical assembly review. Earlier -8 substitution is superseded. |
| VR1/VR2 | JLCPCB trimmer and exact Alps dual volume part use supplier packages; VR2 requires pin remapping. | Wheel/gang continuity and mechanical access need sample confirmation. |
| BT1/SP1 | JLCPCB JST PH two-pin connectors for an external AA holder and speaker. | Original battery/speaker mounting contacts replaced by cables. Speaker remains floating BTL. |
| JP1/JP3/NT1 | Two-pin headers replace solder jumpers; NT1 is a populated 0 Ω joining GND/AGND. | Header/shunt configuration and nonzero net-tie impedance; JP3 does not control the selected SRAM. |
| X1 clock | 4.194304 MHz C718663, larger HC-49S-SMD, 20 pF load. Original 27 pF/33 pF capacitors retained. | CPU oscillator drive, effective load and startup margin are not verified. |
| F1 protection | 1206 fast 2 A 0466002.NRHF C3105 replaces the unimportable original 0805 fuse. | Clearing curve/I²t coordination is not established. |
| Fixed passives/test points | All fixed resistor/capacitor values retained through catalog parts; 100 µF CP parts use MLCCs. Larger JLCPCB test loops replace bare pads. | DC bias, ESR, microphonics, ratings/load budget and assembly accessibility remain open. |
| LCD options | Genuine 40-pin FFC; mounting terminals 41/42 map to the reference's GND-connected pin 0. Z57/Z58 select the original 100 pF option. | Actual display/cable/contact side and the alternative 0 Ω screen configuration remain unqualified. |

The reference export contains U1 GND nodes 129/130 absent from both the 128-pin symbol library and physical package. These two nonexistent nodes are excluded explicitly. The selected SRAM omits its donor-only CE2/NC/BYTE endpoints as documented. P1's alphanumeric C1/C2/S1/S2 use numeric schematic ports 33/34/35/36. Every remaining mapped endpoint is checked against the compiled circuit.

## Board geometry and tool limits

- Board outline and reference centers are enlarged by **1.8**, approximately **236.3 × 130.3 mm**, with four layers and 1.2 mm thickness. The 19 cutout centers move with the board while their individual sizes remain unchanged. This is not shell compatible.
- Actual component package dimensions remain unchanged. Recorded placement offsets clear larger imported parts, courtyards, edges and cutouts. Catalog rotations were compared with reference pin positions; geometry was not rewritten. `lib/placement.ts` and `lib/generated/catalog-orientations.json` record these choices.
- Five upstream bitmap-logo footprints are omitted; written attribution is retained. Original alternative component lands, conductive button artwork and assembly options are not custom-rendered.
- Original 3278 track objects, 548 vias and 108 zones are not imported. Four-layer copper routing and power/ground planes remain unfinished. Power-stage loop placement still needs detailed review despite the enlarged board.
- Minimum routing via copper/hole diameters are configured as **0.45 / 0.30 mm**, with default vias **0.70 / 0.30 mm**. These are configuration checks, not evidence of successfully routed vias.
- Per-chip nested fanout previously triggered a cross-group net lookup error. Region-based fanout phases for U1/U2/P2 are prepared; full-board fanout success is unproven. The routing-difficulty analysis is an estimate, not an autorouter result.
- Importer electrical errors were corrected outside supplier footprint files: TPS22917 is a semiconductor chip, not a mechanical switch; a passive crystal terminal must not require ground; the power-switch schematic uses the manufacturer's common-pin assignment. Custom schematic symbol drawing is not custom PCB geometry.
- Original KiCad DRC crashes on this host with a Swift array-index error, including a retry with explicit font configuration. A clean reference DRC was not obtained.

## Verification status

`reports/current-status.json` and `reports/reference-connectivity.csv` are generated by `bun run audit:reference`. The current design has 245 physical component records, 242 imported courtyards, and three unresolved footprints (U1, P1, P4). The audit compares 830 mapped pin-to-net endpoints across 217 connected nets, and independently checks critical replacement pinouts. Reference NC nets are represented separately.

TypeScript and source netlist checks have passed. The compiler also emits a schematic-layout overlap notice for P2/TP11; it remains a presentation issue to resolve. Placement/build diagnostics are preserved in `reports/`; connector accessibility and generic source metadata warnings still require review. The separate `check:release` deliberately fails while footprints are unresolved or routed copper is absent. An exit code of zero from `tsci build` alone is not a clean DRC.

**Not completed:** independent verification of every connection, proprietary CPU/display electrical qualification, timing/current budgets, copper planes, complete routing, final copper DRC, analog tests and manufacturing validation. No release or fabrication readiness is claimed.
