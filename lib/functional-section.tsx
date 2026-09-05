import { Fragment } from "react"
import type { ChipProps } from "@tscircuit/props"
import { boardPoint, copperLayer, getFootprint, getNoConnectPins, isSchematicOnlyPin, netName, connectedNets, reference, type ReferenceComponent } from "./reference"
import { getCatalogElement, SourcedChip } from "./parts"
import { buttonDefinitions, mappedEndpoints, mappedPorts } from "./pin-mapping"
import { componentPlacement } from "./placement"
import { SKRRABE010 } from "../imports/SKRRABE010"

export const sections = [
  { name: "power", title: "AA POWER / SEQUENCING / BATTERY STATUS", sheet: "/" },
  { name: "processor", title: "PROCESSOR / SRAM / CARTRIDGE BUS", sheet: "/CPU/" },
  { name: "controls", title: "CLOCK / RESET / BUTTONS / LINK / HOTKEYS", sheet: "/CPU/" },
  { name: "display", title: "DISPLAY / 40-PIN FFC / SCREEN OPTIONS", sheet: "/CPU/Display/" },
  { name: "audio", title: "STEREO FILTERS / HEADPHONE / SPEAKER", sheet: "/CPU/Audio/" },
]
const processorReferences = ["U1", "U2", "P1"]
const compositeButtons = ["SW4", "SW5", "SW6"]
// Only these catalog pins may be added without a reference schematic endpoint.
const additionalPins: Record<string, Record<string, string>> = {
  U2: { pin28: "NC" }, SW2: { pin3: "SUPPORT_1", pin4: "SUPPORT_2" },
  SW3: { pin3: "SUPPORT_1", pin4: "SUPPORT_2" }, VR2: { pin6: "MOUNT_SMT", pin7: "MOUNT_THT" },
}

function ComponentElement({ component, index, sectionName }: { component: ReferenceComponent; index: number; sectionName: string }) {
  const footprint = getFootprint(component.reference)
  const center = componentPlacement(component.reference)
  const catalogElement = getCatalogElement(component.reference)
  const pinLabels = Object.fromEntries(component.pins.flatMap((pin) => mappedPorts(component.reference, pin.num).map((mappedPort) => [mappedPort, `${netName(pin.name || "PIN")}_${pin.num}`])))
  const noConnect = getNoConnectPins(component.reference).flatMap((port) => mappedPorts(component.reference, port.slice(3)))
  for (const port of Object.keys(catalogElement?.props.pinLabels ?? {})) {
    if (!(port in pinLabels)) {
      const label = additionalPins[component.reference]?.[port]
      if (!label) throw new Error(`Unreviewed extra supplier pin ${component.reference}.${port}`)
      pinLabels[port] = label
      noConnect.push(port)
    }
  }
  const pinAttributes = Object.fromEntries(Object.keys(pinLabels).map((pin) => [
    pin, noConnect.includes(pin) ? { doNotConnect: true } : { mustBeConnected: true },
  ]))
  const props: ChipProps = {
    name: component.reference, pcbX: center.x, pcbY: center.y, layer: copperLayer(footprint.layer),
    schSectionName: sectionName, pcbRotation: center.rotation,
    schX: (index % 7) * 5 - 15, schY: 10 - Math.floor(index / 7) * 2.2,
    pinLabels, noConnect, pinAttributes,
    manufacturerPartNumber: component.value,
    schWidth: component.pins.length > 30 ? 5 : 2, schHeight: Math.max(0.8, component.pins.length * 0.12),
  }
  if (sectionName === "processor") {
    props.schX = { U1: -14, U2: 0, P1: 14 }[component.reference]
    props.schY = 0
  }
  return <SourcedChip referenceDesignator={component.reference} props={props} />
}

function TactileButtons() {
  return <>{buttonDefinitions.map((button, index) => {
    const footprint = getFootprint(button.original)
    // Use only the four rectangular tactile lands, excluding membrane artwork.
    const lands = footprint.pads.filter((pad) => pad.shape === 4 && [button.signal, button.ground].includes(pad.number))
    if (lands.length !== 4) throw new Error(`Expected four reference tactile lands for ${button.name}`)
    const center = boardPoint({ x: lands.reduce((sum, pad) => sum + pad.center.x, 0) / 4,
      y: lands.reduce((sum, pad) => sum + pad.center.y, 0) / 4 })
    return <Fragment key={button.name}>
      <SKRRABE010 name={button.name} pcbX={center.x} pcbY={center.y} layer="top"
        schX={-15 + (index % 4) * 9} schY={-20 - Math.floor(index / 4) * 3}
        schSectionName="controls" internallyConnectedPins={[["pin1", "pin3"], ["pin2", "pin4"]]} />
      <silkscreentext text={button.label} pcbX={center.x} pcbY={center.y - 5} fontSize={1} />
    </Fragment>
  })}</>
}

export function FunctionalSection({ section }: { section: (typeof sections)[number] }) {
  const components = reference.components.filter((component) => component.sheet === section.sheet && !compositeButtons.includes(component.reference))
    .filter((component) => section.name === "processor" ? processorReferences.includes(component.reference) : section.name === "controls" ? !processorReferences.includes(component.reference) : true)
  return <schematicsheet name={section.name} displayName={section.title} sheetIndex={sections.indexOf(section)} sheetSize="ANSI_B" sheetWidth={550} sheetHeight={500}>
    <group name={section.name}>
      <schematicsection name={section.name} displayName={section.title} sectionTitleFontSize={0.35} />
      {components.map((component, index) => <ComponentElement key={component.reference} component={component} index={index} sectionName={section.name} />)}
      {section.name === "controls" && <TactileButtons />}
    </group>
  </schematicsheet>
}

export function BoardNets() {
  return <>{connectedNets.map((net) => {
    const endpoints = net.nodes.filter((node) => !isSchematicOnlyPin(node.ref, node.pin)).flatMap((node) => mappedEndpoints(node.ref, node.pin))
    const selectors = [...new Set(endpoints.map((endpoint) => `.${endpoint.reference} > .${endpoint.port}`))]
    return <Fragment key={net.name}>
      <net name={netName(net.name)} isGroundNet={net.name === "GND" || net.name === "AGND"}
        isPowerNet={["VCC", "VOUT3", "VOUT5", "VDD2", "VDD3", "VDD5", "VAUD"].includes(net.name)} />
      {selectors.map((selector) => <Fragment key={selector}><trace from={selector} to={`net.${netName(net.name)}`} schDisplayLabel={netName(net.name)} /></Fragment>)}
    </Fragment>
  })}</>
}
