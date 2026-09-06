import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["pin1"],
  pin2: ["GND1"],
  pin3: ["pin3"],
  pin4: ["GND2"]
} as const

const pinAttributes = {
  pin2: {requiresGround: true},
  pin4: {requiresGround: true}
} as const

export const CM4024M00008001 = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      symbol={
        <symbol>
          <port name="pin1" pinNumber={1} aliases={["1"]} direction="left" schX={-0.6} schY={-0.2} schStemLength={0.2} />
          <port name="pin3" pinNumber={3} aliases={["3"]} direction="right" schX={0.6} schY={0.2} schStemLength={0.2} />
          <port name="pin4" pinNumber={4} aliases={["GND2","GND"]} direction="left" schX={-0.6} schY={0.2} schStemLength={0.2} />
          <port name="pin2" pinNumber={2} aliases={["GND1","GND"]} direction="right" schX={0.6} schY={-0.2} schStemLength={0.2} />
          <schematicrect schX={0} schY={0} width={0.8} height={0.8} color="#880000" />
          <schematiccircle center={{ x: -0.3, y: -0.3 }} radius={0.03} color="#880000" isFilled fillColor="#880000" />
          <schematicpath points={[{"x":-0.1,"y":-0.14},{"x":-0.1,"y":0.14}]} strokeColor="#881100" />
          <schematicpath points={[{"x":0.1,"y":-0.14},{"x":0.1,"y":0.14}]} strokeColor="#881100" />
          <schematicpath points={[{"x":-0.4,"y":-0.2},{"x":-0.2,"y":-0.2},{"x":-0.2,"y":0},{"x":-0.1,"y":0}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.4,"y":0.2},{"x":0.2,"y":0.2},{"x":0.2,"y":0},{"x":0.1,"y":0}]} strokeColor="#880000" />
          <schematicrect schX={0} schY={0} width={0.08} height={0.28} color="#880000" />
        </symbol>
      }
      supplierPartNumbers={{
  "jlcpcb": [
    "C7294624"
  ]
}}
      manufacturerPartNumber="CM4024M00008001"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} pcbX="-0.94996mm" pcbY="-0.750062mm" width="1.1999976mm" height="1.0999978mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="0.94996mm" pcbY="-0.750062mm" width="1.1999976mm" height="1.0999978mm" shape="rect" />
<smtpad portHints={["pin3"]} pcbX="0.94996mm" pcbY="0.750062mm" width="1.1999976mm" height="1.0999978mm" shape="rect" />
<smtpad portHints={["pin4"]} pcbX="-0.94996mm" pcbY="0.750062mm" width="1.1999976mm" height="1.0999978mm" shape="rect" />
<silkscreenpath route={[{"x":-2.0066000000000486,"y":-0.20065999999997075},{"x":-2.0066000000000486,"y":-1.7576799999999366},{"x":-0.3505200000001878,"y":-1.7576799999999366}]} />
<silkscreenpath route={[{"x":-1.7786095999999816,"y":-1.5285973999998532},{"x":-1.7786095999999816,"y":1.528597399999967},{"x":1.7786095999999816,"y":1.528597399999967},{"x":1.7786095999999816,"y":-1.5285973999998532},{"x":-1.7786095999999816,"y":-1.5285973999998532}]} />
<silkscreentext text="{NAME}" pcbX="-0.1143mm" pcbY="2.524mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-2.2566000000000486,"y":1.774000000000001},{"x":2.02800000000002,"y":1.774000000000001},{"x":2.02800000000002,"y":-2.0026000000000295},{"x":-2.2566000000000486,"y":-2.0026000000000295},{"x":-2.2566000000000486,"y":1.774000000000001}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C7294624.obj?uuid=f88e6934b74b41a8bf87a127332ccf2b",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C7294624.step?uuid=f88e6934b74b41a8bf87a127332ccf2b",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: -0.000012700000070253736, y: 0, z: -0.01 },
      }}
      {...props}
    />
  )
}