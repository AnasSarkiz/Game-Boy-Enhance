import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["pin1"],
  pin2: ["pin2"],
  pin3: ["pin3"]
} as const

export const TC33X_2_503E = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      symbol={
        <symbol>
          <port name="pin2" pinNumber={2} aliases={["2"]} direction="up" schX={0} schY={0.4} schStemLength={0.2} />
          <schematiccircle center={{ x: -0.22, y: 0.06 }} radius={0.02} color="#A00000" />
          <schematicpath points={[{"x":0.04,"y":0.2},{"x":0,"y":0.12},{"x":-0.04,"y":0.2},{"x":0.04,"y":0.2}]} strokeColor="#880000" />
          <port name="pin1" pinNumber={1} aliases={["1"]} direction="left" schX={-0.4} schY={0} schStemLength={0.2} />
          <port name="pin3" pinNumber={3} aliases={["3"]} direction="right" schX={0.4} schY={0} schStemLength={0.2} />
          <schematicpath points={[{"x":0,"y":0.2},{"x":0,"y":0.12}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.18,"y":-0.08},{"x":-0.2,"y":0}]} strokeColor="#8D2323" />
          <schematicpath points={[{"x":-0.12,"y":0.08},{"x":-0.18,"y":-0.08}]} strokeColor="#8D2323" />
          <schematicpath points={[{"x":-0.08,"y":-0.08},{"x":-0.12,"y":0.08}]} strokeColor="#8D2323" />
          <schematicpath points={[{"x":-0.02,"y":0.08},{"x":-0.08,"y":-0.08}]} strokeColor="#8D2323" />
          <schematicpath points={[{"x":0.02,"y":-0.08},{"x":-0.02,"y":0.08}]} strokeColor="#8D2323" />
          <schematicpath points={[{"x":0.06,"y":0.08},{"x":0.02,"y":-0.08}]} strokeColor="#8D2323" />
          <schematicpath points={[{"x":0.12,"y":-0.08},{"x":0.06,"y":0.08}]} strokeColor="#8D2323" />
          <schematicpath points={[{"x":0.16,"y":0.08},{"x":0.12,"y":-0.08}]} strokeColor="#8D2323" />
          <schematicpath points={[{"x":0.2,"y":0},{"x":0.16,"y":0.08}]} strokeColor="#8D2323" />
        </symbol>
      }
      supplierPartNumbers={{
  "jlcpcb": [
    "C913246"
  ]
}}
      manufacturerPartNumber="TC33X-2-503E"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} pcbX="-0.9500108mm" pcbY="-1.67507285mm" width="1.1999976mm" height="1.1999976mm" shape="rect" />
<smtpad portHints={["pin3"]} pcbX="0.9500108mm" pcbY="-1.67507285mm" width="1.1999976mm" height="1.1999976mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="-0mm" pcbY="1.52507315mm" width="1.5999968mm" height="1.499997mm" shape="rect" />
<silkscreenpath route={[{"x":-0.1270000000000664,"y":-1.9069748499999832},{"x":0.1269999999999527,"y":-1.9069748499999832}]} />
<silkscreenpath route={[{"x":-1.5240000000001146,"y":1.9030251500000759},{"x":-1.5240000000001146,"y":-0.8438324500000363}]} />
<silkscreenpath route={[{"x":1.031138399999918,"y":1.9030251500000759},{"x":1.5239999999998872,"y":1.9030251500000759},{"x":1.5239999999998872,"y":-0.8438324500000363}]} />
<silkscreenpath route={[{"x":-1.5240000000001146,"y":1.9030251500000759},{"x":-1.0311384000000317,"y":1.9030251500000759}]} />
<silkscreencircle pcbX="-0mm" pcbY="-0.07512685mm" radius="0.523748mm" />
<silkscreencircle pcbX="-2.032mm" pcbY="-1.98012685mm" radius="0.127mm" />
<silkscreentext text="{NAME}" pcbX="-0.3048mm" pcbY="3.27132515mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-2.408999999999992,"y":2.5213251499999387},{"x":1.7993999999998778,"y":2.5213251499999387},{"x":1.7993999999998778,"y":-2.5252748500000735},{"x":-2.408999999999992,"y":-2.5252748500000735},{"x":-2.408999999999992,"y":2.5213251499999387}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C913246.obj?uuid=4c56b9abf9224e13bc01bee62ba62297",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C913246.step?uuid=4c56b9abf9224e13bc01bee62ba62297",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0, y: -0.020024149999953833, z: -0.1 },
      }}
      {...props}
    />
  )
}