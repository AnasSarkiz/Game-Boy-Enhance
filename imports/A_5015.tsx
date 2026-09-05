import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["pin1"]
} as const

export const A_5015 = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      supplierPartNumbers={{
  "jlcpcb": [
    "C2906768"
  ]
}}
      manufacturerPartNumber="5015"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} pcbX="0mm" pcbY="0mm" width="3.4299906mm" height="1.7800066mm" shape="rect" />
<silkscreenrect pcbX="0mm" pcbY="0mm" width="3.937mm" height="2.286mm" strokeWidth="0.254mm" />
<silkscreentext text="{NAME}" pcbX="0.0127mm" pcbY="2.143mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-2.20579999999984,"y":1.393000000000029},{"x":2.231200000000058,"y":1.393000000000029},{"x":2.231200000000058,"y":-1.393000000000029},{"x":-2.20579999999984,"y":-1.393000000000029},{"x":-2.20579999999984,"y":1.393000000000029}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2906768.obj?uuid=81281eb29232457a940d4ddaa05136d7",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2906768.step?uuid=81281eb29232457a940d4ddaa05136d7",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: -0.0007610000001135875, y: 0.7620127000000703, z: -0.762 },
      }}
      {...props}
    />
  )
}