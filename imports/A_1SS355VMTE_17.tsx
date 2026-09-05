import type { DiodeProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["cathode","neg"],
  pin2: ["anode","pos"]
} as const

export const A_1SS355VMTE_17 = (props: DiodeProps) => {
  const { name = "D1", ...restProps } = props

  return (
    <diode
      name={name}
      pinLabels={pinLabels}
      supplierPartNumbers={{
  "jlcpcb": [
    "C111695"
  ]
}}
      manufacturerPartNumber="1SS355VMTE-17"
      footprint={<footprint>
        <smtpad portHints={["pin2","anode","pos"]} pcbX="1.18491mm" pcbY="0mm" width="0.729996mm" height="0.3849878mm" shape="rect" />
<smtpad portHints={["pin1","cathode","neg"]} pcbX="-1.18491mm" pcbY="0mm" width="0.729996mm" height="0.3849878mm" shape="rect" />
<silkscreenpath route={[{"x":-0.9262109999999666,"y":0.7011669999999413},{"x":0.9262109999999666,"y":0.7011669999999413}]} />
<silkscreenpath route={[{"x":0.9262109999999666,"y":0.7011669999999413},{"x":0.9262109999999666,"y":0.39570659999992586}]} />
<silkscreenpath route={[{"x":-0.9262109999999666,"y":-0.7011669999999413},{"x":0.9262109999999666,"y":-0.7011669999999413}]} />
<silkscreenpath route={[{"x":0.9262109999999666,"y":-0.7011669999999413},{"x":0.9262109999999666,"y":-0.39570660000003954}]} />
<silkscreenpath route={[{"x":-0.6167628000000605,"y":0.7011669999999413},{"x":-0.6167628000000605,"y":-0.7011669999999413}]} />
<silkscreentext text="{NAME}" pcbX="0mm" pcbY="1.7874mm" anchorAlignment="center" fontSize="1mm" />
<fabricationnotepath route={[{"x":-1.1890247999999701,"y":0.0750062000000753},{"x":-1.1890247999999701,"y":-0.07500619999996161},{"x":-0.5890260000001035,"y":-0.07500619999996161},{"x":-0.5890260000001035,"y":0.0750062000000753},{"x":-1.1890247999999701,"y":0.0750062000000753}]} strokeWidth="0.254mm" />
<fabricationnotepath route={[{"x":1.1139931999999817,"y":0.0830071999998836},{"x":1.1139931999999817,"y":-0.06700520000003962},{"x":0.5139943999998877,"y":-0.06700520000003962},{"x":0.5139943999998877,"y":0.0830071999998836},{"x":1.1139931999999817,"y":0.0830071999998836}]} strokeWidth="0.254mm" />
<fabricationnotepath route={[{"x":0.88900000000001,"y":0.5080000000000382},{"x":0.88900000000001,"y":-0.49199799999996685},{"x":0.7389875999998594,"y":-0.49199799999996685},{"x":0.7389875999998594,"y":0.5080000000000382},{"x":0.88900000000001,"y":0.5080000000000382}]} strokeWidth="0.254mm" />
<courtyardoutline outline={[{"x":-1.7993999999999915,"y":1.0374000000000478},{"x":1.7993999999998778,"y":1.0374000000000478},{"x":1.7993999999998778,"y":-1.0120000000000573},{"x":-1.7993999999999915,"y":-1.0120000000000573},{"x":-1.7993999999999915,"y":1.0374000000000478}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C111695.obj?uuid=cb8fcea0fb704766bd72f1400ecee710",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C111695.step?uuid=cb8fcea0fb704766bd72f1400ecee710",
        pcbRotationOffset: 180,
        modelOriginPosition: { x: -0.000012700000070253736, y: -0.000012699999842880061, z: 0.050795 },
      }}
      {...restProps}
    />
  )
}