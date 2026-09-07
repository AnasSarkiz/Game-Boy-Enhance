import { PowerCoreComponents, PowerCoreNets } from "./generated/power-core"

export default function S4PowerCoreStage() {
  return (
    <board
      title="S4 HDMI console / indicators / USB host — placement draft"
      width={130}
      height={110}
      layers={4}
      schLayout={{ layoutMode: "relative" }}
      routingDisabled
      minViaPadDiameter={0.45}
      minViaHoleDiameter={0.3}
    >
      <PowerCoreComponents />
      <PowerCoreNets />
    </board>
  )
}
