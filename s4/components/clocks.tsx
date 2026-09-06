import type { ChipProps, CrystalProps } from "@tscircuit/props"
import type { ReactElement } from "react"
import { CM4024M00008001 } from "../imports/CM4024M00008001"
import { Q13FC13500004 } from "../imports/Q13FC13500004"

type ClockPlacementProps = Pick<CrystalProps,
  "name" | "pcbX" | "pcbY" | "pcbRotation" | "schX" | "schY" | "schSectionName"
>

// The importer emits these passive crystals as chips. Retain all supplier
// geometry while using the standard crystal symbols and electrical primitive.
export function MainClock(props: ClockPlacementProps) {
  const supplier: ReactElement<ChipProps> = CM4024M00008001(props)
  return <crystal {...supplier.props} symbol={undefined} pinVariant="four_pin"
    frequency="24MHz" loadCapacitance="8pF"
    pinAttributes={{
      pin1: { mustBeConnected: true }, pin3: { mustBeConnected: true },
      pin2: { requiresGround: true }, pin4: { requiresGround: true },
    }} />
}

export function RtcClock(props: ClockPlacementProps) {
  const supplier: ReactElement<ChipProps> = Q13FC13500004(props)
  return <crystal {...supplier.props} symbol={undefined} pinVariant="two_pin"
    frequency="32.768kHz" loadCapacitance="12.5pF"
    pinAttributes={{ pin1: { mustBeConnected: true }, pin2: { mustBeConnected: true } }} />
}
