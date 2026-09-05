import { Fragment } from "react"
import type { ChipProps } from "@tscircuit/props"
import { boardPoint, copperLayer, getFootprint, getNoConnectPins, isSchematicOnlyPin, netName, portName, physicalPadPorts, connectedNets, reference, type ReferenceComponent } from "./reference"
import { SourcedChip } from "./parts"

export const sections = [
  { name: "power", title: "AA POWER / SEQUENCING / BATTERY STATUS", sheet: "/", schX: 0, schY: 0 },
  { name: "cpu", title: "CPU / SRAM / CARTRIDGE / BUTTONS / HOTKEYS", sheet: "/CPU/", schX: 0, schY: -100 },
  { name: "display", title: "DISPLAY / 40-PIN FFC / SCREEN OPTIONS", sheet: "/CPU/Display/", schX: 160, schY: 0 },
  { name: "audio", title: "STEREO FILTERS / HEADPHONE / SPEAKER", sheet: "/CPU/Audio/", schX: 160, schY: -100 },
]

function ComponentElement({ component, index, sectionName }: { component: ReferenceComponent; index: number; sectionName: string }) {
  const footprint = getFootprint(component.reference)
  const center = boardPoint(footprint.position)
  const pinLabels = Object.fromEntries(component.pins.map((pin) => [portName(component.reference, pin.num), `${netName(pin.name || "PIN")}_${pin.num}`]))
  const noConnect = getNoConnectPins(component.reference)
  const pinAttributes = Object.fromEntries(Object.keys(pinLabels).map((pin) => [
    pin, noConnect.includes(pin) ? { doNotConnect: true } : { mustBeConnected: true },
  ]))
  const layout = {
    name: component.reference, pcbX: center.x, pcbY: center.y, layer: copperLayer(footprint.layer),
    schSectionName: sectionName,
    pcbRotation: footprint.rotation,
    schX: (index % 8) * 17, schY: -Math.floor(index / 8) * 6,
  }
  const props: ChipProps = {
    ...layout, pinLabels, noConnect, pinAttributes,
    manufacturerPartNumber: component.reference === "U7" ? "TLV9064IPWR" : component.reference === "U14" ? "MIC1557YM5-TR" : component.value,
    schWidth: component.pins.length > 40 ? 13 : 7, schHeight: Math.max(2, component.pins.length * 0.3),
  }
  if (component.pins.length > 30) {
    props.schX = -23 - (component.reference === "U2" ? 25 : 0)
    props.schY = component.reference === "P1" ? -58 : -22
  }
  return <SourcedChip referenceDesignator={component.reference} props={props} />
}

export function FunctionalSection({ section }: { section: (typeof sections)[number] }) {
  const components = reference.components.filter((component) => component.sheet === section.sheet)
  return <schematicsheet name={section.name} displayName={section.title} sheetIndex={sections.indexOf(section)} sheetSize="ANSI_B" sheetWidth={1600} sheetHeight={1100}>
    <group name={section.name}>
      <schematicsection name={section.name} displayName={section.title} />
      {components.map((component, index) => <ComponentElement key={component.reference} component={component} index={index} sectionName={section.name} />)}
    </group>
  </schematicsheet>
}

export function BoardNets() {
  return <>{connectedNets.map((net) => <Fragment key={net.name}>
    <net name={netName(net.name)} isGroundNet={net.name === "GND" || net.name === "AGND"}
      isPowerNet={["VCC", "VOUT3", "VOUT5", "VDD2", "VDD3", "VDD5", "VAUD"].includes(net.name)} />
    {net.nodes.filter((node) => !isSchematicOnlyPin(node.ref, node.pin)).flatMap((node) => {
      return <trace key={`${node.ref}_${node.pin}`} from={`.${node.ref} > .${portName(node.ref, node.pin)}`} to={`net.${netName(net.name)}`} schDisplayLabel={netName(net.name)} />
    })}
  </Fragment>)}</>
}
