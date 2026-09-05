import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["OUT"],
  pin2: ["pin2"],
  pin3: ["GND"],
  pin4: ["EN"],
  pin5: ["PG"],
  pin6: ["IN"],
  pin7: ["EP"]
} as const

const pinAttributes = {
  pin3: {requiresGround: true}
} as const

export const TPS74525PQWDRVRQ1 = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      supplierPartNumbers={{
  "jlcpcb": [
    "C2865628"
  ]
}}
      manufacturerPartNumber="TPS74525PQWDRVRQ1"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} pcbX="-1.028446mm" pcbY="0.649986mm" width="0.6070092mm" height="0.3640074mm" radius="0.1820037mm" shape="pill" />
<smtpad portHints={["pin2"]} pcbX="-1.028446mm" pcbY="0mm" width="0.6070092mm" height="0.3640074mm" radius="0.1820037mm" shape="pill" />
<smtpad portHints={["pin3"]} pcbX="-1.028446mm" pcbY="-0.649986mm" width="0.6070092mm" height="0.3640074mm" radius="0.1820037mm" shape="pill" />
<smtpad portHints={["pin4"]} pcbX="1.028446mm" pcbY="-0.649986mm" width="0.6070092mm" height="0.3640074mm" radius="0.1820037mm" shape="pill" />
<smtpad portHints={["pin5"]} pcbX="1.028446mm" pcbY="0mm" width="0.6070092mm" height="0.3640074mm" radius="0.1820037mm" shape="pill" />
<smtpad portHints={["pin6"]} pcbX="1.028446mm" pcbY="0.649986mm" width="0.6070092mm" height="0.3640074mm" radius="0.1820037mm" shape="pill" />
<smtpad portHints={["pin7"]} pcbX="0mm" pcbY="0mm" width="0.999998mm" height="1.5999968mm" shape="rect" />
<silkscreenpath route={[{"x":-1.0761979999999767,"y":1.0761980000000904},{"x":1.0761979999999767,"y":1.0761980000000904}]} />
<silkscreenpath route={[{"x":-1.0761979999999767,"y":-1.0761979999999767},{"x":1.0761979999999767,"y":-1.0761979999999767}]} />
<silkscreencircle pcbX="-1.63195mm" pcbY="0.649986mm" radius="0.07493mm" />
<silkscreentext text="{NAME}" pcbX="-0.2794mm" pcbY="2.0668mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-1.9517999999999347,"y":1.3167999999999438},{"x":1.3929999999999154,"y":1.3167999999999438},{"x":1.3929999999999154,"y":-1.3421999999999343},{"x":-1.9517999999999347,"y":-1.3421999999999343},{"x":-1.9517999999999347,"y":1.3167999999999438}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2865628.obj?uuid=c909123e4a7a4da5a0270979fee6c02c",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2865628.step?uuid=c909123e4a7a4da5a0270979fee6c02c",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0, y: 0, z: 0 },
      }}
      {...props}
    />
  )
}