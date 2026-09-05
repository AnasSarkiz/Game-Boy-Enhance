import type { PushButtonProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["pin1"],
  pin2: ["pin2"],
  pin3: ["pin3"],
  pin4: ["pin4"]
} as const

export const A_1825027_5 = (props: PushButtonProps<typeof pinLabels>) => {
  const { name = "SW1", ...restProps } = props

  return (
    <pushbutton
      name={name}
      pinLabels={pinLabels}
      supplierPartNumbers={{
  "jlcpcb": [
    "C86476"
  ]
}}
      manufacturerPartNumber="1825027-5"
      footprint={<footprint>
        <platedhole  portHints={["pin1"]} pcbX="-2.249932mm" pcbY="-1.32499735mm" outerDiameter="1.6999966mm" holeDiameter="1.1000232mm" shape="circle" />
<platedhole  portHints={["pin2"]} pcbX="2.249932mm" pcbY="-1.32499735mm" outerDiameter="1.6999966mm" holeDiameter="1.1000232mm" shape="circle" />
<platedhole  portHints={["pin3"]} pcbX="3.599942mm" pcbY="1.17499765mm" outerDiameter="1.999996mm" holeDiameter="1.3999972mm" shape="circle" />
<platedhole  portHints={["pin4"]} pcbX="-3.599942mm" pcbY="1.17499765mm" outerDiameter="1.999996mm" holeDiameter="1.3999972mm" shape="circle" />
<silkscreenpath route={[{"x":1.77800000000002,"y":-5.78800595000007},{"x":1.77800000000002,"y":-3.9739887499999895}]} />
<silkscreenpath route={[{"x":3.650005399999941,"y":-0.2557081500001459},{"x":3.650005399999941,"y":-3.8250177500001428}]} />
<silkscreenpath route={[{"x":-3.6500054000000546,"y":-3.8250177500001428},{"x":3.650005399999941,"y":-3.8250177500001428}]} />
<silkscreenpath route={[{"x":3.650005399999941,"y":2.714999649999868},{"x":-3.6500054000000546,"y":2.714999649999868}]} />
<silkscreenpath route={[{"x":-1.665986000000089,"y":-5.78800595000007},{"x":1.77800000000002,"y":-5.78800595000007}]} />
<silkscreenpath route={[{"x":-3.6500054000000546,"y":2.714999649999868},{"x":-3.6500054000000546,"y":2.4356758499999387}]} />
<silkscreenpath route={[{"x":-3.6500054000000546,"y":-0.2557081500001459},{"x":-3.6500054000000546,"y":-3.8250177500001428}]} />
<silkscreenpath route={[{"x":3.650005399999941,"y":2.714999649999868},{"x":3.650005399999941,"y":2.4356758499999387}]} />
<silkscreenpath route={[{"x":-1.665986000000089,"y":-5.78800595000007},{"x":-1.665986000000089,"y":-3.9739887499999895}]} />
<silkscreentext text="{NAME}" pcbX="0mm" pcbY="3.71360265mm" anchorAlignment="center" fontSize="1mm" />
<fabricationnotepath route={[{"x":-1.77800000000002,"y":-3.864997350000067},{"x":-1.77800000000002,"y":-5.76999735000004},{"x":-1.6510000000000673,"y":-5.896997350000106},{"x":1.7779999999999063,"y":-5.896997350000106},{"x":1.9049999999999727,"y":-5.76999735000004},{"x":1.9049999999999727,"y":-3.7379973500001142},{"x":1.7779999999999063,"y":-3.7379973500001142},{"x":1.6509999999999536,"y":-3.7379973500001142},{"x":1.6509999999999536,"y":-5.642997350000087},{"x":-1.524000000000001,"y":-5.642997350000087},{"x":-1.524000000000001,"y":-3.7379973500001142},{"x":-1.77800000000002,"y":-3.7379973500001142},{"x":-1.77800000000002,"y":-3.864997350000067}]} strokeWidth="0.254mm" />
<courtyardoutline outline={[{"x":-4.898200000000088,"y":2.9636026499999844},{"x":4.898199999999861,"y":2.9636026499999844},{"x":4.898199999999861,"y":-6.146997350000106},{"x":-4.898200000000088,"y":-6.146997350000106},{"x":-4.898200000000088,"y":2.9636026499999844}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C86476.obj?uuid=321572bc694a4721b02d82812c16c516",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C86476.step?uuid=321572bc694a4721b02d82812c16c516",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0, y: 1.2299949500000822, z: -0.000006999999999646178 },
      }}
      {...restProps}
    />
  )
}