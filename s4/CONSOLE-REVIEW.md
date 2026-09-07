# Tabletop console and indicators — 2026-09-07

The user approved changing the product from a handheld to an HDMI console with USB controllers. The active design now has **103 populated components, 54 nets and seven schematic sheets** on a **130 × 110 mm, four-layer** placement board. Routing stays disabled; minimum via copper/hole remains 0.45/0.30 mm. This is a connected console core, not a working or fabrication-ready console. HDMI and complete firmware are still required.

## Scope change

The 33-part analog audio section and 30-part onboard game-input section are removed from the active circuit. Sound/volume move to the TV, and game controls move to USB controllers. The volume-wheel import limitation remains an upstream issue, but no longer affects this product's active circuit. These are user-authorized product changes, not DNP entries or hidden DRC workarounds. The older audio files/reports describe commit `ad6b230`; they are not current acceptance results.

The S4 CPU, in-package RAM, TI regulators, clocks, storage, reset and USB-C recovery remain. The original Nintendo CPU/SRAM, cartridge/link compatibility, handheld LCD, speaker/headphones, battery operation and original shell are outside the new console scope. The default root entrypoint now selects the console; `agbm-02.circuit.tsx` preserves the historical Nintendo adaptation.

## Indicators

| Label / part | Color | Actual meaning | Connection |
|---|---|---|---|
| POWER / D1 | Yellow-green | SYS_3V3 is present; does not prove the core rail or boot is healthy | SYS_3V3 → anode1; cathode2 → R4 1 kΩ → GND |
| RUN / LED2 | Yellow-green | Linux heartbeat once the GPIO LED driver starts; not application/game health | PE0 / physical44 → 10 kΩ → Q2 base; 100 kΩ base pull-down; 1 kΩ LED series resistor |
| ERROR / LED3 | Red | Software-requested fault or kernel panic when integrated; cannot detect every failure | PE1 / physical45 → 10 kΩ → Q3 base; 100 kΩ base pull-down; 1 kΩ LED series resistor |
| USB FAULT / LED4 | Red | TPS2051B asserts its active-low fault output during overload/thermal protection; independent of firmware | LED cathode through 1 kΩ to OC3; OC has 10 kΩ pull-up to 3.3 V and goes to PG9 / physical4 |

