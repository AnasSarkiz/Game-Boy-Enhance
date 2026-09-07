# Physical pin mapping

**Historical circuit finding, 2026-09-07:** the earlier volume-wheel mapping feeds the wipers. The historical S4 audio adaptation (commit ad6b230) corrects this to common pin1, input endpoints pin3/pin5 and output wipers pin2/pin4, with ROUT-based headphone detection. See [the reviewed mapping and sources](../s4/AUDIO-RETENTION-REVIEW.md). The historical root circuit has not been corrected or qualified by this S4 change.

This file describes electrical adaptations, not replacement footprints. All rendered component geometry comes unchanged from `tsci import --jlcpcb --use-exact-footprint`. The machine-readable map is `lib/pin-mapping.ts`; `reports/reference-connectivity.csv` enumerates every mapped reference connection. It is a connectivity record, not proof of complete electrical qualification.

## TI 2.5 V regulators U4 and U8

NCV8164ASN250T1G is replaced by TPS74525PQWDRVRQ1, JLCPCB C2865628. [TI TPS745-Q1 datasheet, DRV pin functions](https://www.ti.com/lit/ds/symlink/tps745-q1.pdf).

| Original pin / role | Imported pin / role |
|---|---|
| 1, VI | 6, IN |
| 2, GND | 3, GND; 7, thermal pad; 2, NC tied to ground as recommended |
| 3, enable | 4, EN |
| 4, power good | 5, PG |
| 5, VO | 1, OUT |

U8 PG still drives U4 EN and U18 ON. U4 PG stays unconnected. Fixed outputs remain VDD2 and VAUD, respectively. PG delay, current limit, output discharge and noise differ; see BLOCKERS.md.

## SRAM U2

CY62146EV30LL-45ZSXI, C466866, is a 256 K × 16, 45 ns, 2.2–3.6 V SRAM. The original CPU addresses only 128 K × 16. [Infineon datasheet, 44-pin TSOP II pin configuration](https://www.infineon.com/assets/row/public/documents/10/49/infineon-cy62146ev30-mobl-4-mbit-256k-x-16-static-ram-datasheet-en.pdf).

| Function | Imported pin numbers, in bit order |
|---|---|
| MA0…MA16 | 5, 4, 3, 2, 1, 44, 43, 42, 27, 26, 25, 24, 23, 22, 21, 20, 19 |
| MD0…MD15 | 7, 8, 9, 10, 13, 14, 15, 16, 29, 30, 31, 32, 35, 36, 37, 38 |
| WE, OE, LB, UB, CE | 17, 41, 39, 40, 6 |
| VDD2 | 11, 33 |
| GND | 12, 34; CE pin 6 remains asserted low |
| A17 / bank select | 18 → original JP2-B net; JP2 is populated 0 Ω to ground |
| NC | 28, explicitly unconnected |

The reference's VDD2-connected CE2 pin 12 has no equivalent on this single-enable SRAM. The replacement is permanently selected as in the reference (CE1 low, CE2 high). Original unused pins 9 and 10 disappear. Original pin 13 is redundant ground and maps to pin 12 with original pin 27. Original pin 47, the optional BYTE configuration contact, has no equivalent; JP3 remains as a labeled, unused legacy header. This revision does not implement an 8-bit SRAM mode. U1's address/data/control nets are preserved. Compatibility and startup timing are not established by this pin table.

## Buttons and switches

Original composite symbols SW4/SW5/SW6 become eight real SKRRABE010 switches (C125046). Each is centered on the reference's four tactile lands, not its membrane artwork. [Alps drawing and circuit](https://tech.alpsalpine.com/cms.media/product_catalog_ta_02_skrr_en_60cbcb0002.pdf).

| Original signal / return | Physical component |
|---|---|
| SW4.1 / SW4.3 | SW_B |
| SW4.2 / SW4.4 | SW_A |
| SW5.1 / SW5.3 | SW_START |
| SW5.2 / SW5.4 | SW_SELECT |
| SW6.1 / SW6.5 | SW_UP |
| SW6.2 / SW6.6 | SW_RIGHT |
| SW6.3 / SW6.7 | SW_DOWN |
| SW6.4 / SW6.8 | SW_LEFT |

For each switch: **signal → pins 1 and 3; GND → pins 2 and 4**. These two internal pairs are explicitly declared. Pressing connects the pairs. No signal is permanently shorted to ground.

SW2/SW3 use the exact TE 1825027-5 (C86476). The earlier -8 candidate is superseded. Pins 1/2 are the switch contacts; imported pins 3/4 are mechanical supports and remain unconnected. The supplier holes are larger than the TE recommended holes and need assembly review. [TE customer drawing](https://www.te.com/commerce/DocumentDelivery/DDEController?Action=srchrtrv&DocFormat=pdf&DocLang=English&DocNm=1825027&DocType=Customer+Drawing&PartCntxt=1825027-5).

SW1 uses Nidec CSS-1210TB (C2921710): **physical common is pin 3**, per the manufacturer, not pin 2. Original VBATT pin 1 → new pin 1; original common pins 2/3 → new pin 3; old unused throw 4 → new unused throw 2. The reference's shield pin 5 has no pad in either the original PCB footprint or the new three-contact part and is omitted. OFF/ON operation replaces the redundant middle position of the original three-position part. [Nidec CSS drawings, page 3](https://www.nidec-components.com/e/catalog/switch/css.pdf).

## Audio, display and other interfaces

VR2 uses the same Alps RK10J12R0A0B, C351175, with its supplier numbering: original ROUT 1 → 4, LOUT 2 → 2, LIN 3 → 3, RIN 4 → 5, COM 5 → 1. Supplier 6/7 are mounting terminals, unconnected to circuit nets. Gang numbering and wheel direction need continuity confirmation on a physical sample before assembly. [Alps drawing 4](https://tech.alpsalpine.com/cms.media/product_catalog_rv_03_rk10j_en_780020d1ea.pdf).

VR1 uses Bourns TC33X-2-503E (C913246), 50 kΩ: pins 1/2/3 retain their numbers and pin 2 is the wiper. [Bourns TC33 datasheet](https://www.bourns.com/data/global/pdfs/TC33.PDF).

P2 uses Amphenol 62684-402100ALF (C2931360). Pins 1–40 preserve their numbers. The reference's pin 0 is named AGND **but is wired to the GND net**, so supplier mounting pins 41/42 connect to GND. Contact-side/cable compatibility with the chosen LCD remains unqualified.

P3 uses SJ-3524-SMT-TR (C20182907): 1 sleeve/AGND, 2 tip, 3 ring, 4 tip-normal detection. [Same Sky drawing](https://www.sameskydevices.com/product/resource/sj-352x-smt.pdf).

BT1 and SP1 become JST PH two-pin board connectors (C131337) for external AA holder and speaker. Pin numbering stays 1/2. Both speaker wires remain connected to the BTL amplifier outputs; neither is grounded. JP1/JP3 become two-pin headers (C492401). JP2 is populated 0 Ω (C21189), selecting the lower SRAM bank. NT1 is a populated 0 Ω (C21189) joining GND and AGND through a component instead of a copper net tie.

P1's C1/C2/S1/S2 retain their identity in the reference and use numeric schematic ports 33/34/35/36. U1 pins 129/130 exist only in the exported netlist, not in the 128-pin symbol library or physical footprint, and are explicitly excluded. The CPU's 128 actual pins remain present.

## Importer corrections

The imported TPS22917 is represented as a mechanical switch by the converter. Its six independent semiconductor pins are rendered with a chip primitive while keeping the imported footprint and courtyard. The C718663 crystal import incorrectly marks terminal 2 as ground; it is rendered as a passive two-terminal crystal with both original oscillator connections. Neither correction changes supplier geometry. Import metadata is evidence to inspect, not a datasheet substitute.
