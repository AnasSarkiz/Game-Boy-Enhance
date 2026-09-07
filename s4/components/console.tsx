import type { ReactElement } from "react"
import type { ChipProps, SwitchProps } from "@tscircuit/props"
import { A_19_21SYGC_S530_E2_4T } from "../imports/A_19_21SYGC_S530_E2_4T"
import { A_19_217_R6C_AL1M2VY_6T } from "../imports/A_19_217_R6C_AL1M2VY_6T"
import { MMBT3904LT1G } from "../imports/MMBT3904LT1G"
import { TPS2051BDBVR } from "../imports/TPS2051BDBVR"
import { A_902_131A1011D10100 } from "../imports/A_902_131A1011D10100"
import { EEEFT1A221AP } from "../imports/EEEFT1A221AP"

type ConsoleProps = Pick<ChipProps, "name" | "pcbX" | "pcbY" | "pcbRotation" | "schX" | "schY" | "schSectionName">
const connected = { mustBeConnected: true }

export function GreenIndicator(props: ConsoleProps) {
  const imported: ReactElement<ChipProps> = A_19_21SYGC_S530_E2_4T(props)
  // Everlight DSE-0025740 p5: physical 1=anode, 2=cathode. The raw symbol reverses them.
  // Preserve every supplier pad and courtyard; correct only the electrical representation.
  return <led {...imported.props} symbol={undefined} color="green"
    pinLabels={{ pin1: ["anode", "pos"], pin2: ["cathode", "neg"] }}
    pinAttributes={{ pin1: connected, pin2: connected }} />
}

export function RedIndicator(props: ConsoleProps) {
  return <A_19_217_R6C_AL1M2VY_6T {...props} color="red"
    pinAttributes={{ pin1: connected, pin2: connected }} />
}

export function IndicatorDriver(props: ConsoleProps) {
  const imported: ReactElement<ChipProps> = MMBT3904LT1G(props)
  return <transistor {...imported.props} type="npn" pinAttributes={{
    pin1: connected, pin2: { ...connected, requiresGround: true }, pin3: connected,
  }} />
}

export function UsbHostPower(props: ConsoleProps) {
  const imported: ReactElement<SwitchProps> = TPS2051BDBVR(props)
  // TI's semiconductor switch has five independent pins, not mechanical switch poles.
  return <chip {...imported.props} symbol={undefined} pinAttributes={{
    pin1: { ...connected, providesPower: true }, pin2: { ...connected, requiresGround: true },
    pin3: connected, pin4: connected, pin5: { ...connected, requiresPower: true },
  }} />
}

export function UsbHostConnector(props: ConsoleProps) {
  const imported: ReactElement<ChipProps> = A_902_131A1011D10100(props)
  return <connector {...imported.props} pinAttributes={{
    pin1: { ...connected, requiresPower: true }, pin2: connected, pin3: connected,
    pin4: { ...connected, requiresGround: true }, pin5: { ...connected, requiresGround: true },
    pin6: { ...connected, requiresGround: true },
  }} />
}

export function UsbHostReservoir(props: ConsoleProps) {
  return <EEEFT1A221AP {...props} polarized
    pinAttributes={{ pin1: connected, pin2: { ...connected, requiresGround: true } }} />
}
