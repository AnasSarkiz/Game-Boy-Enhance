import type { ChipProps } from "@tscircuit/props"
import type { ReactElement } from "react"
import { TPS63802DLAR } from "../imports/TPS63802DLAR"
import { TPS3840DL20DBVR } from "../imports/TPS3840DL20DBVR"
import { TPS22917DBVR } from "../imports/TPS22917DBVR"
import { TLV9064IPWR } from "../imports/TLV9064IPWR"
import { LM4853MM_NOPB } from "../imports/LM4853MM_NOPB"
import { MIC1557YM5_TR } from "../imports/MIC1557YM5_TR"
import { SN74LVC2G34DBVR } from "../imports/SN74LVC2G34DBVR"
import { SN74LVC1G332DBVR } from "../imports/SN74LVC1G332DBVR"
import { SN74HC02PWR } from "../imports/SN74HC02PWR"
import { NDC7002N } from "../imports/NDC7002N"

// Genuine tsci-import outputs. @tscircuit/jlcpcb is not published; see BLOCKERS.md.
// Only supplier-imported footprints are rendered. Missing sourcing is explicit.
function getCatalogElement(referenceDesignator: string): ReactElement<ChipProps> | undefined {
  const props = { name: referenceDesignator }
  switch (referenceDesignator) {
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
  return <chip {...props} {...catalogElement?.props} name={props.name}
    pinLabels={props.pinLabels} noConnect={props.noConnect}
    pinAttributes={{ ...props.pinAttributes, ...catalogElement?.props.pinAttributes }} />
}
