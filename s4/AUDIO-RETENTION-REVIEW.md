# Retaining Enhance audio around the S4

**Historical handheld revision (`ad6b230`):** superseded by the user-authorized tabletop console. The 33-part analog audio section is no longer active. See [current console review](CONSOLE-REVIEW.md). All counts and checks below describe that historical revision.

The current working design has **145 components**. It adds 33 audio components to the previously published 112-component S4 stage. Twenty original Enhance designators have explicit counterparts. **This working revision has unresolved tool diagnostics and is not published or ready to route.** Registry v1.0.3 remains the earlier stage.

## What is retained

The TI LM4853MM/NOPB amplifier, Alps RK10J12R0A0B volume wheel, Same Sky SJ-3524-SMT-TR headphone connector, speaker connector, stereo input/output coupling, feedback, headphone detection and speaker coupling follow the original functions. Existing genuine JLCPCB imports are copied byte-for-byte, including courtyards and mounting lands. The already-selected TI TPS74525PQWDRVRQ1 supplies the original nominal 2.5 V audio rail from SYS_3V3. No original Nintendo signal or 5 V enable is directly connected to an S4 GPIO.

`audio.json` records every new designator, original designator, MPN and supplier number. `reports/enhance-retention.csv` accounts for **all 240 original components**. Its pending rows remain required review work, not authorization to remove functions or designate parts DNP.

## Required connection changes

