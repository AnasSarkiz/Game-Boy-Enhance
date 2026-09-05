import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["pin1"],
  pin2: ["pin2"],
  pin3: ["pin3"],
  pin4: ["pin4"],
  pin5: ["pin5"],
  pin6: ["pin6"],
  pin7: ["pin7"],
  pin8: ["pin8"]
} as const

export const RC_ML08W331JT = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      symbol={
        <symbol>
          <port name="pin1" pinNumber={1} aliases={["1"]} direction="down" schX={-0.4} schY={-0.6} schStemLength={0.4} />
          <port name="pin2" pinNumber={2} aliases={["2"]} direction="down" schX={-0.2} schY={-0.6} schStemLength={0.4} />
          <port name="pin3" pinNumber={3} aliases={["3"]} direction="down" schX={0} schY={-0.6} schStemLength={0.4} />
          <port name="pin4" pinNumber={4} aliases={["4"]} direction="down" schX={0.2} schY={-0.6} schStemLength={0.4} />
          <port name="pin5" pinNumber={5} aliases={["5"]} direction="up" schX={0.2} schY={0.8} schStemLength={0.4} />
          <port name="pin6" pinNumber={6} aliases={["6"]} direction="up" schX={0} schY={0.8} schStemLength={0.4} />
          <port name="pin7" pinNumber={7} aliases={["7"]} direction="up" schX={-0.2} schY={0.8} schStemLength={0.4} />
          <port name="pin8" pinNumber={8} aliases={["8"]} direction="up" schX={-0.4} schY={0.8} schStemLength={0.4} />
          <schematicpath points={[{"x":0.2,"y":-0.2},{"x":0.2,"y":-0.08}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.6,"y":-0.2},{"x":0.4,"y":-0.2}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.6,"y":0.4},{"x":0.4,"y":0.4}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.4,"y":-0.2},{"x":-0.4,"y":-0.08}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0,"y":-0.2},{"x":0,"y":-0.08}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.6,"y":-0.2},{"x":-0.6,"y":0.4}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.2,"y":-0.2},{"x":-0.2,"y":-0.08}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.44,"y":-0.08},{"x":-0.44,"y":0.28}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.44,"y":-0.08},{"x":-0.36,"y":-0.08},{"x":-0.36,"y":0.28},{"x":-0.44,"y":0.28}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.24,"y":-0.08},{"x":-0.24,"y":0.28}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.24,"y":-0.08},{"x":-0.16,"y":-0.08},{"x":-0.16,"y":0.28},{"x":-0.24,"y":0.28}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.04,"y":-0.08},{"x":-0.04,"y":0.28}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.04,"y":-0.08},{"x":0.04,"y":-0.08},{"x":0.04,"y":0.28},{"x":-0.04,"y":0.28}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.16,"y":-0.08},{"x":0.16,"y":0.28}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.16,"y":-0.08},{"x":0.24,"y":-0.08},{"x":0.24,"y":0.28},{"x":0.16,"y":0.28}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.4,"y":0.28},{"x":-0.4,"y":0.4}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.2,"y":0.28},{"x":-0.2,"y":0.4}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0,"y":0.28},{"x":0,"y":0.4}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.2,"y":0.28},{"x":0.2,"y":0.4}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.4,"y":-0.2},{"x":0.4,"y":0.4}]} strokeColor="#880000" />
        </symbol>
      }
      supplierPartNumbers={{
  "jlcpcb": [
    "C172477"
  ]
}}
      manufacturerPartNumber="RC-ML08W331JT"
      footprint={<footprint>
        <smtpad portHints={["pin5"]} pcbX="1.199896mm" pcbY="0.7999984mm" width="0.6500114mm" height="0.7999984mm" shape="rect" />
<smtpad portHints={["pin4"]} pcbX="1.199896mm" pcbY="-0.7999984mm" width="0.6500114mm" height="0.7999984mm" shape="rect" />
<smtpad portHints={["pin6"]} pcbX="0.40005mm" pcbY="0.7999984mm" width="0.499999mm" height="0.7999984mm" shape="rect" />
<smtpad portHints={["pin3"]} pcbX="0.40005mm" pcbY="-0.7999984mm" width="0.499999mm" height="0.7999984mm" shape="rect" />
<smtpad portHints={["pin7"]} pcbX="-0.40005mm" pcbY="0.7999984mm" width="0.499999mm" height="0.7999984mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="-0.40005mm" pcbY="-0.7999984mm" width="0.499999mm" height="0.7999984mm" shape="rect" />
<smtpad portHints={["pin8"]} pcbX="-1.199896mm" pcbY="0.7999984mm" width="0.6500114mm" height="0.7999984mm" shape="rect" />
<smtpad portHints={["pin1"]} pcbX="-1.199896mm" pcbY="-0.7999984mm" width="0.6500114mm" height="0.7999984mm" shape="rect" />
<silkscreenpath route={[{"x":1.8695670000000035,"y":-0.45001179999999863},{"x":1.8695670000000035,"y":-1.4497811999999897},{"x":-1.870328999999991,"y":-1.450035200000002},{"x":-1.870328999999991,"y":-0.409905199999983}]} />
<silkscreenpath route={[{"x":-1.8699480000000008,"y":0.44996100000000183},{"x":-1.8699480000000008,"y":1.4697710000000086},{"x":1.8699480000000008,"y":1.4700250000000068},{"x":1.8699480000000008,"y":0.4297171999999989}]} />
<silkscreentext text="{NAME}" pcbX="-0.0127mm" pcbY="2.473073mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-2.1295999999999964,"y":1.7230729999999994},{"x":2.1041999999999987,"y":1.7230729999999994},{"x":2.1041999999999987,"y":-1.6979269999999929},{"x":-2.1295999999999964,"y":-1.6979269999999929},{"x":-2.1295999999999964,"y":1.7230729999999994}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C172477.obj?uuid=551b3dd0a237409fa823f51b33d3f6d1",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C172477.step?uuid=551b3dd0a237409fa823f51b33d3f6d1",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0, y: 0, z: 0 },
      }}
      {...props}
    />
  )
}