import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["A"],
  pin2: ["B"],
  pin3: ["GND"],
  pin4: ["Y"],
  pin5: ["VCC"]
} as const

const pinAttributes = {
  pin3: {requiresGround: true},
  pin5: {requiresPower: true}
} as const

export const SN74AHC1G08DCKR = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      supplierPartNumbers={{
  "jlcpcb": [
    "C122838"
  ]
}}
      manufacturerPartNumber="SN74AHC1G08DCKR"
      footprint={<footprint>
        <smtpad portHints={["pin5"]} pcbX="-1.100074mm" pcbY="-0.649986mm" width="0.8999982mm" height="0.3999992mm" shape="rect" />
<smtpad portHints={["pin4"]} pcbX="-1.100074mm" pcbY="0.649986mm" width="0.8999982mm" height="0.3999992mm" shape="rect" />
<smtpad portHints={["pin3"]} pcbX="1.100074mm" pcbY="0.649986mm" width="0.8999982mm" height="0.3999992mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="1.100074mm" pcbY="0mm" width="0.8999982mm" height="0.3999992mm" shape="rect" />
<smtpad portHints={["pin1"]} pcbX="1.100074mm" pcbY="-0.649986mm" width="0.8999982mm" height="0.3999992mm" shape="rect" />
<silkscreenpath route={[{"x":-0.6999732000001586,"y":-0.2418841999997312},{"x":-0.6999732000001586,"y":0.24198580000006586}]} />
<silkscreenpath route={[{"x":0.6999985999998444,"y":1.058189400000174},{"x":0.6999985999998444,"y":1.1500866000001224}]} />
<silkscreenpath route={[{"x":0.6999985999998444,"y":-1.1499341999999615},{"x":0.6999985999998444,"y":-1.0580877999998393}]} />
<silkscreenpath route={[{"x":-0.6999732000001586,"y":1.0581132000000935},{"x":-0.6999732000001586,"y":1.1500866000001224}]} />
<silkscreenpath route={[{"x":-0.6999732000001586,"y":-1.1499341999999615},{"x":-0.6999732000001586,"y":-1.0580369999998993}]} />
<silkscreenpath route={[{"x":-0.6999732000001586,"y":1.1500866000001224},{"x":0.6999985999998444,"y":1.1500866000001224}]} />
<silkscreenpath route={[{"x":-0.6999732000001586,"y":-1.1499341999999615},{"x":0.6999985999998444,"y":-1.1499341999999615}]} />
<silkscreencircle pcbX="1.143mm" pcbY="-1.27mm" radius="0.127mm" />
<silkscreentext text="{NAME}" pcbX="0.237744mm" pcbY="2.146556mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-1.802956000000222,"y":1.3965560000000323},{"x":2.2784439999998085,"y":1.3965560000000323},{"x":2.2784439999998085,"y":-1.6434439999999313},{"x":-1.802956000000222,"y":-1.6434439999999313},{"x":-1.802956000000222,"y":1.3965560000000323}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C122838.obj?uuid=2a221d464efb4ebcb99e4ea11aff9052",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C122838.step?uuid=2a221d464efb4ebcb99e4ea11aff9052",
        pcbRotationOffset: 180,
        modelOriginPosition: { x: 0.000012699999842880061, y: 0.00005080000005364127, z: -0.1 },
      }}
      {...props}
    />
  )
}