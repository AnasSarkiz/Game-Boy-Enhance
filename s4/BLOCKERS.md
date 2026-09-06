# S4 blockers — 2026-09-06

**Do not fabricate. No S4 PCB has been implemented or routed.** The exact CPU import is the current implementation gate; the remaining findings are qualification work that also must be completed.

| ID | Finding and evidence | Required resolution |
|---|---|---|
| S4-01 | JLCPCB lists T113M4020DC0 as C41411351, but `tsci import C41411351 --jlcpcb --use-exact-footprint` exits 1 with `Component not found`. Direct EasyEDA API response is successful HTTP/JSON with an empty `lists.lcsc`; see `reports/easyeda-C41411351.json`. The alternate C9900264054 S3/S4 listing also fails to import. | Obtain an exact supplier-linked S4 symbol/footprint that the supported importer can retrieve, including its ground pad and courtyard. If supplier geometry exists in a different supported format, add proper importer support. Do not substitute or relabel C5197687 (S3), draw a footprint, or omit the CPU. |
| S4-02 | The reference uses an S3 datasheet and mixed S3/S4 symbol metadata. Its S4 MPN does not establish all S4 voltage, power-sequencing, pinmux and boot requirements. | Obtain authoritative T113M4020DC0/S4 electrical and package documentation. Audit every pin and its power domain before final wiring. |
| S4-03 | Upstream KiCad ERC reports 3 errors: mixed U3 unit footprints and two `TODO` values. It also reports 150 warnings, including 148 library-configuration warnings and two isolated debug labels. The author's published PCB layout is explicitly untested. | Resolve the circuit findings in the new design, restore the proper reference library context for a complete ERC comparison, and independently verify placement/routing. Never claim clean reference ERC from this result. |
| S4-04 | R8/R9 have undefined values; their `V_MEASURE` input only connects to R8 in the reference. U5's displayed ZDSD08GLGEAG differs from MPN ZDSD04GLGEAG/C2875854 and its XTX datasheet. | Select and calculate the actual monitored rail/divider and input protection. Qualify the exact storage part, capacity, timing and boot behavior. Preserve intended functions; no TODO/DNP workarounds. |
| S4-05 | Reference UART4 on PD7/PD8 conflicts with RGB display data and four-lane DSI. PD21 is used for a board ID but can be LCD VSYNC. | Create one S4 pin-allocation table for display, debug, audio, storage, controls and boot straps; remap debug and board-ID functions in both hardware and software. |
| S4-06 | No qualified HDMI subsystem exists yet. ADV7513BSWZ/C408901 imports successfully, but does not by itself establish S4 display-driver compatibility, audio operation, EDID/DDC behavior or timing. | Qualify an application schematic and Linux display/audio configuration. Add transmitter power, filtering, reset/configuration, connector protection and controlled-impedance routing. TI TFP410 is video-only and is not a full audio-over-HDMI substitute. |
| S4-07 | The old AGBM-02 circuitry has Nintendo-specific memory, LCD, cartridge and link interfaces. Existing active parts have not been requalified for the S4 voltage domains. | Follow the function-by-function disposition in CONNECTION-REVIEW.md; qualify new interfaces rather than reconnecting the old net names to a different CPU. |
| S4-08 | CPU geometry blocks full placement and fanout. No S4 copper, power/ground planes, short-circuit DRC, route-completeness check, firmware benchmark or hardware test exists. | After sourcing/electrical qualification: routing-disabled placement and courtyard review, fanout and full routing, final electrical/manufacturing checks, then a tested populated prototype. |

## Scope of the current checks

The XML audit finds no duplicate physical pin assignments or mismatch in the specified reference CPU supply-pin sets. This does **not** prove the reference is electrically correct or that there are no copper shorts. A netlist export can contain internally consistent but incorrect wiring.

The two successful candidate imports pass only pad-number, courtyard-containment and conservative pad-overlap checks. The S4 has no imported geometry, so there is no S4 placement pass to report.

## Known changes from the original Enhance project

The new processor and Linux emulator replace the Nintendo execution architecture. Its original SRAM/clock/power wiring cannot be carried over. HDMI, USB controllers and emulator storage require new circuits and firmware. Original cartridge/link and original LCD compatibility are unimplemented, not silently treated as working. Board enlargement means original shell compatibility is not promised. None of these limitations is represented as DNP.
