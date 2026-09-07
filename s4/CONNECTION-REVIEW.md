# S4 connection review

A 112-component power and interface stage is implemented; this remains a qualification review, not sign-off for every console connection. All physical pin numbers below come from the pinned Trellis schematic and the linked S3 family documentation. S4-specific electrical confirmation remains required. `reports/reference-cpu-pins.csv` lists all 129 reference CPU pins without marking them datasheet-qualified.

## Power and startup

The reference uses two [TI TLV62569PDDCR converters](https://www.ti.com/lit/ds/symlink/tlv62569.pdf), whose SOT23-6 pins are EN=1, GND=2, SW=3, VIN=4, PG=5 and FB=6. The generated JLCPCB import matches these pin names and numbers. The 0.6 V feedback equation gives **3.318 V** with 453 kΩ/100 kΩ, and **0.906 V** with 51 kΩ/100 kΩ. These are nominal values; tolerance, transients and current budgets are not verified.

The reference's 3.3 V converter PG drives the core converter EN. The core PG is unconnected, while CPU RESET uses a separate RC/pushbutton. The new stage moves R11.1 from 3.3 V to LDOA 1.8 V because RESET is in the VCC-RTC domain (Allwinner table 4-2). Do not assume this guarantees reset during every brownout; qualification needs the S4 reset thresholds and timing. Switching current loops and decoupling must remain short even on a larger board.

| Reference net | CPU physical pins | Treatment |
|---|---|---|
| +0V9 | 46, 51, 81, 116, 117 | Core/system supply from its converter; confirm S4 limits and required clock/voltage configuration |
| +1V5 | 30, 48, 49 | Reference internal LDOB output to DRAM supply; do not connect an external regulator in parallel |
| +1V8 | 20, 26, 28, 50, 65, 89, 97, 107 | Reference LDOA output and consumers; current budget must be established before adding loads |
| +3V3 | 29, 34, 66, 77, 83, 128 | LDO input and I/O supply domains |
| GND | 91, exposed pad 129 | Both require real copper connections; the EP cannot be omitted |

The HDMI transmitter must not be attached to the CPU's internal 1.8 V output without a qualified load budget. Its own 1.8 V supply/filtering is an unresolved design requirement.

## Interface allocation

The [family pinmux table](https://dl.linux-sunxi.org/T113-S3/T113-S3_Datasheet_v1.6_20220303.pdf) shows PD7/PD8 (physical 62/63) serving UART4 and display functions. The new [pin allocation](pin-allocation.json) reserves PE4/PE5 for UART4 instead. Board IDs move from PD21/PD22 to PE8/PE9. The audit checks 65 unique signal allocations against physical CPU labels and verifies reserved pins remain unwired. Ten game inputs use PE GPIOs; LCD RGB24/sync, I²S1, HDMI control and USB1 remain reserved for unfinished circuitry. S4 firmware/pinmux confirmation remains required. In particular, I²S1 DOUT0 uses **PG15**, not PG14 in the family function-2 mapping.

The reference storage occupies SDC0 on PF0–PF5. It cannot simply be paralleled with another microSD device. A second storage device needs a separate supported bus, or the storage architecture must be deliberately changed. The reference uses 51 kΩ pulls, a clock gate for recovery, and a 22 Ω series clock resistor; the implemented Zetta 512 MB device pin map and pull range have been checked against its manufacturer document; clock timing and actual boot firmware remain unqualified. See [interface review](INTERFACE-REVIEW.md).

USB0 pins 114/115 are DM/DP; USB1 pins 113/112 are DM/DP in the reference. A console needs a powered host port for a controller plus a deliberate power/recovery connection, with correct VBUS direction, current limiting and protection. Do not connect 5 V VBUS to a 3.3 V GPIO. The reference USB-C Rd resistors alone do not authorize an arbitrary high-current load.

## HDMI candidate

[ADV7513 Rev B](https://www.analog.com/media/en/technical-documentation/data-sheets/ADV7513.pdf) supports digital video and audio. Its exposed pad is electrical ground. The genuine import names four negative TMDS pins generically; the manufacturer mapping is **17=TXC−, 20=TX0−, 23=TX1−, 26=TX2−**. These are connected differential outputs, not NC pins. Keep the supplier footprint unchanged and use physical pin mappings when wiring.

Supply pins 1/11/31/51, 12, 13 and 15/19/25 require 1.8 V; pin 29 requires 3.3 V. The imported metadata alone does not enforce these voltage domains. Full application support, clock/video format, I²S audio, DDC/HPD, configuration/interrupts and required unused-input termination remain open. Do not replace this function with a video-only TFP410 and claim HDMI audio.

## Existing Enhance circuitry disposition

| Function | S4 redesign requirement |
|---|---|
| Nintendo CPU and external SRAM | Replace with S4 execution and its in-package RAM; verify RAM initialization and test all 256 MB |
| Power/clock/reset | New S4 rails, 24 MHz/32.768 kHz reference clocks and qualified recovery/reset; original 4.194304 MHz CPU clock is unsuitable |
| Buttons and controllers | Retain required game inputs through qualified GPIO switches or USB controller support, including A/B, directions, Start/Select and shoulders; no DNP |
| Headphones/speaker/volume | Requalify codec output, amplifier input level, supply and volume behavior; old 2.5 V analog circuitry cannot be assumed compatible |
| Display | HDMI subsystem and compatible monitor are the current console target; original Nintendo LCD/FFC compatibility is unimplemented |
| Game/save storage | Resolve flash identity and provide usable ROM/save storage with tested boot and recovery |
| Cartridge and link | Original hardware protocols are not preserved automatically by an emulator; remain an explicit compatibility gap |
| Battery/USB power | Console power source and full load budget need specification; do not carry over the original AA converter or parallel power sources blindly |

## Verification boundary

No cross-net duplicate pins or incorrect assignments within the audited reference supply sets were found. Copper, soldering, signal integrity, complete operating limits and peripheral firmware were not tested. Required tests after implementation include disconnected/shorted-net detection, footprint pin mapping, power-domain checks, pinmux conflicts, placement/courtyards, routing completeness, USB/HDMI return paths, and an assembled-board functional test.
