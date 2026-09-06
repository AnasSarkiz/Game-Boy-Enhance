# JLCPCB sourcing and import blockers

**Active redesign:** the selected processor is now T113-S4. See the [current S4 JLCPCB table](s4/JLCPCB-PARTS.md). The table below applies to the historical AGBM-02 circuit.

Checked 2026-09-05 with the JLCPCB search/import commands. “No verified match” means no usable exact match was found in these searches; it is not a claim that the part can never appear in the catalog. No custom component footprint is used to fill a missing listing.

## Reference parts without a verified exact JLCPCB match

| Reference | Reference component | Finding | Current implementation |
|---|---|---|---|
| U1 | Nintendo AGB-CPU, 128 pins | No verified listing for the original processor. A similarly named Renesas search result is a different 52-pin MCU. | Original 128-pin schematic retained; PCB footprint unresolved. **Blocks routing/completion.** |
| P1 | Game Boy cartridge slot, including case contacts | No verified compatible listing found. | All original contacts/nets retained; PCB footprint unresolved. **Blocks completion.** |
| P4 | AGB-LINK connector | No verified compatible listing found. | Original link interface retained; PCB footprint unresolved. **Blocks completion.** |
| U2 | Original donor AGB-SRAM | Reference does not specify a purchasable manufacturer part number. Search returns other memories, not an established exact donor match. | C466866, CY62146EV30LL-45ZSXI, imported with explicit address/data/control remapping. Electrical/timing compatibility is still unqualified. |
| U4, U8 | NCV8164ASN250T1G, original SOT-23-5 option | No exact match found. Other NCV8164 packages are listed. | TI TPS74525PQWDRVRQ1, C2865628, imported. Different package, pin mapping, PG timing and analog characteristics are documented. |
| SW1 | CSS-1310B / CSS-1310TB, three-position slide switch | No exact match found under either spelling. | CSS-1210TB, C2921710, imported. Two-position OFF/ON adaptation with the physical common on pin 3. |

Search evidence: `reports/jlcpcb-agb-cpu.json`, `jlcpcb-cpu-agb.json`, `jlcpcb-nintendo-agb.json`, `jlcpcb-cartridge-gba.json`, `jlcpcb-link-exact.json`, `jlcpcb-sram-exact.json`, `jlcpcb-ldo-exact.json`, `jlcpcb-switchpower.json`, and `jlcpcb-switch-exact.json`.

## Listed parts that could not be imported

These are **import failures**, not missing JLCPCB listings.

| Reference / candidate | Catalog item | Import problem | Selected alternative |
|---|---|---|---|
| F1, F0805B2R00FSTR | C5355645 | Exact-footprint import returned “Component not found.” | 0466002.NRHF, C3105; 1206 fast 2 A fuse. Clearing curve/I²t equivalence is unverified. |
| 47 pF capacitor candidate, CL10C470JB8NNNC | C1671 | Exact-footprint import failed. | FCC0603N470J500CT, C5137501. |
| 4.194304 MHz / 12 pF crystal candidate | C700804 | Exact-footprint import failed. | 20 pF C718663 imported; oscillator loading and startup remain blockers. |

The exact **SW2/SW3 shoulder switch 1825027-5 was found and imported successfully as C86476**. It is not an unavailable part. An earlier -8 candidate has been superseded.

## Other blockers

- The requested npm module `@tscircuit/jlcpcb` returned 404. Genuine JLCPCB components are imported with `tsci import --jlcpcb --use-exact-footprint` into `imports/`; there is no fabricated package or custom replacement geometry.
- Routing remains disabled for the placement stage. The missing CPU/connector footprints, pending electrical qualification and button-body copper keepouts prevent a complete routed manufacturing result.
- See [BLOCKERS.md](BLOCKERS.md), [pin mapping](docs/PIN-MAPPING.md), and [datasheet audit](docs/DATASHEET-AUDIT.md) for deviations and tool limitations.
