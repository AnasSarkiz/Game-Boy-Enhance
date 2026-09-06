# Required functions and population

**Superseded architecture decision, 2026-09-06:** the user explicitly selected a T113-S4 emulator-console redesign. See [S4 requirements](../s4/README.md) and [S4 connection review](../s4/CONNECTION-REVIEW.md). The controls and population observations below describe the older AGBM-02 circuit; they do not establish S4 compatibility. Its Nintendo CPU decision is historical.

Updated 2026-09-05. TI is preferred when an electrically suitable JLCPCB-imported part is available. Manufacturer preference does not establish compatibility. No required component or function may be treated as DNP to resolve a sourcing, routing, or qualification problem. Custom component footprints remain prohibited.

The current target remains the reference's buttons and LCD interface. Analog sticks and an OLED have not been selected or added. A different control or screen type requires its own electrical, mechanical, and software assessment.

## Current controls and display

The compiled placement contains all 245 expected component records and no DNP attributes. The following imported components have supplier footprints and courtyards. This is a population audit, not evidence of a working assembled console.

| Required function | Current imported part | JLCPCB | Remaining work |
|---|---|---|---|
| A, B, Start, Select, four directions | Eight Alps SKRRABE010 switches | C125046 | Underside copper keepouts, actuation fit and hardware input tests |
| L and R shoulder buttons | Two TE 1825027-5 switches | C86476 | Land/hole fit and actuation clearance |
| Power switch | CSS-1210TB | C2921710 | Verify the documented two-position adaptation and physical access |
| Stereo volume | Alps RK10J12R0A0B | C351175 | Verify gang continuity and wheel access |
| LCD connection | Amphenol 62684-402100ALF, 40-pin FFC | C2931360 | Select and qualify the actual display and cable, contact side, electrical limits and configuration passives |

The LCD connector does not substitute for a display assembly. No screen is marked DNP; the screen selection is incomplete. Reference pins that a datasheet requires to remain unconnected are NC pins, not omitted components.

## CPU decision

The [upstream design](https://github.com/MouseBiteLabs/Game-Boy-Enhance) requires the original Nintendo AGB CPU. No verified JLCPCB listing or compatible TI replacement has been established. Retaining that CPU preserves the reference architecture, but its procurement and footprint remain blocked by the JLCPCB-only import requirement. No sourcing exception is approved.

A processor such as [TI AM625](https://www.ti.com/product/AM625) has a different memory, power and display architecture. Using it would require a new board and emulator/software implementation; it is not a replacement for U1 in this schematic. Its JLCPCB import, routing feasibility under the specified via rules, and Game Boy compatibility have not been qualified. It is a research candidate only, not an approved BOM selection.

## Completion blockers remain explicit

- U1, P1 and P4 lack resolved PCB footprints. They are required components, not DNP options.
- The selected SRAM does not implement the donor BYTE option. JP3 is physically present but currently has no effect on SRAM mode. Populating this header does not restore that function; this remains a functional deviation to resolve or explicitly accept.
- Power sequencing, SRAM access timing, oscillator startup, display compatibility, audio performance and the full load budget remain unqualified. See [DATASHEET-AUDIT.md](DATASHEET-AUDIT.md).
- Routing remains disabled. Final acceptance requires completed placement, routing and copper DRC, followed by a populated prototype demonstrating startup, stable rails, memory operation, all controls, display, audio, cartridge and link functions. No present software check establishes that the board will work.

The next engineering step is to resolve the CPU procurement/architecture conflict and qualify an actual display assembly. Meanwhile, existing connection, placement and datasheet findings remain valid work in progress. No emulator redesign or removal of an interface is inferred from the TI preference.
