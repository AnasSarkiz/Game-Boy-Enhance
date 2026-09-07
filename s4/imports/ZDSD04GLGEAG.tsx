import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["DAT2"],
  pin2: ["DAT3"],
  pin3: ["CLK"],
  pin4: ["GND"],
  pin5: ["CMD"],
  pin6: ["DAT0"],
  pin7: ["DAT1"],
  pin8: ["VDD"]
} as const

const pinAttributes = {
  pin4: {requiresGround: true},
  pin8: {requiresPower: true}
} as const

export const ZDSD04GLGEAG = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      supplierPartNumbers={{
  "jlcpcb": [
    "C2875854"
  ]
}}
      manufacturerPartNumber="ZDSD04GLGEAG"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} pcbX="-3.700018mm" pcbY="1.905mm" width="1.6999966mm" height="0.7999984mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="-3.700018mm" pcbY="0.635mm" width="1.6999966mm" height="0.7999984mm" shape="rect" />
<smtpad portHints={["pin3"]} pcbX="-3.700018mm" pcbY="-0.635mm" width="1.6999966mm" height="0.7999984mm" shape="rect" />
<smtpad portHints={["pin4"]} pcbX="-3.700018mm" pcbY="-1.905mm" width="1.6999966mm" height="0.7999984mm" shape="rect" />
<smtpad portHints={["pin8"]} pcbX="3.700018mm" pcbY="1.905mm" width="1.6999966mm" height="0.7999984mm" shape="rect" />
<smtpad portHints={["pin7"]} pcbX="3.700018mm" pcbY="0.635mm" width="1.6999966mm" height="0.7999984mm" shape="rect" />
<smtpad portHints={["pin6"]} pcbX="3.700018mm" pcbY="-0.635mm" width="1.6999966mm" height="0.7999984mm" shape="rect" />
<smtpad portHints={["pin5"]} pcbX="3.700018mm" pcbY="-1.905mm" width="1.6999966mm" height="0.7999984mm" shape="rect" />
<silkscreenpath route={[{"x":4.00004279999996,"y":-1.2190476000000672},{"x":4.00004279999996,"y":-1.3207491999999093}]} />
<silkscreenpath route={[{"x":4.00004279999996,"y":0.05095240000002832},{"x":4.00004279999996,"y":-0.05074919999992744}]} />
<silkscreenpath route={[{"x":4.00004279999996,"y":1.3209524000000101},{"x":4.00004279999996,"y":1.2192507999999407}]} />
<silkscreenpath route={[{"x":4.00004279999996,"y":3.000095599999895},{"x":4.00004279999996,"y":2.489250800000036}]} />
<silkscreenpath route={[{"x":-3.9999665999999934,"y":-2.489047600000049},{"x":-3.9999665999999934,"y":-2.9999178000000484}]} />
<silkscreenpath route={[{"x":-3.9999665999999934,"y":-1.2190476000000672},{"x":-3.9999665999999934,"y":-1.3207491999999093}]} />
<silkscreenpath route={[{"x":-3.9999665999999934,"y":0.05095240000002832},{"x":-3.9999665999999934,"y":-0.05074919999992744}]} />
<silkscreenpath route={[{"x":-3.9999665999999934,"y":1.3209524000000101},{"x":-3.9999665999999934,"y":1.2192507999999407}]} />
<silkscreenpath route={[{"x":-3.9999665999999934,"y":3.000095599999895},{"x":-3.9999665999999934,"y":2.489250800000036}]} />
<silkscreenpath route={[{"x":-3.9999665999999934,"y":-2.9999178000000484},{"x":4.00004279999996,"y":-2.9999178000000484}]} />
<silkscreenpath route={[{"x":-3.9999665999999934,"y":3.000095599999895},{"x":4.00004279999996,"y":3.000095599999895}]} />
<silkscreenpath route={[{"x":4.00004279999996,"y":-2.489047600000049},{"x":4.00004279999996,"y":-2.9999178000000484}]} />
<silkscreencircle pcbX="-4.799838mm" pcbY="2.800096mm" radius="0.141478mm" />
<silkscreentext text="{NAME}" pcbX="-0.189738mm" pcbY="4.02514mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-5.1895379999999705,"y":3.275139999999965},{"x":4.810061999999903,"y":3.275139999999965},{"x":4.810061999999903,"y":-3.2700600000000577},{"x":-5.1895379999999705,"y":-3.2700600000000577},{"x":-5.1895379999999705,"y":3.275139999999965}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2875854.obj?uuid=35d565001239477681fdfc17de9b684b",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2875854.step?uuid=35d565001239477681fdfc17de9b684b",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: -0.00005079999993995443, y: -0.004949199999946252, z: -0.02 },
      }}
      {...props}
    />
  )
}