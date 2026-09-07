import type { LedProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["anode","pos"],
  pin2: ["cathode","neg"]
} as const

export const A_19_217_R6C_AL1M2VY_6T = (props: LedProps) => {
  const { name = "LED1", ...restProps } = props

  return (
    <led
      name={name}
      pinLabels={pinLabels}
      supplierPartNumbers={{
  "jlcpcb": [
    "C2986060"
  ]
}}
      manufacturerPartNumber="19-217/R6C-AL1M2VY/6T"
      footprint={<footprint>
        <smtpad portHints={["pin2","cathode","neg"]} pcbX="-0.8509mm" pcbY="0mm" width="0.7999984mm" height="0.7999984mm" shape="rect" />
<smtpad portHints={["pin1","anode","pos"]} pcbX="0.8509mm" pcbY="0mm" width="0.7999984mm" height="0.7999984mm" shape="rect" />
<silkscreenpath route={[{"x":1.7653000000002521,"y":-0.8634983999997985},{"x":1.7653000000002521,"y":0.8637016000000131}]} />
<silkscreenpath route={[{"x":1.7653000000002521,"y":0.8637016000000131},{"x":0.2921000000001186,"y":0.8637016000000131}]} />
<silkscreenpath route={[{"x":1.7653000000002521,"y":-0.8634983999997985},{"x":0.2921000000001186,"y":-0.8634983999997985}]} />
<silkscreenpath route={[{"x":-0.2920999999998912,"y":0.8637016000000131},{"x":-1.4604999999999109,"y":0.8637016000000131}]} />
<silkscreenpath route={[{"x":-0.31749999999988177,"y":-0.8634983999997985},{"x":-1.4604999999999109,"y":-0.8634983999997985}]} />
<silkscreenpath route={[{"x":-1.4604999999999109,"y":-0.8634983999997985},{"x":-1.8160999999998921,"y":-0.5078983999998172},{"x":-1.8160999999998921,"y":0.5081016000001455},{"x":-1.4604999999999109,"y":0.8637016000000131}]} />
<silkscreenpath route={[{"x":0.076200000000199,"y":-0.40629839999996875},{"x":0.076200000000199,"y":0.3811016000001928}]} />
<silkscreenpath route={[{"x":0.076200000000199,"y":-0.00784859999987475},{"x":-0.0991615999998885,"y":-0.00784859999987475}]} />
<silkscreentext text="{NAME}" pcbX="-0.0127mm" pcbY="1.868934mm" anchorAlignment="center" fontSize="1mm" />
<fabricationnotepath route={[{"x":1.2246609999999691,"y":-0.06883399999992434},{"x":0.5642609999999877,"y":-0.06883399999992434},{"x":0.5642609999999877,"y":0.08356600000013259},{"x":1.2246609999999691,"y":0.08356600000013259},{"x":1.2246609999999691,"y":-0.06883399999992434}]} strokeWidth="0.254mm" />
<fabricationnotepath route={[{"x":0.9876028000001043,"y":0.3496310000000449},{"x":0.9876028000001043,"y":-0.31076899999993657},{"x":0.835202800000161,"y":-0.31076899999993657},{"x":0.835202800000161,"y":0.3496310000000449},{"x":0.9876028000001043,"y":0.3496310000000449}]} strokeWidth="0.254mm" />
<fabricationnotepath route={[{"x":-0.5079999999998108,"y":-0.07429500000000644},{"x":-1.168399999999906,"y":-0.07429500000000644},{"x":-1.168399999999906,"y":0.07810500000016418},{"x":-0.5079999999998108,"y":0.07810500000016418},{"x":-0.5079999999998108,"y":-0.07429500000000644}]} strokeWidth="0.254mm" />
<courtyardoutline outline={[{"x":-2.053399999999783,"y":1.1189340000000811},{"x":2.02800000000002,"y":1.1189340000000811},{"x":2.02800000000002,"y":-1.1082659999999578},{"x":-2.053399999999783,"y":-1.1082659999999578},{"x":-2.053399999999783,"y":1.1189340000000811}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2986060.obj?uuid=5a35a09f1e9a4a79b96322f1882e949b",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2986060.step?uuid=5a35a09f1e9a4a79b96322f1882e949b",
        pcbRotationOffset: 180,
        modelOriginPosition: { x: 0, y: 0.00010160000010728254, z: -0.01 },
      }}
      {...restProps}
    />
  )
}