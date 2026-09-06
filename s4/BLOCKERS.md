# S4 blockers — 2026-09-06

**Do not fabricate. No S4 console PCB has been implemented or routed.** The 58-component power/CPU/clock/reset stage now uses the unchanged S3 supplier package with S4 procurement metadata, as explicitly authorized on 2026-09-06. Package and electrical qualification remain required.

| ID | Finding and evidence | Required resolution |
|---|---|---|
| S4-01 | Exact S4 import C41411351 remains unavailable. Authorized reuse of C5197687 now supplies 129 unchanged pads, matching reference labels and a closed courtyard, with MPN T113M4020DC0 and ordering number C41411351 in the compiled preview. The imported ground land is 5.5999888 mm square; the S3 package drawing specifies a 5.72 mm exposed pad. | Qualify the supplier land pattern, exposed pad, orientation and assembly/stencil rules against exact S4 documentation. This is a candidate for placement, not a verified S4 package. See CPU-PACKAGE-REVIEW.md. |
| S4-02 | The reference uses an S3 datasheet and mixed S3/S4 symbol metadata. Its S4 MPN does not establish all S4 voltage, power-sequencing, pinmux and boot requirements. | Obtain authoritative T113M4020DC0/S4 electrical and package documentation. Audit every pin and its power domain before final wiring. |
| S4-03 | Upstream KiCad ERC reports 3 errors: mixed U3 unit footprints and two `TODO` values. It also reports 150 warnings, including 148 library-configuration warnings and two isolated debug labels. The author's published PCB layout is explicitly untested. | Resolve the circuit findings in the new design, restore the proper reference library context for a complete ERC comparison, and independently verify placement/routing. Never claim clean reference ERC from this result. |
| S4-04 | R8/R9 have undefined values; their `V_MEASURE` input only connects to R8 in the reference. U5's displayed ZDSD08GLGEAG differs from MPN ZDSD04GLGEAG/C2875854 and its XTX datasheet. | Select and calculate the actual monitored rail/divider and input protection. Qualify the exact storage part, capacity, timing and boot behavior. Preserve intended functions; no TODO/DNP workarounds. |
| S4-05 | Reference UART4 on PD7/PD8 conflicts with RGB display data and four-lane DSI. PD21 is used for a board ID but can be LCD VSYNC. | Create one S4 pin-allocation table for display, debug, audio, storage, controls and boot straps; remap debug and board-ID functions in both hardware and software. |
| S4-06 | No qualified HDMI subsystem exists yet. ADV7513BSWZ/C408901 imports successfully, but does not by itself establish S4 display-driver compatibility, audio operation, EDID/DDC behavior or timing. | Qualify an application schematic and Linux display/audio configuration. Add transmitter power, filtering, reset/configuration, connector protection and controlled-impedance routing. TI TFP410 is video-only and is not a full audio-over-HDMI substitute. |
| S4-07 | The old AGBM-02 circuitry has Nintendo-specific memory, LCD, cartridge and link interfaces. Existing active parts have not been requalified for the S4 voltage domains. | Follow the function-by-function disposition in CONNECTION-REVIEW.md; qualify new interfaces rather than reconnecting the old net names to a different CPU. |
| S4-08 | CPU package qualification and incomplete console circuitry block full placement and fanout. No S4 copper, power/ground planes, short-circuit DRC, route-completeness check, firmware benchmark or hardware test exists. | After sourcing/electrical qualification: routing-disabled placement and courtyard review, fanout and full routing, final electrical/manufacturing checks, then a tested populated prototype. |

## Scope of the current checks

The XML audit finds no duplicate physical pin assignments or mismatch in the specified reference CPU supply-pin sets. This does **not** prove the reference is electrically correct or that there are no copper shorts. A netlist export can contain internally consistent but incorrect wiring.

All 19 candidate imports pass pad-count, courtyard-containment and conservative pad-overlap checks. The customized CPU now requires all 20 supply inputs, both LDO outputs and both ground pins to be connected, while forbidding NC106 connections. The connected stage satisfies these requirements; the isolated CPU fixture deliberately fails with 22 missing-connection errors to exercise the checks. Exact S4 voltage tolerances are not invented.

## Known changes from the original Enhance project

The new processor and Linux emulator replace the Nintendo execution architecture. Its original SRAM/clock/power wiring cannot be carried over. HDMI, USB controllers and emulator storage require new circuits and firmware. Original cartridge/link and original LCD compatibility are unimplemented, not silently treated as working. Board enlargement means original shell compatibility is not promised. None of these limitations is represented as DNP.

## Connected stage limitations

`POWER-CORE-REVIEW.md` documents the 58-component stage and its RESET pull-up change to 1.8 V. The generator lists 26 remaining reference components, including input protection, boot storage/recovery, straps and the unresolved ADC divider. These are unfinished work, not DNP omissions. HDMI/audio, controller ports and firmware are additional unfinished console functions. Reset hold time, brownout response, startup sequencing, effective decoupling and S4 package qualification still block manufacturing.