1. **Audio source:** S4 HPOUTL99/HPOUTR98 feed new 1 µF coupling capacitors before the potentiometer. Its native DAC replaces the Nintendo PWM buffers, reconstruction filters and associated bias network. Manufacturer family documentation identifies the outputs and the pseudo-differential HPOUTFB100 input. The [100ask development-board schematic, page 1](https://dl.100ask.net/Hardware/MPU/T113s3-Industrial/T113-S3_Industrial-DevKit_V11.pdf) provides the 100 nF feedback-to-ground coupling and 100 nF/22 Ω series shunts on each headphone output. These were checked visually. Exact S4 output levels, drive stability, codec setup and ground-return layout still need qualification.
2. **Volume wheel:** The [Alps drawing 4](https://tech.alpsalpine.com/cms.media/product_catalog_rv_03_rk10j_en_780020d1ea.pdf), viewed from the mounting side, identifies a common end and two independent wipers. In the imported pad numbering, common=1, channel A endpoint/wiper=3/2, channel B endpoint/wiper=5/4. The earlier adaptation fed the wipers and took output from the endpoints. The S4 version feeds endpoints and takes output from wipers. Added coupling avoids applying the codec's DC bias to this AC-use volume part. The raw imported symbol and geometry remain unchanged. Channel tracking, knob direction and continuity still need a physical sample check.
3. **Headphone detection:** [TI LM4853, HP-IN Function](https://www.ti.com/lit/ds/symlink/lm4853.pdf) requires detecting insertion from its ROUT output. The retained jack switches the tip, normally used for left audio. Therefore S4 left audio intentionally uses the amplifier's internally named right channel and then the jack tip; S4 right audio uses its left channel and the ring. Stereo heard by the user stays correct. The jack's normal contact is conditional and must not be represented as a permanent short between pads 2/4. The [Same Sky drawing, page 2](https://www.sameskydevices.com/product/resource/sj-352x-smt.pdf) was inspected from the previously downloaded manufacturer file.
4. **Shutdown:** An imported MMBT3904LT1G NPN, 1 kΩ base resistor and 100 kΩ base-emitter pull-down replace the VDD5-driven MOSFET. S4 PG0/pin120 requests audio enable; the 100 kΩ pull-up to AUDIO_2V5 disables the amplifier until firmware drives the transistor. The 2.5 V shutdown node is separate from the 3.3 V GPIO. Firmware must initialize and settle the codec before enabling playback.
5. **Supply/returns:** The [TI TPS745-Q1](https://www.ti.com/lit/ds/symlink/tps745-q1.pdf) fixed 2.5 V part uses IN6, OUT1, EN4, GND3/EP7 and grounded NC2; unused PG5 stays unconnected. Input bypass is 1 µF, output/bulk bypass 10 µF and local amplifier bypass 100 nF. The prior external enable sequence changes to SYS_3V3, while firmware controls amplifier shutdown. GND is the common electrical net; separate analog return placement and decoupling are still required. This does not connect audio load to the CPU's internal 1.8 V supply.

## Retained limits that require testing

- The retained 100 kΩ input/20 kΩ feedback pair has nominal single-ended gain 0.2. This may be too quiet with S4 output levels. Gain and clipping must be measured before claiming the volume range is satisfactory. It was not silently increased.
- The retained 100 µF headphone capacitors give about 51 Hz corner frequency for 32 Ω headphones with the 1 kΩ bleeds. The speaker's 100 µF series capacitor gives about 199 Hz at 8 Ω. Actual MLCC capacitance under DC bias may be lower. These are calculations, not measured frequency response.
- Speaker wires remain floating between the amplifier outputs, with the reference's series capacitor. Neither wire is grounded. Headphone insertion must disable bridge operation without oscillation, pops or DC across the speaker.
- The 2.5 V regulator's lower specified tolerance is 2.4625 V, above the amplifier's 2.4 V minimum in steady state. This does not qualify startup, dropout, transient margin, current or thermal budgets. No amplifier output-power claim is made.

## Tool blockers

The imported volume wheel has two SMT mounting lands numbered pin6 and two separated plated mounting slots numbered pin7. They are genuine supplier geometry and remain unconnected. The installed core emits two `source_ambiguous_port_reference` records because it expects each port's multiple pads to overlap. The record type does not end in `_error`; the audit and publication gate now also check `error_type`, so these findings cannot be missed by a suffix-only check.

The raw dual-gang volume import uses a chip primitive, so the tool also emits `source_no_power_pin_defined_warning`. Giving a passive pot a fake power connection would be incorrect. The existing potentiometer primitive describes two/three-pin parts, so this five-electrical-terminal dual-gang part needs proper passive component support. No single-gang substitute, mounting-pad deletion, fake supply or diagnostic suppression is used to bypass these issues.

The correct next tooling work is support for passive multi-gang components and unconnected, repeated mechanical-terminal pads. Placement and electrical path checks can still be performed, but the complete acceptance audit deliberately fails until the tool represents this component correctly.

## Reproduce

The final placement review covers 145 populated parts and 145 courtyards, with a minimum courtyard gap of 0.1044 mm. The independent comparison checks 75 net groups and 401 connected endpoints, including the reviewed audio paths and 69 allocated processor signals. TypeScript and CLI placement checks pass. The seven sheets and PCB preview render; these visual checks do not qualify analog performance or power integrity. Two ambiguous-port errors and one passive-component warning remain in the compiled circuit and cause both acceptance audits to fail.

Routing remains disabled: there are no traces or vias and no copper-short DRC result. The registry publisher retains its 112-component release gate; packaging/reproduction inputs must be reviewed for a future audio release after the tool blockers are fixed. Do not publish this draft by loosening that gate.

The routing-difficulty and DXIN distance reports were refreshed for this 145-component draft. DXIN still totals 10.46 mm across three estimated branches. These are pre-routing estimates, not routed timing or success guarantees; the older baseline review retains its dated observations.

```sh
python3 scripts/prepare-s4-audio.py
bun run generate:s4:core
bun run typecheck
bun run audit:s4:imports
bun run check:s4:netlist
bun run check:s4:placement
bun run build:s4:core
python3 scripts/audit-s4-audio.py
bun run audit:s4:core
python3 scripts/audit-s4-retention.py
bun run preview:s4:sheets
```

The audio/core acceptance audits currently return nonzero for the unsuppressed volume-control findings. A zero CLI build exit status must not be reported as a clean DRC.
