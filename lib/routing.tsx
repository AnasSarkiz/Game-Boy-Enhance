import { Fragment } from "react"
import { boardPoint, getFootprint } from "./reference"

const fanoutRegions = [
  { reference: "U1", width: 23, height: 23 },
  { reference: "U2", width: 20, height: 15 },
  { reference: "P2", width: 27, height: 7 },
]

export function RoutingPhases() {
  return <>
    {fanoutRegions.map((region, phaseIndex) => {
      const center = boardPoint(getFootprint(region.reference).position)
      return <Fragment key={region.reference}>
        <autoroutingphase name={`${region.reference}_fanout`} phaseIndex={phaseIndex}
          autorouter="fanout" fanoutBoundaryPadding={0.8}
          fanoutRoutingLayers={["top", "inner1", "inner2", "bottom"]}
          minViaPadDiameter={0.45} minViaHoleDiameter={0.3} minTraceWidth={0.15}
          region={{ minX: center.x - region.width / 2, maxX: center.x + region.width / 2,
            minY: center.y - region.height / 2, maxY: center.y + region.height / 2 }} />
      </Fragment>
    })}
    <autoroutingphase name="complete_board" phaseIndex={3} autorouter="auto_local"
      minViaPadDiameter={0.45} minViaHoleDiameter={0.3} minTraceWidth={0.15} />
  </>
}
