# USB, storage, recovery and game-input review — 2026-09-07

**Historical v1.0.3 baseline:** the counts and measurements below describe the published 112-component stage. The current 145-component draft adds analog audio and has unresolved tool diagnostics; see [audio review](AUDIO-RETENTION-REVIEW.md) and the current machine-readable audit.

The connected stage contains **112 components, 50 nets and 313 connected endpoints**. The library contains 25 genuine supplier imports, including the currently unwired HDMI candidate. No imported footprint was redrawn. There are six schematic sheets/sections and ten populated game switches. This review checks selected connections; it does not establish a working console or authorize fabrication.

## USB-C power and recovery

J1 is Hanxia HX-TYPE-C-16P-L8.35, C41427493. Its [manufacturer drawing](https://datasheet.lcsc.com/datasheet/pdf/efa6a1897252d50751d6c1739fcd6844.pdf?productCode=C41427493) was inspected for the solder tails, shell stakes and locating holes. The reference's alphabetic contacts map to the supplier's physical numbering:

| Reference contacts | Imported pads | Connection |
|---|---|---|
| A1/B12; A12/B1 | 5; 7 | GND |
| A4/B9; A9/B4 | 6; 8 | USB_C_VBUS_5V |
| A5; B5 | 15; 9 | Separate 5.1 kΩ Rd resistors to GND |
| A6/B6 | 13/11 | USB0_DP, CPU115 |
| A7/B7 | 12/14 | USB0_DM, CPU114 |
| Shield | 1–4 | GND |
| SBU | 10/16 | Deliberately unconnected for USB2-only use |

The two locating holes remain nonplated. All four shield slots remain plated. Courtyard checks now cover both kinds of holes as well as SMT pads.

U4 is ST USBLC6-2SC6, C2827654. The [ST datasheet](https://www.st.com/resource/en/datasheet/usblc6-2.pdf) confirms continuous internal paths 1–6 and 3–4, GND2 and VBUS5. The wrapper represents those internal connections; the audit independently joins the two reference net segments for each USB data conductor. These are continuous USB nets, not signals routed through an active buffer. Short protection return paths and USB differential routing remain required.

F1 is the reference JK-nSMD100-16, C369161, a 1 A hold/16 V resettable fuse. It connects USB_C_VBUS_5V to INPUT_5V. It is not a USB current-negotiation or inrush-control circuit. The source-current budget, CC current detection, controlled startup, voltage drop and protection coordination remain unresolved. The Rd resistors alone do not establish permission to draw the full console load. USB0 is the recovery/device interface; a separately powered USB1 host port is still required for controllers.

## Storage and FEL recovery

U5 is **Zetta ZDSD04GLGEAG / C2875854: 4 Gbit, or 512 MByte**. The reference's displayed ZDSD08 name and unrelated XTX link are superseded by the [Zetta family datasheet](https://datasheet.lcsc.com/datasheet/pdf/cda7e97f747983cf44624654eba01fb9.pdf?productCode=C2875853), which includes the 04G ordering code. Its top-view mapping is:

| Storage pad | Signal | Connection |
|---|---|---|
| 1 | DAT2 | SDC0 data2 / PF4 |
| 2 | DAT3 | SDC0 data3 / PF5 |
| 3 | CLK | U6 output through R23, 22 Ω |
| 4 | GND | GND |
| 5 | CMD | SDC0 command / PF3 |
| 6 | DAT0 | SDC0 data0 / PF1 |
| 7 | DAT1 | SDC0 data1 / PF0 |
| 8 | VDD | SYS_3V3 |

The 2.7–3.6 V supply range covers nominal SYS_3V3. The retained 51 kΩ CMD/data pulls fall within the specified 10–100 kΩ range. The device supports up to 50 MHz, but that does not qualify this board at 50 MHz: host timing, gate delay, capacitance and routing must also pass. Power-up initialization and Linux/U-Boot operation have not been tested.

The manufacturer package drawing uses 1.25 mm pad pitch; the supplier import uses 1.27 mm. The imported lands are wider than the device terminals, but assembly/stencil qualification is still required. Its stated maximum power-line capacitance also needs interpretation against the reference's external 10 µF C41. Neither issue was hidden by altering the supplier geometry or silently changing the reference capacitor.

U6 is TI SN74AHC1G08DCKR / C122838. The [TI datasheet](https://www.ti.com/lit/ds/symlink/sn74ahc1g08.pdf) confirms A1, B2, GND3, Y4 and VCC5, with operation from 2–5.5 V. PF2 drives A; R22 pulls B to SYS_3V3, C44 filters B to GND, and SW2 grounds B when pressed. Y drives the storage clock through R23. Suppressing the storage clock is intended to support reference FEL recovery; actual boot-ROM fallback and recovery still need an S4 hardware test.

## Game inputs and shared pin allocation

`controls.json` defines directions, A/B, Start/Select and L/R. Each uses an imported TSA010A2026B switch, a 5.1 kΩ SYS_3V3 pull-up and a 100 nF shunt capacitor. A closed switch grounds the input. Nominal RC time is 0.51 ms; firmware debounce remains necessary. All ten pressed pull-ups draw approximately 6.5 mA in total.

The [Allwinner family pin tables](https://dl.linux-sunxi.org/T113-S3/T113-S3_Datasheet_v1.6_20220303.pdf) supply the physical GPIO mappings. `pin-allocation.json` reserves display, audio, debug, HDMI control and USB-host signals without connecting unfinished peripherals. All 65 allocations are unique and checked against compiled CPU pin labels. Board-ID2 moves U3.53 → U3.39 (PE8); board-ID3 moves U3.52 → U3.38 (PE9). Software must reflect both changes. Original S4 qualification remains open; an S3-family pin table is not a substitute for S4 operating limits or testing.

## Placement and tool checks

The 110 × 110 mm board stays at four layers, routing disabled, with minimum via diameter/hole of 0.45/0.30 mm. Controls sit around the perimeter; USB-C is on the bottom edge and storage is beside the CPU. Imported courtyards cover all 112 placed components with at least 0.10 mm separation. This spacing check does not qualify power loops or signal integrity.

The build emits no errors or warnings for this stage. The independent audit checks every expected connected endpoint, exact procurement identity, required supplies, forbidden NC pins, internal USB paths, game inputs, pin allocation and courtyards. No copper routing or short-circuit DRC has been performed.

Manual sheet positions require explicit board `schLayout={{ layoutMode: "relative" }}`: the installed core otherwise selects packing because it does not see coordinates nested inside sheets. The schematic renderer centers page borders at the origin even when a sheet has a different recorded center. The generator now keeps content within those borders. `bun run preview:s4:sheets` renders each sheet separately; all six were visually reviewed. No diagnostics were suppressed.

## Remaining console work

HDMI video/audio and its independent supplies/protection, powered USB1 controller access, UART debug access, ADC measurement, full input-power/current management, reset/brownout qualification and firmware remain incomplete. Fanout, routing, impedance checks and a populated prototype follow electrical and placement qualification. None of these functions is marked DNP or claimed to work.
