import type { ChipProps } from "@tscircuit/props"
import { cloneElement, type ReactElement } from "react"
import { powerSwitchSymbol } from "./power-switch-symbol"
import { getPassiveElement } from "./passive-parts"
import { reference } from "./reference"
import { A_62684_402100ALF } from "../imports/A_62684_402100ALF"
import { SJ_3524_SMT_TR } from "../imports/SJ_3524_SMT_TR"
import { A_5015 } from "../imports/A_5015"
import { A_1SS355VMTE_17 } from "../imports/A_1SS355VMTE_17"
import { MH1608_601Y } from "../imports/MH1608_601Y"
import { ACM2520_801_3P_T002 } from "../imports/ACM2520_801_3P_T002"
import { DFE252012P_R47M_P2 } from "../imports/DFE252012P_R47M_P2"
import { A_0805L075SLYR } from "../imports/A_0805L075SLYR"
import { A_150060VS75000 } from "../imports/A_150060VS75000"
import { A_150060RS75000 } from "../imports/A_150060RS75000"
import { MMBT3904LT1G } from "../imports/MMBT3904LT1G"
import { MMBT3906LT1G } from "../imports/MMBT3906LT1G"
import { A_2N7002LT1G } from "../imports/A_2N7002LT1G"
import { B2B_PH_K_S_LF__SN_ } from "../imports/B2B_PH_K_S_LF__SN_"
import { PZ254V_11_02P } from "../imports/PZ254V_11_02P"
import { RC_ML08W331JT } from "../imports/RC_ML08W331JT"
import { A_0466002_NRHF } from "../imports/A_0466002_NRHF"
import { TPS74525PQWDRVRQ1 } from "../imports/TPS74525PQWDRVRQ1"
import { TPS63802DLAR } from "../imports/TPS63802DLAR"
import { TPS3840DL20DBVR } from "../imports/TPS3840DL20DBVR"
import { TPS22917DBVR } from "../imports/TPS22917DBVR"
import { TLV9064IPWR } from "../imports/TLV9064IPWR"
import { LM4853MM_NOPB } from "../imports/LM4853MM_NOPB"
import { MIC1557YM5_TR } from "../imports/MIC1557YM5_TR"
import { SN74LVC2G34DBVR } from "../imports/SN74LVC2G34DBVR"
import { SN74LVC1G332DBVR } from "../imports/SN74LVC1G332DBVR"
import { SN74HC02PWR } from "../imports/SN74HC02PWR"
import { A_49SSMD_4_194304_20_10_10_B } from "../imports/A_49SSMD_4_194304_20_10_10_B"
import { CY62146EV30LL_45ZSXI } from "../imports/CY62146EV30LL_45ZSXI"
import { CSS_1210TB } from "../imports/CSS_1210TB"
import { A_1825027_5 } from "../imports/A_1825027_5"
import { RK10J12R0A0B } from "../imports/RK10J12R0A0B"
import { TC33X_2_503E } from "../imports/TC33X_2_503E"
import { NDC7002N } from "../imports/NDC7002N"

