import type { ReactElement } from "react"
import type { ChipProps } from "@tscircuit/props"
import { HX_TYPE_C_16P_L8_35 } from "../imports/HX_TYPE_C_16P_L8_35"
import { SN74AHC1G08DCKR } from "../imports/SN74AHC1G08DCKR"
import { USBLC6_2SC6 } from "../imports/USBLC6_2SC6"
import { ZDSD04GLGEAG } from "../imports/ZDSD04GLGEAG"
import { JK_nSMD100_16 } from "../imports/JK_nSMD100_16"

type InterfaceProps = Pick<ChipProps, "name" | "pcbX" | "pcbY" | "pcbRotation" | "schX" | "schY" | "schSectionName">

export function UsbRecoveryConnector(props: InterfaceProps) {
  const supplierChip: ReactElement<ChipProps> = HX_TYPE_C_16P_L8_35(props)
  return <connector {...supplierChip.props} standard="usb_c" pinAttributes={{
    pin1: { requiresGround: true, mustBeConnected: true },
    pin2: { requiresGround: true, mustBeConnected: true },
    pin3: { requiresGround: true, mustBeConnected: true },
    pin4: { requiresGround: true, mustBeConnected: true },
    pin5: { requiresGround: true, mustBeConnected: true },
    pin7: { requiresGround: true, mustBeConnected: true },
    pin6: { providesPower: true, mustBeConnected: true }, pin8: { providesPower: true, mustBeConnected: true },
    pin9: { mustBeConnected: true }, pin15: { mustBeConnected: true },
    pin11: { mustBeConnected: true }, pin12: { mustBeConnected: true },
    pin13: { mustBeConnected: true }, pin14: { mustBeConnected: true },
    pin10: { doNotConnect: true }, pin16: { doNotConnect: true },
  }} />
}

export function UsbInputFuse(props: InterfaceProps) {
  const supplierChip: ReactElement<ChipProps> = JK_nSMD100_16(props)
  return <fuse {...supplierChip.props} symbol={undefined} currentRating="1A" voltageRating="16V"
    pinAttributes={{ pin1: { mustBeConnected: true }, pin2: { mustBeConnected: true } }} />
}

export function UsbRecoveryProtection(props: InterfaceProps) {
  const supplierChip: ReactElement<ChipProps> = USBLC6_2SC6(props)
  // ST's top-view circuit connects 1–6 and 3–4 inside the package.
  return <chip {...supplierChip.props} internallyConnectedPins={[[1, 6], [3, 4]]} pinAttributes={{
    pin1: { mustBeConnected: true }, pin6: { mustBeConnected: true },
    pin3: { mustBeConnected: true }, pin4: { mustBeConnected: true },
    pin2: { requiresGround: true, mustBeConnected: true },
    pin5: { requiresPower: true, mustBeConnected: true },
  }} />
}

export function BootStorage(props: InterfaceProps) {
  const supplierChip: ReactElement<ChipProps> = ZDSD04GLGEAG(props)
  return <chip {...supplierChip.props} pinAttributes={{
    pin1: { mustBeConnected: true }, pin2: { mustBeConnected: true },
    pin3: { mustBeConnected: true }, pin5: { mustBeConnected: true },
    pin6: { mustBeConnected: true }, pin7: { mustBeConnected: true },
    pin4: { requiresGround: true, mustBeConnected: true },
    pin8: { requiresPower: true, mustBeConnected: true },
  }} />
}

export function RecoveryClockGate(props: InterfaceProps) {
  const supplierChip: ReactElement<ChipProps> = SN74AHC1G08DCKR(props)
  return <chip {...supplierChip.props} pinAttributes={{
    pin1: { mustBeConnected: true }, pin2: { mustBeConnected: true },
    pin4: { mustBeConnected: true },
    pin3: { requiresGround: true, mustBeConnected: true },
    pin5: { requiresPower: true, mustBeConnected: true },
  }} />
}
