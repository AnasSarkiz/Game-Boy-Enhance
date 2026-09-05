import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["1Y"],
  pin2: ["1A"],
  pin3: ["1B"],
  pin4: ["2Y"],
  pin5: ["2A"],
  pin6: ["2B"],
  pin7: ["GND"],
  pin8: ["3A"],
  pin9: ["3B"],
  pin10: ["3Y"],
  pin11: ["4A"],
  pin12: ["4B"],
  pin13: ["4Y"],
  pin14: ["VCC"]
} as const

const pinAttributes = {
  pin7: {requiresGround: true},
  pin14: {requiresPower: true}
} as const

export const SN74HC02PWR = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      supplierPartNumbers={{
  "jlcpcb": [
    "C484750"
  ]
}}
      manufacturerPartNumber="SN74HC02PWR"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} pcbX="-1.949958mm" pcbY="-2.925064mm" width="0.3048mm" height="0.9906mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="-1.299972mm" pcbY="-2.925064mm" width="0.3048mm" height="0.9906mm" shape="rect" />
<smtpad portHints={["pin3"]} pcbX="-0.649986mm" pcbY="-2.925064mm" width="0.3048mm" height="0.9906mm" shape="rect" />
<smtpad portHints={["pin4"]} pcbX="0mm" pcbY="-2.925064mm" width="0.3048mm" height="0.9906mm" shape="rect" />
<smtpad portHints={["pin5"]} pcbX="0.649986mm" pcbY="-2.925064mm" width="0.3048mm" height="0.9906mm" shape="rect" />
<smtpad portHints={["pin6"]} pcbX="1.299972mm" pcbY="-2.925064mm" width="0.3048mm" height="0.9906mm" shape="rect" />
<smtpad portHints={["pin7"]} pcbX="1.949958mm" pcbY="-2.925064mm" width="0.3048mm" height="0.9906mm" shape="rect" />
<smtpad portHints={["pin8"]} pcbX="1.949958mm" pcbY="2.925064mm" width="0.3048mm" height="0.9906mm" shape="rect" />
<smtpad portHints={["pin9"]} pcbX="1.299972mm" pcbY="2.925064mm" width="0.3048mm" height="0.9906mm" shape="rect" />
<smtpad portHints={["pin10"]} pcbX="0.649986mm" pcbY="2.925064mm" width="0.3048mm" height="0.9906mm" shape="rect" />
<smtpad portHints={["pin11"]} pcbX="0mm" pcbY="2.925064mm" width="0.3048mm" height="0.9906mm" shape="rect" />
<smtpad portHints={["pin12"]} pcbX="-0.649986mm" pcbY="2.925064mm" width="0.3048mm" height="0.9906mm" shape="rect" />
<smtpad portHints={["pin13"]} pcbX="-1.299972mm" pcbY="2.925064mm" width="0.3048mm" height="0.9906mm" shape="rect" />
<smtpad portHints={["pin14"]} pcbX="-1.949958mm" pcbY="2.925064mm" width="0.3048mm" height="0.9906mm" shape="rect" />
<silkscreenpath route={[{"x":2.4999949999999984,"y":2.199995599999994},{"x":-2.499994999999984,"y":2.199995599999994}]} />
<silkscreenpath route={[{"x":2.4999949999999984,"y":2.199995599999994},{"x":2.4999949999999984,"y":-2.1999956000000083}]} />
<silkscreenpath route={[{"x":-2.499994999999984,"y":-2.1999956000000083},{"x":-2.499994999999984,"y":2.199995599999994}]} />
<silkscreenpath route={[{"x":-2.499994999999984,"y":-2.1999956000000083},{"x":2.4999949999999984,"y":-2.1999956000000083}]} />
<silkscreencircle pcbX="-1.6256mm" pcbY="-1.2192mm" radius="0.150114mm" />
<silkscreencircle pcbX="-2.53619mm" pcbY="-2.916936mm" radius="0.150114mm" />
<silkscreentext text="{NAME}" pcbX="-0.1016mm" pcbY="4.429mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-2.9424000000000063,"y":3.678999999999988},{"x":2.7391999999999825,"y":3.678999999999988},{"x":2.7391999999999825,"y":-3.704400000000007},{"x":-2.9424000000000063,"y":-3.704400000000007},{"x":-2.9424000000000063,"y":3.678999999999988}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C484750.obj?uuid=5377177da492449fa1a3111d646cac17",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C484750.step?uuid=5377177da492449fa1a3111d646cac17",
        pcbRotationOffset: 90,
        modelOriginPosition: { x: 0.000012700000013410317, y: 0, z: -0.069083 },
      }}
      {...props}
    />
  )
}