// Genuine tsci-import outputs. @tscircuit/jlcpcb is not published; see BLOCKERS.md.
// Only supplier-imported footprints are rendered. Missing sourcing is explicit.
export function getCatalogElement(referenceDesignator: string): ReactElement<ChipProps> | undefined {
  const props = { name: referenceDesignator }
  const component = reference.components.find((component) => component.reference === referenceDesignator)
  if (!component) throw new Error(`Unknown reference component: ${referenceDesignator}`)
  if (/^R\d+$/.test(referenceDesignator)) return getPassiveElement({ key: `res-${component.value}`, name: referenceDesignator })
  if (/^C[P]?\d+$/.test(referenceDesignator)) return getPassiveElement({ key: `cap-${component.value}`, name: referenceDesignator })
  if (/^TP\d+$/.test(referenceDesignator)) return A_5015(props)
  switch (referenceDesignator) {
    case "X1": return A_49SSMD_4_194304_20_10_10_B(props)
    case "U2": return CY62146EV30LL_45ZSXI(props)
    case "VR1": return TC33X_2_503E(props)
    case "VR2": return RK10J12R0A0B(props)
    case "SW1": return CSS_1210TB(props)
    case "SW2": case "SW3": return A_1825027_5(props)
    case "F1": return A_0466002_NRHF(props)
    case "U4": case "U8": return TPS74525PQWDRVRQ1(props)
    case "P2": return A_62684_402100ALF(props)
    case "P3": return SJ_3524_SMT_TR(props)
    case "BT1": case "SP1": return B2B_PH_K_S_LF__SN_(props)
    case "JP1": case "JP3": return PZ254V_11_02P(props)
    case "JP2": case "NT1": return getPassiveElement({ key: "res-0", name: referenceDesignator })
    case "Z57": case "Z58": return getPassiveElement({ key: "cap-100p", name: referenceDesignator })
    case "D1": case "D2": return A_1SS355VMTE_17(props)
    case "EM1": case "EM2": return ACM2520_801_3P_T002(props)
    case "EM3": case "EM7": return MH1608_601Y(props)
    case "L1": case "L2": return DFE252012P_R47M_P2(props)
    case "PTC1": return A_0805L075SLYR(props)
    case "DL1": return A_150060VS75000(props)
    case "DL2": return A_150060RS75000(props)
    case "Q1": return MMBT3904LT1G(props)
    case "Q3": return MMBT3906LT1G(props)
    case "Q6": case "Q8": return A_2N7002LT1G(props)
    case "RA1": return RC_ML08W331JT(props)
    case "U5": case "U13": return TPS63802DLAR(props)
    case "U3": case "U10": case "U17": return TPS3840DL20DBVR(props)
    case "U11": case "U12": case "U18": return TPS22917DBVR(props)
    case "U7": return TLV9064IPWR(props)
    case "U6": return LM4853MM_NOPB(props)
    case "U14": return MIC1557YM5_TR(props)
    case "U9": return SN74LVC2G34DBVR(props)
    case "U15": return SN74LVC1G332DBVR(props)
    case "U16": return SN74HC02PWR(props)
    case "Q2": case "Q5": case "Q7": case "Q9": case "Q10": return NDC7002N(props)
  }
}

export function SourcedChip({ referenceDesignator, props }: { referenceDesignator: string; props: ChipProps }) {
  const catalogElement = getCatalogElement(referenceDesignator)
  // Keep the imported footprint and courtyard intact; reference pins retain
  // connectivity. Unsourced components remain schematic-only and block release.
  if (!catalogElement) return <chip {...props} />
  const catalogProps: ChipProps = { ...props, footprint: catalogElement.props.footprint,
    manufacturerPartNumber: catalogElement.props.manufacturerPartNumber,
    pinAttributes: { ...props.pinAttributes, ...catalogElement.props.pinAttributes } }
  if (referenceDesignator === "SW1") return <switch {...catalogElement.props} {...catalogProps} spdt symbol={powerSwitchSymbol} />
  // This passive two-terminal crystal's catalog symbol incorrectly marks pin 2
  // as GND. Both terminals go to the CPU oscillator. Retain supplier geometry.
  if (referenceDesignator === "X1") return <crystal {...catalogElement.props} {...catalogProps}
    symbol={undefined} frequency="4.194304MHz" loadCapacitance="20pF" pinAttributes={props.pinAttributes} />
  // The converter currently emits an electronic load switch as a mechanical
  // switch primitive. Its six datasheet pins must stay electrically separate.
  if (["U11", "U12", "U18"].includes(referenceDesignator)) return <chip {...catalogElement.props} {...catalogProps} />
  return cloneElement(catalogElement, catalogProps)
}
