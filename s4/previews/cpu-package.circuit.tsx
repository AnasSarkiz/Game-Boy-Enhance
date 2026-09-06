import { T113M4020DC0 } from "../components/T113M4020DC0"

// Isolated package inspection, not the console schematic or a powered CPU board.
export default function CpuPackageInspection() {
  return (
    <board
      title="S4 package inspection only — not for fabrication"
      width={30}
      height={30}
      layers={4}
      routingDisabled
      minViaPadDiameter={0.45}
      minViaHoleDiameter={0.3}
    >
      <schematicsheet
        name="cpu_package"
        displayName="CPU PACKAGE INSPECTION"
        sheetWidth={550}
        sheetHeight={500}
      >
        <schematicsection
          name="processor"
          displayName="S4 — SUPPLIER PACKAGE / PIN MAP CHECK ONLY"
        />
        <T113M4020DC0
          name="U3"
          pcbX={0}
          pcbY={0}
          schX={0}
          schY={0}
          schWidth={12}
          schHeight={38}
          schSectionName="processor"
          connections={{ pin91: "net.GND", pin129: "net.GND" }}
        />
      </schematicsheet>
      <net name="GND" isGroundNet />
    </board>
  )
}
