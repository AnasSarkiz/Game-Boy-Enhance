import { boardHeight, boardOutline, cutoutPoints, boardWidth, reference } from "./lib/reference"
import { BoardNets, FunctionalSection, sections } from "./lib/functional-section"
import { Fragment } from "react"
import { RoutingPhases } from "./lib/routing"

export default function GameBoyEnhanceAgbm02() {
  return <board title="AGBM-02 tscircuit adaptation" width={boardWidth} height={boardHeight}
    outline={boardOutline} layers={4} thickness={1.2} doubleSidedAssembly routingDisabled
    autorouter="auto_local" minTraceWidth={0.15} minViaPadDiameter={0.45} minViaHoleDiameter={0.3}
    pcbStyle={{ viaPadDiameter: 0.7, viaHoleDiameter: 0.3 }}>
    {reference.cutouts.map((points, index) => <Fragment key={index}><cutout name={`SHELL_CUTOUT_${index + 1}`} shape="polygon" points={cutoutPoints(points)} /></Fragment>)}
    {sections.map((section) => <FunctionalSection key={section.name} section={section} />)}
    <BoardNets />
    <RoutingPhases />
    <silkscreentext text="AGBM-02 / TSCIRCUIT" pcbX={0} pcbY={18} fontSize={1} />
    <silkscreentext text="MouseBiteLabs reference / CC BY-SA 4.0" pcbX={0} pcbY={16} fontSize={0.7} />
  </board>
}
