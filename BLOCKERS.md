# Blockers and deviations

Status: **placement development, routing disabled**, 2026-09-05. Do not fabricate this revision.

## Required sourcing decisions

1. **Original AGB CPU U1:** the user requires the same processor imported from JLCPCB. It is a proprietary Nintendo donor component; no verified JLCPCB listing or compatible TI processor has been identified. The CPU schematic remains present, but its footprint is unresolved under the no-custom-footprint requirement. A verified listing for the actual part is needed to satisfy both requirements. A different MCU would change the architecture and require firmware; no such substitution has been made.
2. **Remaining catalog coverage:** only the verified files in `imports/` have supplier geometry at this checkpoint. Other parts remain unresolved until catalog selection, pin mapping, and courtyard checks are complete. No custom footprint substitutes are rendered.
3. **Original mechanical interfaces:** cartridge slot, link connector, membrane button contacts, battery contacts, and donor-specific packages cannot be assumed interchangeable with a generic catalog connector. Catalog alternatives require explicit electrical pin remapping and documented mechanical changes. The source connections are retained.
4. **`@tscircuit/jlcpcb`:** the requested npm package returned 404 from npm. The available official workflow is `tsci import --jlcpcb --use-exact-footprint`, producing genuine supplier imports in `imports/`. A local fake package or handwritten catalog footprint is not used.

## Electrical differences requiring validation

- **U7 TLV9364 → TI TLV9064IPWR (JLCPCB C779410):** the reference powers U7 from the 2.5 V VAUD rail, below TLV9364's 4.5 V minimum. TLV9064 supports 1.8–5.5 V and has the same quad TSSOP-14 pinout. Filter/noise/stability and output loading still require validation; this substitution is not a completed audio qualification. Sources: [TLV936x](https://www.ti.com/lit/ds/symlink/tlv9361.pdf), [TLV9064](https://www.ti.com/lit/ds/symlink/tlv9064.pdf).
- **U14 MIC1553 symbol versus MIC1557 BOM:** the reference symbol value disagrees with the BOM. The current selection follows the BOM, MIC1557YM5-TR (C144169), after checking its timer pinout. A TI replacement has not yet been qualified. [Microchip datasheet](https://ww1.microchip.com/downloads/en/DeviceDoc/MIC1555-57-IttyBitty-RC-Timer-Oscillator-DS20005730B.pdf).
- **U9:** use the actual noninverting SN74LVC2G34DBVR; an upstream linked SN74LVC2G14 datasheet describes a different, inverting part. [TI product](https://www.ti.com/product/SN74LVC2G34).
- **U1 phantom pins 129 and 130:** the exported schematic connects these to GND, but the CPU symbol library and physical PCB have 128 pins. These two nonexistent pad nodes are excluded explicitly. The 128 real CPU pins remain represented.
- Manufacturer datasheet verification is incomplete, particularly proprietary donor CPU/SRAM interfaces. No claim that every connection has been independently verified is made.

## Geometry, representation, and routing

- The outline and component centers are enlarged by 1.4; cutout centers move with the outline while individual cutout sizes remain unchanged. This is user-authorized extra routing space and is not shell compatible.
- Original routing (3278 track objects, 548 vias) and 108 copper zones are not imported. Four-layer routing and plane design remain unfinished.
- P1 alphanumeric contacts C1/C2/S1/S2 map to numeric tscircuit ports 33/34/35/36. Original labels remain in the extracted reference.
- Original duplicate lands, the alternative SRAM package lands, and the GND/AGND net tie require explicit handling if suitable catalog parts are found. No artificial short or fake pad geometry has been substituted.
- The five upstream bitmap-logo footprints are omitted; written attribution is retained. Copper/mechanical functional elements are tracked separately.
- Nested per-chip fanout triggered a cross-group net lookup error in the current tscircuit build. Region-based phased fanout is configured for later testing. It has not been demonstrated to route this board.
- Imported courtyards must be present and checked in the compiled placement. The earlier reference-footprint draft lacked them and has been superseded.

## Check status

- Catalog-only checkpoint: TypeScript passes. The placement build completes but records **221 missing footprints, 221 missing courtyards, one board-edge error, and 49 schematic-sheet boundary warnings**. Nineteen components have genuine imported courtyards. These counts are the first sourcing checkpoint, not a completed board.
- The previous placement check reported edge/cutout violations. It is not evidence of a clean current layout.
- Reference KiCad DRC could not complete: `kicad-cli pcb drc` crashed with a Swift array-index error on this host. A second attempt with explicit font configuration also crashed.
- Full-board routing, fanout success, copper-plane continuity, clearance DRC, analog performance, and fabrication output validation remain unverified. Routing stays disabled until placement is reviewed.
