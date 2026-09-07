# S4 retro game console in tscircuit

The active project is now a **tabletop HDMI console with USB controllers**, using **T113-S4 / T113M4020DC0**. The default `index.circuit.tsx` opens the S4 design.

The connected draft has **103 components**, a **130 × 110 mm four-layer board**, and seven schematic sheets. It includes power, CPU/clocks/reset, storage/recovery, one protected USB controller port and four labelled indicators: **POWER, RUN, ERROR, USB FAULT**. All supplier footprints and courtyards remain unchanged. The green LED's reversed imported symbol labels are corrected against its manufacturer drawing.

**Routing is disabled. HDMI circuitry, power qualification and a tested firmware image remain incomplete. Do not fabricate.** Placement and connection audits pass; no copper-short DRC or hardware validation has been performed. Registry v1.0.3 remains the earlier draft; GitHub contains the newer console conversion.

See [console design and LED behaviour](s4/CONSOLE-REVIEW.md), [blockers](s4/BLOCKERS.md), [sourcing](s4/JLCPCB-PARTS.md), [current BOM](s4/reports/power-core-bom.csv), and [reproduction commands](s4/README.md).

The user-authorized console change replaces onboard game buttons with USB controllers and speaker/headphone/volume circuitry with TV audio. These are documented scope changes, not DNP workarounds. The previous [Nintendo adaptation](README-AGBM-02.md) and [analog audio review](s4/AUDIO-RETENTION-REVIEW.md) remain historical references.

The original [MouseBiteLabs Enhance](https://github.com/MouseBiteLabs/Game-Boy-Enhance) and pinned Trellis Core references retain their license/attribution notices. See [LICENSE.md](LICENSE.md).
