import type { ComponentProps, ReactElement } from "react"
import type { ChipProps } from "@tscircuit/props"
import { T113_S3 } from "../imports/T113_S3"
import { cpuPinAttributes } from "./cpu-electrical"

type T113M4020DC0Props = Omit<
  ComponentProps<typeof T113_S3>,
  | "manufacturerPartNumber"
  | "supplierPartNumbers"
  | "footprint"
  | "pinLabels"
  | "pinAttributes"
  | "cadModel"
>

/**
 * User-authorized reuse of the unchanged C5197687 supplier package and pin map.
 * Procurement targets S4. Package/voltage qualification remains in BLOCKERS.md.
 */
export function T113M4020DC0(props: T113M4020DC0Props) {
  const supplierChip: ReactElement<ChipProps> = T113_S3(props)
  return (
    <chip
      {...supplierChip.props}
      manufacturerPartNumber="T113M4020DC0"
      supplierPartNumbers={{ jlcpcb: ["C41411351"] }}
      pinAttributes={cpuPinAttributes}
    />
  )
}
