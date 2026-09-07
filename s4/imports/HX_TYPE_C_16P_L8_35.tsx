import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["pin1"],
  pin2: ["pin2"],
  pin3: ["pin3"],
  pin4: ["pin4"],
  pin5: ["A1B12","GND1"],
  pin6: ["A4B9","VBUS1"],
  pin7: ["B1A12","GND2"],
  pin8: ["B4A9","VBUS2"],
  pin9: ["B5","CC2"],
  pin10: ["A8","SBU1"],
  pin11: ["B6","DP2"],
  pin12: ["A7","DN1"],
  pin13: ["A6","DP1"],
  pin14: ["B7","DN2"],
  pin15: ["A5","CC1"],
  pin16: ["B8","SBU2"]
} as const

export const HX_TYPE_C_16P_L8_35 = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      supplierPartNumbers={{
  "jlcpcb": [
    "C41427493"
  ]
}}
      manufacturerPartNumber="HX TYPE-C 16P L8.35"
      footprint={<footprint>
        <hole pcbX="2.875026mm" pcbY="0.79000355mm" diameter="0.700024mm" />
<hole pcbX="-2.875026mm" pcbY="0.79101955mm" diameter="0.700024mm" />
<platedhole  portHints={["pin4"]} pcbX="4.320032mm" pcbY="-2.88994845mm" holeWidth="0.5999988mm" holeHeight="1.3999972mm" outerWidth="0.999998mm" outerHeight="1.7999964mm" shape="pill" />
<platedhole  portHints={["pin3"]} pcbX="-4.320032mm" pcbY="-2.88994845mm" holeWidth="0.5999988mm" holeHeight="1.3999972mm" outerWidth="0.999998mm" outerHeight="1.7999964mm" shape="pill" />
<platedhole  portHints={["pin2"]} pcbX="4.320032mm" pcbY="1.28946915mm" holeWidth="0.5999988mm" holeHeight="1.6999966mm" outerWidth="0.999998mm" outerHeight="2.0999958mm" shape="pill" />
<platedhole  portHints={["pin1"]} pcbX="-4.320032mm" pcbY="1.28987555mm" holeWidth="0.5999988mm" holeHeight="1.6999966mm" outerWidth="0.999998mm" outerHeight="2.0999958mm" shape="pill" />
<smtpad portHints={["pin5"]} pcbX="-3.200146mm" pcbY="2.21494355mm" width="0.5299964mm" height="1.4500098mm" shape="rect" />
<smtpad portHints={["pin6"]} pcbX="-2.400046mm" pcbY="2.21494355mm" width="0.5299964mm" height="1.4500098mm" shape="rect" />
<smtpad portHints={["pin7"]} pcbX="3.199892mm" pcbY="2.21468955mm" width="0.5299964mm" height="1.4500098mm" shape="rect" />
<smtpad portHints={["pin8"]} pcbX="2.400046mm" pcbY="2.21494355mm" width="0.5299964mm" height="1.4500098mm" shape="rect" />
<smtpad portHints={["pin9"]} pcbX="1.75006mm" pcbY="2.21494355mm" width="0.2999994mm" height="1.4500098mm" shape="rect" />
<smtpad portHints={["pin10"]} pcbX="1.249934mm" pcbY="2.21494355mm" width="0.2999994mm" height="1.4500098mm" shape="rect" />
<smtpad portHints={["pin11"]} pcbX="0.750062mm" pcbY="2.21494355mm" width="0.2999994mm" height="1.4500098mm" shape="rect" />
<smtpad portHints={["pin12"]} pcbX="0.249936mm" pcbY="2.21494355mm" width="0.2999994mm" height="1.4500098mm" shape="rect" />
<smtpad portHints={["pin13"]} pcbX="-0.249936mm" pcbY="2.21494355mm" width="0.2999994mm" height="1.4500098mm" shape="rect" />
<smtpad portHints={["pin14"]} pcbX="-0.750062mm" pcbY="2.21494355mm" width="0.2999994mm" height="1.4500098mm" shape="rect" />
<smtpad portHints={["pin15"]} pcbX="-1.249934mm" pcbY="2.21494355mm" width="0.2999994mm" height="1.4500098mm" shape="rect" />
<smtpad portHints={["pin16"]} pcbX="-1.75006mm" pcbY="2.21494355mm" width="0.2999994mm" height="1.4500098mm" shape="rect" />
<silkscreenpath route={[{"x":-4.320082800000137,"y":-1.758886450000091},{"x":-4.320082800000137,"y":0.008648749999792926}]} />
<silkscreenpath route={[{"x":4.319879599999922,"y":-1.758886450000091},{"x":4.319879599999922,"y":0.008648749999792926}]} />
<silkscreenpath route={[{"x":4.319879599999922,"y":-6.510032650000085},{"x":4.319879599999922,"y":-4.021162849999996}]} />
<silkscreenpath route={[{"x":-4.320082800000137,"y":-6.510032650000085},{"x":-4.320082800000137,"y":-4.021162849999996}]} />
<silkscreenpath route={[{"x":4.319879599999922,"y":-6.510032650000085},{"x":-4.320082800000137,"y":-6.510032650000085}]} />
<silkscreentext text="{NAME}" pcbX="0mm" pcbY="3.94341555mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-5.075999999999908,"y":3.193415549999827},{"x":5.076000000000022,"y":3.193415549999827},{"x":5.076000000000022,"y":-6.755384450000065},{"x":-5.075999999999908,"y":-6.755384450000065},{"x":-5.075999999999908,"y":3.193415549999827}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C41427493.obj?uuid=9544114ef5bb4dfbb31a31544500c2c1",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C41427493.step?uuid=9544114ef5bb4dfbb31a31544500c2c1",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0.00008889999992334197, y: 6.437524650000114, z: -1.7299890000000002 },
      }}
      {...props}
    />
  )
}