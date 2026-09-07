# S4 blockers — 2026-09-07

**Do not fabricate. The connected placement board is incomplete and unrouted.** The 112-component power/CPU/USB/storage/controls stage now uses the unchanged S3 supplier package with S4 procurement metadata, as explicitly authorized on 2026-09-06. Package and electrical qualification remain required.

| ID | Finding and evidence | Required resolution |
|---|---|---|
| S4-01 | Exact S4 import C41411351 remains unavailable. Authorized reuse of C5197687 now supplies 129 unchanged pads, matching reference labels and a closed courtyard, with MPN T113M4020DC0 and ordering number C41411351 in the compiled preview. The imported ground land is 5.5999888 mm square; the S3 package drawing specifies a 5.72 mm exposed pad. | Qualify the supplier land pattern, exposed pad, orientation and assembly/stencil rules against exact S4 documentation. This is a candidate for placement, not a verified S4 package. See CPU-PACKAGE-REVIEW.md. |
| S4-02 | The reference uses an S3 datasheet and mixed S3/S4 symbol metadata. Its S4 MPN does not establish all S4 voltage, power-sequencing, pinmux and boot requirements. | Obtain authoritative T113M4020DC0/S4 electrical and package documentation. Audit every pin and its power domain before final wiring. |
| S4-03 | Upstream KiCad ERC reports 3 errors: mixed U3 unit footprints and two `TODO` values. It also reports 150 warnings, including 148 library-configuration warnings and two isolated debug labels. The author's published PCB layout is explicitly untested. | Resolve the circuit findings in the new design, restore the proper reference library context for a complete ERC comparison, and independently verify placement/routing. Never claim clean reference ERC from this result. |
| S4-04 | R8/R9 still have undefined values and an undefined measurement source. The U5 identity conflict is resolved to Zetta ZDSD04GLGEAG/C2875854, 512 MB; supplier pitch and power-line capacitance interpretation still need qualification. | Select and calculate the actual monitored rail/divider and input protection. Qualify the exact storage part, capacity, timing and boot behavior. Preserve intended functions; no TODO/DNP workarounds. |
| S4-05 | Reference pin conflicts are addressed in the 65-signal pin-allocation table: board IDs move to PE8/PE9 and UART4 is reserved on PE4/PE5. The ten PE game inputs are connected; display/audio/debug/USB1 reservations remain unwired. | Implement the remaining reserved interfaces and matching S4 firmware. Verify the complete pinmux on hardware. |
| S4-06 | No qualified HDMI subsystem exists yet. ADV7513BSWZ/C408901 imports successfully, but does not by itself establish S4 display-driver compatibility, audio operation, EDID/DDC behavior or timing. | Qualify an application schematic and Linux display/audio configuration. Add transmitter power, filtering, reset/configuration, connector protection and controlled-impedance routing. TI TFP410 is video-only and is not a full audio-over-HDMI substitute. |
| S4-07 | The old AGBM-02 circuitry has Nintendo-specific memory, LCD, cartridge and link interfaces. Existing active parts have not been requalified for the S4 voltage domains. | Follow the function-by-function disposition in CONNECTION-REVIEW.md; qualify new interfaces rather than reconnecting the old net names to a different CPU. |
| S4-08 | CPU package qualification and incomplete console circuitry block full placement and fanout. No S4 copper, power/ground planes, short-circuit DRC, route-completeness check, firmware benchmark or hardware test exists. | After sourcing/electrical qualification: routing-disabled placement and courtyard review, fanout and full routing, final electrical/manufacturing checks, then a tested populated prototype. |

## Scope of the current checks

The XML audit finds no duplicate physical pin assignments or mismatch in the specified reference CPU supply-pin sets. This does **not** prove the reference is electrically correct or that there are no copper shorts. A netlist export can contain internally consistent but incorrect wiring.

All 25 candidate imports pass pad-count, courtyard-containment and conservative pad-overlap checks. The customized CPU now requires all 20 supply inputs, both LDO outputs and both ground pins to be connected, while forbidding NC106 connections. The connected stage satisfies these requirements; the isolated CPU fixture deliberately fails with 22 missing-connection errors to exercise the checks. Exact S4 voltage tolerances are not invented.

## Known changes from the original Enhance project

The new processor and Linux emulator replace the Nintendo execution architecture. Its original SRAM/clock/power wiring cannot be carried over. HDMI, USB controllers and emulator storage require new circuits and firmware. Original cartridge/link and original LCD compatibility are unimplemented, not silently treated as working. Board enlargement means original shell compatibility is not promised. None of these limitations is represented as DNP.

## Connected stage limitations

`POWER-CORE-REVIEW.md` and `INTERFACE-REVIEW.md` document the 112-component stage: power/CPU/clocks/reset, USB-C power/recovery, boot storage and FEL clock gating, straps/IDs, and ten game inputs. Only R8/R9 remain from the reference component list; the ADC measurement function is still required. HDMI/audio, powered USB1 host access, UART debug access and firmware remain additional unfinished console functions. Reset hold time, brownout response, startup sequencing, load budgets and S4 package qualification still block manufacturing.

## New interface and tool findings

| ID | Finding | Required resolution |
|---|---|---|
| S4-09 | USB-C Rd plus the 1 A PTC does not implement source-current detection, controlled inrush or a qualified whole-console input budget. USB1 host power is absent. | Add appropriate current management and host-port protection; verify source behavior and current consumption before powering a prototype. |
| S4-10 | Zetta storage drawing pitch is 1.25 mm; imported footprint pitch is 1.27 mm. The 10 µF external C41 also needs review against the manufacturer's power-line capacitance wording. | Qualify land/stencil fit and supply capacitance. Verify clock timing, boot and recovery; do not modify genuine supplier geometry to conceal the mismatch. |
| S4-11 | Automatic schematic packing failed because positions nested inside sheets were not considered by the root layout selection. Sheet border rendering also ignores the recorded sheet center. | Addressed for this design using the supported explicit relative layout and centered content. All six pages are rendered separately and reviewed. No DRC is suppressed; automatic packing remains a tool limitation. |
