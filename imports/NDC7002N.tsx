import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["pin1"],
  pin2: ["pin2"],
  pin3: ["pin3"],
  pin4: ["pin4"],
  pin5: ["pin5"],
  pin6: ["pin6"]
} as const

export const NDC7002N = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      symbol={
        <symbol>
          <schematiccircle center={{ x: 0.2, y: -0.22 }} radius={0.02} color="#8D2323" isFilled fillColor="#8D2323" />
          <schematiccircle center={{ x: 0.2, y: 0.22 }} radius={0.02} color="#8D2323" isFilled fillColor="#8D2323" />
          <schematicpath points={[{"x":-0.1,"y":0.3},{"x":-0.1,"y":-0.3}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.04,"y":-0.22},{"x":0.2,"y":-0.22}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.04,"y":-0.14},{"x":-0.04,"y":-0.3}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.04,"y":0.08},{"x":-0.04,"y":-0.08}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.04,"y":0.3},{"x":-0.04,"y":0.14}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.34,"y":0.04},{"x":0.46,"y":0.04}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.04,"y":0.22},{"x":0.2,"y":0.22},{"x":0.2,"y":0.5}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.06,"y":0},{"x":0.2,"y":0},{"x":0.2,"y":-0.5}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.04,"y":0},{"x":0.06,"y":0.04},{"x":0.06,"y":-0.04},{"x":-0.04,"y":0},{"x":-0.04,"y":0}]} strokeColor="#880000" isFilled fillColor="#880000" />
          <schematicpath points={[{"x":0.2,"y":-0.22},{"x":0.4,"y":-0.22},{"x":0.4,"y":0.22},{"x":0.2,"y":0.22}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.34,"y":-0.06},{"x":0.46,"y":-0.06},{"x":0.4,"y":0.04},{"x":0.34,"y":-0.06}]} strokeColor="#880000" />
          <port name="pin1" pinNumber={1} aliases={["1"]} direction="left" schX={-0.4} schY={-0.3} schStemLength={0.3} />
          <port name="pin5" pinNumber={5} aliases={["5"]} direction="down" schX={0.2} schY={-0.7} schStemLength={0.2} />
          <port name="pin6" pinNumber={6} aliases={["6"]} direction="up" schX={0.2} schY={0.7} schStemLength={0.2} />
        </symbol>
      }
      supplierPartNumbers={{
  "jlcpcb": [
    "C114648"
  ]
}}
      manufacturerPartNumber="NDC7002N"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} pcbX="-0.94996mm" pcbY="-1.149096mm" width="0.532003mm" height="1.072007mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="0mm" pcbY="-1.149096mm" width="0.532003mm" height="1.072007mm" shape="rect" />
<smtpad portHints={["pin3"]} pcbX="0.94996mm" pcbY="-1.149096mm" width="0.532003mm" height="1.072007mm" shape="rect" />
<smtpad portHints={["pin4"]} pcbX="0.94996mm" pcbY="1.149096mm" width="0.532003mm" height="1.072007mm" shape="rect" />
<smtpad portHints={["pin5"]} pcbX="0mm" pcbY="1.149096mm" width="0.532003mm" height="1.072007mm" shape="rect" />
<smtpad portHints={["pin6"]} pcbX="-0.94996mm" pcbY="1.149096mm" width="0.532003mm" height="1.072007mm" shape="rect" />
<silkscreenpath route={[{"x":1.5391891999998961,"y":-0.8892031999998835},{"x":1.5391891999998961,"y":0.8892031999999972}]} />
<silkscreenpath route={[{"x":-1.5391892000000098,"y":-0.8892031999998835},{"x":-1.5391892000000098,"y":0.8892031999999972}]} />
<silkscreencircle pcbX="-1.668272mm" pcbY="-1.301496mm" radius="0.150114mm" />
<silkscreentext text="{NAME}" pcbX="-0.1524mm" pcbY="2.6764mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-2.078800000000001,"y":1.9264000000000578},{"x":1.7739999999998872,"y":1.9264000000000578},{"x":1.7739999999998872,"y":-2.0279999999999063},{"x":-2.078800000000001,"y":-2.0279999999999063},{"x":-2.078800000000001,"y":1.9264000000000578}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C114648.obj?uuid=229b69761e2c45dba6a83d8866dec72d",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C114648.step?uuid=229b69761e2c45dba6a83d8866dec72d",
        pcbRotationOffset: 90,
        modelOriginPosition: { x: -0.000012700000070253736, y: 0.000012700000070253736, z: -0.048939 },
      }}
      {...props}
    />
  )
}