import type { ReactElement } from "react"
import type { ChipProps } from "@tscircuit/props"
import { LM4853MM_NOPB } from "../imports/LM4853MM_NOPB"
import { TPS74525PQWDRVRQ1 } from "../imports/TPS74525PQWDRVRQ1"
import { RK10J12R0A0B } from "../imports/RK10J12R0A0B"
import { SJ_3524_SMT_TR } from "../imports/SJ_3524_SMT_TR"
import { B2B_PH_K_S_LF__SN_ } from "../imports/B2B_PH_K_S_LF__SN_"
import { MMBT3904LT1G } from "../imports/MMBT3904LT1G"

type AudioProps = Pick<ChipProps, "name" | "pcbX" | "pcbY" | "pcbRotation" | "schX" | "schY" | "schSectionName">
const connected = { mustBeConnected: true }

export function AudioAmplifier(props: AudioProps) {
  const imported: ReactElement<ChipProps> = LM4853MM_NOPB(props)
  return <chip {...imported.props} pinAttributes={{
    pin1: connected, pin2: connected, pin3: connected, pin4: { ...connected, requiresGround: true },
    pin5: connected, pin6: connected, pin7: connected, pin8: connected,
    pin9: { ...connected, requiresPower: true }, pin10: connected,
  }} />
}

export function AudioSupply(props: AudioProps) {
  const imported: ReactElement<ChipProps> = TPS74525PQWDRVRQ1(props)
  return <chip {...imported.props} pinAttributes={{
    pin1: { ...connected, providesPower: true },
    pin2: { ...connected, requiresGround: true }, pin3: { ...connected, requiresGround: true },
    pin4: connected, pin5: { doNotConnect: true },
    pin6: { ...connected, requiresPower: true }, pin7: { ...connected, requiresGround: true },
  }} />
}

export function AudioVolume(props: AudioProps) {
  const imported: ReactElement<ChipProps> = RK10J12R0A0B(props)
  // Alps drawing 4: common=1; gang A endpoint/wiper=3/2; gang B=5/4.
  return <chip {...imported.props} pinAttributes={{
    pin1: { ...connected, requiresGround: true }, pin2: connected, pin3: connected,
    pin4: connected, pin5: connected, pin6: { doNotConnect: true }, pin7: { doNotConnect: true },
  }} />
}

export function HeadphoneJack(props: AudioProps) {
  const imported: ReactElement<ChipProps> = SJ_3524_SMT_TR(props)
  // Contact 4 normally touches tip 2, and opens with a plug. It is not a permanent short.
  return <connector {...imported.props} pinAttributes={{
    pin1: { ...connected, requiresGround: true }, pin2: connected, pin3: connected, pin4: connected,
  }} />
}

export function SpeakerConnector(props: AudioProps) {
  const imported: ReactElement<ChipProps> = B2B_PH_K_S_LF__SN_(props)
  return <connector {...imported.props} pinAttributes={{ pin1: connected, pin2: connected }} />
}

export function AudioEnableTransistor(props: AudioProps) {
  const imported: ReactElement<ChipProps> = MMBT3904LT1G(props)
  return <transistor {...imported.props} type="npn" pinAttributes={{
    pin1: connected, pin2: { ...connected, requiresGround: true }, pin3: connected,
  }} />
}
