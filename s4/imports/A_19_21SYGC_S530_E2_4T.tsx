import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["C"],
  pin2: ["A"]
} as const

export const A_19_21SYGC_S530_E2_4T = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      symbol={
        <symbol>
          <schematicpath svgPath="M -0.32 0.26 L -0.24 0.22 L -0.28 0.18 Z" strokeColor="#880000" />
          <schematicpath svgPath="M -0.24 0.34 L -0.16 0.3 L -0.2 0.26 Z" strokeColor="#880000" />
          <schematicpath points={[{"x":-0.18,"y":0.12},{"x":-0.26,"y":0.2}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.1,"y":0.2},{"x":-0.18,"y":0.28}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.1,"y":0},{"x":-0.2,"y":0}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.2,"y":0},{"x":0.1,"y":0}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.1,"y":0.14},{"x":-0.1,"y":-0.14}]} strokeColor="#880000" />
          <schematicpath svgPath="M 0.1 0.14 L -0.1 0 L 0.1 -0.14 Z" strokeColor="#880000" />
          <port name="pin1" pinNumber={1} aliases={["C"]} direction="left" schX={-0.4} schY={0} schStemLength={0.2} />
          <port name="pin2" pinNumber={2} aliases={["A"]} direction="right" schX={0.4} schY={0} schStemLength={0.2} />
        </symbol>
      }
      supplierPartNumbers={{
  "jlcpcb": [
    "C2986011"
  ]
}}
      manufacturerPartNumber="19-21SYGC/S530-E2/4T"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} pcbX="0.8509mm" pcbY="0mm" width="0.7999984mm" height="0.7999984mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="-0.8509mm" pcbY="0mm" width="0.7999984mm" height="0.7999984mm" shape="rect" />
<silkscreenpath route={[{"x":1.7653000000000105,"y":-0.8636000000000053},{"x":1.7653000000000105,"y":0.8636000000000053}]} />
<silkscreenpath route={[{"x":1.7653000000000105,"y":0.8636000000000053},{"x":0.2921000000000049,"y":0.8636000000000053}]} />
<silkscreenpath route={[{"x":1.7653000000000105,"y":-0.8636000000000053},{"x":0.2921000000000049,"y":-0.8636000000000053}]} />
<silkscreenpath route={[{"x":-0.2920999999999907,"y":0.8636000000000053},{"x":-1.4604999999999961,"y":0.8636000000000053}]} />
<silkscreenpath route={[{"x":-0.31749999999999545,"y":-0.8636000000000053},{"x":-1.4604999999999961,"y":-0.8636000000000053}]} />
<silkscreenpath route={[{"x":-1.4604999999999961,"y":-0.8636000000000053},{"x":-1.8160999999999916,"y":-0.5079999999999956},{"x":-1.8160999999999916,"y":0.5080000000000098},{"x":-1.4604999999999961,"y":0.8636000000000053}]} />
<silkscreenpath route={[{"x":0.07620000000000005,"y":-0.406400000000005},{"x":0.07620000000000005,"y":0.3810000000000002}]} />
<silkscreenpath route={[{"x":0.07620000000000005,"y":-0.007950200000010454},{"x":-0.09916159999998797,"y":-0.007950200000010454}]} />
<silkscreentext text="{NAME}" pcbX="-0.0254mm" pcbY="1.8636mm" anchorAlignment="center" fontSize="1mm" />
<fabricationnotepath route={[{"x":0.6603999999999957,"y":0.1016000000000048},{"x":1.3208000000000055,"y":0.1016000000000048},{"x":1.3208000000000055,"y":-0.05079999999999529},{"x":0.6603999999999957,"y":-0.05079999999999529},{"x":0.6603999999999957,"y":0.1016000000000048}]} strokeWidth="0.254mm" />
<fabricationnotepath route={[{"x":0.9355582000000027,"y":-0.2751581999999928},{"x":0.9355582000000027,"y":0.38524180000000285},{"x":1.0879582000000028,"y":0.38524180000000285},{"x":1.0879582000000028,"y":-0.2751581999999928},{"x":0.9355582000000027,"y":-0.2751581999999928}]} strokeWidth="0.254mm" />
<fabricationnotepath route={[{"x":-1.1933427999999964,"y":0.04963159999999789},{"x":-0.5329428000000007,"y":0.04963159999999789},{"x":-0.5329428000000007,"y":-0.10276839999998799},{"x":-1.1933427999999964,"y":-0.10276839999998799},{"x":-1.1933427999999964,"y":0.04963159999999789}]} strokeWidth="0.254mm" />
<courtyardoutline outline={[{"x":-2.0660999999999916,"y":1.1136000000000053},{"x":2.0153000000000105,"y":1.1136000000000053},{"x":2.0153000000000105,"y":-1.1136000000000053},{"x":-2.0660999999999916,"y":-1.1136000000000053},{"x":-2.0660999999999916,"y":1.1136000000000053}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2986011.obj?uuid=6f130ed341a94a9faf4a4c2e249f3fd3",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2986011.step?uuid=6f130ed341a94a9faf4a4c2e249f3fd3",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0, y: 0, z: -0.01 },
      }}
      {...props}
    />
  )
}