RUN and ERROR use imported onsemi MMBT3904LT1G NPNs. [The manufacturer pinout](https://www.onsemi.com/download/data-sheet/pdf/mmbt3904lt1-d.pdf) is B1/E2/C3. The external base pull-downs keep the indicators off while the GPIOs are undriven. Firmware can still light them during boot if it drives the pins; this circuit does not override software. The GPIO sources approximately 0.26 mA at a nominal 0.7 V base drop. The collectors carry LED current rather than loading the processor pins directly.

Each LED has its own 1 kΩ, 1% series resistor. At a nominal 2 V forward drop, power LED current is about 1.3 mA; transistor voltage drop reduces RUN/ERROR current slightly. Even the conservative zero-forward-drop bound at 3.6 V is 3.64 mA with a 990 Ω resistor, below the LEDs' 25 mA rating. Brightness at this low current needs prototype evaluation. ERROR being dark is not proof that a stalled or unpowered processor is healthy.

### Datasheet corrections without footprint changes

[Everlight DSE-0025740, page 5](https://www.everlighteurope.com/custom/files/datasheets/DSE-0025740.pdf) specifies the green LED's physical **1=anode, 2=cathode**. The C2986011 raw import reverses the symbol labels (`C` on pin1, `A` on pin2), while its pad positions and polarity artwork match the manufacturer numbering. `GreenIndicator` preserves every supplier pad/courtyard and supplies the correct LED primitive, polarity and attributes. The original source import is unchanged. The old D1 used the opposite terminal convention, so its reference mapping is explicitly reversed. Its former 5.1 kΩ R4 becomes an imported 1 kΩ part.

[Everlight DSE-0014128, page 6](https://datasheet.octopart.com/19-217-R6C-AL1M2VY-6T-Everlight-datasheet-192340706.pdf) confirms red LED C2986060 also uses 1=anode, 2=cathode. Both package diagrams were rendered and visually checked. The raw red import already uses the correct LED representation. Supplier LED pads are larger than the suggested manufacturer lands; stencil/assembly fit remains a qualification item. No custom footprint is drawn.

## Controller port

One native USB2 Type-A port J4 is connected to USB1. Further controllers require a compatible external hub or a future onboard hub design; two USB devices must never be connected in parallel to one data pair. USB-C J1 remains the power/recovery/device connection.

[TI TPS2051BDBVR, table 5-1](https://www.ti.com/lit/ds/symlink/tps2051b.pdf) uses OUT1, GND2, OC3, EN4, IN5 and an active-high enable. U9 is supplied from INPUT_5V after the existing input PTC. PG10 / physical5 enables it, with R55 100 kΩ holding it off by default. Its nominal load rating is 500 mA; its current-limit threshold is approximately 1 A, not a precision 500 mA clamp. Input, output, enable, fault, 3.3 V and ground are independently checked as separate nets. No processor GPIO is connected to 5 V.

The imported switch primitive is changed to an electrical chip representation because this semiconductor has five independent pins. Supplier geometry is unchanged. The USB fault LED plus pull-up loads OC by approximately 1.6 mA nominal; TI specifies its low-level output at 5 mA. Its deglitching means brief transients need not appear on the LED.

ST USBLC6-2SC6 U10 provides ESD paths 1–6 for DM and 3–4 for DP, GND2 and VBUS5, following the [ST datasheet](https://www.st.com/resource/en/datasheet/usblc6-2.pdf). J4 uses standard USB2 contacts 1=VBUS, 2=DM, 3=DP, 4=GND; imported shell terminals5/6 join ground. Supplier catalog and import agree. **The connector manufacturer's linked PDF could not be retrieved (403/HTML response), so its detailed mechanical/pin drawing still requires review.** Its catalog specifies wave soldering: assembly process must accommodate its through-hole contacts.

C70/C71 provide 100 nF/10 µF input bypass; C73 provides 100 nF output bypass. C72 is Panasonic EEEFT1A221AP/C401764, a **polarized 220 µF, 10 V, ±20%** reservoir. Its positive imported pad1 connects to host VBUS and negative2 to ground. The [Panasonic FT specification](https://industrial.panasonic.com/cdbs/www-data/pdf/RDE0000/ABA0000C1240.pdf) gives at least 176 µF initial capacitance at the specified measurement condition. The import's 3.50 × 1.20 mm pads differ from Panasonic's suggested 3.20 × 1.60 mm lands; fit/stencil qualification remains open. This capacitor is represented as polarized, not an interchangeable two-terminal capacitor.

The host circuit does not solve the main input-power budget. The existing USB-C Rd and 1 A PTC do not establish the available source current, controlled inrush, or sufficient current for the processor, HDMI and USB load. Do not enable the host on hardware before qualifying source-current management and startup. Routing must also shorten the protection return and power-switch loops and meet USB differential impedance.

## Firmware integration

`firmware/console-leds.dtsi` provides a GPIO LED fragment using the [Linux binding](https://raw.githubusercontent.com/torvalds/linux/master/Documentation/devicetree/bindings/leds/leds-gpio.yaml). PE bank index4, pins0/1, use active-high drive. RUN requests the heartbeat trigger; ERROR starts off and has `panic-indicator`. The actual kernel needs GPIO LED, heartbeat and panic-trigger support. An application/service must explicitly report application errors to ERROR; no such service or complete boot image is claimed here.

This fragment must be integrated with the real S4 board device tree and pin configuration. It has not been compiled into a DTB or tested on hardware; `dtc` is unavailable locally. The host also needs USB1 PHY/host and VBUS regulator integration plus fault handling. GPIO assignments are checked against the S3-family pin tables; exact S4 qualification remains open.

## Checks and limits

- TypeScript, CLI netlist and placement, build, geometry audit and independent console/core connection audits pass without emitted errors/warnings.
- All 103 placed parts have courtyards; minimum courtyard separation is 0.1044 mm. All 41 available supplier imports pass the geometric checks.
- The independent comparison checks 54 net groups, 304 connected endpoints and 57 allocated processor signals. The console audit separately checks polarity, limiting resistors, transistor pulls, switched power separation and USB data paths.
- Seven schematic sheets are rendered. PCB, indicators and USB host views are reviewed; this is not signal-integrity, timing or thermal validation.
- The pre-route congestion estimate peaks at 5.9% near C19; this is a solver heuristic, not a routing success rate. DXIN has 10.46 mm total estimated straight-line branches, not a measured copper length.
- No routed traces/vias or copper-short DRC exists. HDMI, input-current management, debug access, reset/brownout qualification, exact S4 documentation and a tested emulator image still block manufacturing.

The registry stays at v1.0.3 until its package boundary and publication gate are updated and the revised draft is explicitly packaged. The GitHub working design is newer.
