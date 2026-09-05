import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["pin1"],
  pin2: ["pin2"],
  pin3: ["pin3"],
  pin4: ["pin4"],
  pin5: ["pin5"],
  pin6: ["pin6"]
} as const

export const ACM2520_801_3P_T002 = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      symbol={
        <symbol>
          <schematicpath svgPath="M -0.16 -0.4 A 0.06 0.04 0 0 1 -0.28 -0.4" strokeColor="#880000" />
          <schematicpath svgPath="M 0.08 -0.4 A 0.06 0.04 0 0 1 -0.04 -0.4" strokeColor="#880000" />
          <schematicpath svgPath="M 0.32 -0.4 A 0.06 0.04 0 0 1 0.2 -0.4" strokeColor="#880000" />
          <schematicpath svgPath="M -0.04 -0.4 A 0.06 0.04 0 0 1 -0.16 -0.4" strokeColor="#880000" />
          <schematicpath svgPath="M 0.2 -0.4 A 0.06 0.04 0 0 1 0.08 -0.4" strokeColor="#880000" />
          <schematicpath svgPath="M -0.16 0 A 0.06 0.04 0 0 1 -0.28 0" strokeColor="#880000" />
          <schematicpath svgPath="M 0.08 0 A 0.06 0.04 0 0 1 -0.04 0" strokeColor="#880000" />
          <schematicpath svgPath="M 0.32 0 A 0.06 0.04 0 0 1 0.2 0" strokeColor="#880000" />
          <schematicpath svgPath="M -0.04 0 A 0.06 0.04 0 0 1 -0.16 0" strokeColor="#880000" />
          <schematicpath svgPath="M 0.2 0 A 0.06 0.04 0 0 1 0.08 0" strokeColor="#880000" />
          <schematicpath points={[{"x":-0.28,"y":0.16},{"x":0.32,"y":0.16}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.28,"y":0.1},{"x":0.32,"y":0.1}]} strokeColor="#880000" />
          <port name="pin1" pinNumber={1} aliases={["1"]} direction="left" schX={-0.8} schY={0.4} schStemLength={0.4} />
          <port name="pin2" pinNumber={2} aliases={["2"]} direction="left" schX={-0.8} schY={0} schStemLength={0.4} />
          <port name="pin3" pinNumber={3} aliases={["3"]} direction="left" schX={-0.8} schY={-0.4} schStemLength={0.4} />
          <port name="pin4" pinNumber={4} aliases={["4"]} direction="right" schX={0.8} schY={-0.4} schStemLength={0.4} />
          <schematicpath points={[{"x":-0.28,"y":0.4},{"x":-0.4,"y":0.4}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.32,"y":0.4},{"x":0.4,"y":0.4}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.28,"y":0},{"x":-0.4,"y":0}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.32,"y":0},{"x":0.4,"y":0}]} strokeColor="#880000" />
          <schematicrect schX={0} schY={0} width={0.8} height={1.2} color="#880000" />
          <schematicpath svgPath="M -0.16 0.4 A 0.06 0.04 0 0 1 -0.28 0.4" strokeColor="#880000" />
          <schematicpath svgPath="M 0.08 0.4 A 0.06 0.04 0 0 1 -0.04 0.4" strokeColor="#880000" />
          <schematicpath svgPath="M 0.32 0.4 A 0.06 0.04 0 0 1 0.2 0.4" strokeColor="#880000" />
          <schematicpath svgPath="M -0.04 0.4 A 0.06 0.04 0 0 1 -0.16 0.4" strokeColor="#880000" />
          <schematicpath svgPath="M 0.2 0.4 A 0.06 0.04 0 0 1 0.08 0.4" strokeColor="#880000" />
          <schematicpath points={[{"x":-0.3,"y":0.54},{"x":0.3,"y":0.54}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.3,"y":0.48},{"x":0.3,"y":0.48}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.3,"y":-0.24},{"x":0.3,"y":-0.24}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.3,"y":-0.3},{"x":0.3,"y":-0.3}]} strokeColor="#880000" />
          <schematicpath points={[{"x":-0.28,"y":-0.4},{"x":-0.4,"y":-0.4}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.32,"y":-0.4},{"x":0.4,"y":-0.4}]} strokeColor="#880000" />
          <schematiccircle center={{ x: -0.35, y: 0.47 }} radius={0.01} color="#880000" />
          <schematiccircle center={{ x: -0.35, y: 0.07 }} radius={0.01} color="#880000" />
          <schematiccircle center={{ x: -0.35, y: -0.29 }} radius={0.01} color="#880000" />
          <port name="pin5" pinNumber={5} aliases={["5"]} direction="right" schX={0.8} schY={0} schStemLength={0.4} />
          <port name="pin6" pinNumber={6} aliases={["6"]} direction="right" schX={0.8} schY={0.4} schStemLength={0.4} />
        </symbol>
      }
      supplierPartNumbers={{
  "jlcpcb": [
    "C76578"
  ]
}}
      manufacturerPartNumber="ACM2520-801-3P-T002"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} pcbX="-0.649986mm" pcbY="-1.149985mm" width="0.350012mm" height="0.7999984mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="0mm" pcbY="-1.149985mm" width="0.350012mm" height="0.7999984mm" shape="rect" />
<smtpad portHints={["pin3"]} pcbX="0.649986mm" pcbY="-1.149985mm" width="0.350012mm" height="0.7999984mm" shape="rect" />
<smtpad portHints={["pin4"]} pcbX="0.649986mm" pcbY="1.149985mm" width="0.350012mm" height="0.7999984mm" shape="rect" />
<smtpad portHints={["pin5"]} pcbX="0mm" pcbY="1.149985mm" width="0.350012mm" height="0.7999984mm" shape="rect" />
<smtpad portHints={["pin6"]} pcbX="-0.649986mm" pcbY="1.149985mm" width="0.350012mm" height="0.7999984mm" shape="rect" />
<silkscreenpath route={[{"x":-0.999998000000005,"y":-1.2500102000000197},{"x":-0.999998000000005,"y":1.249984799999993}]} />
<silkscreenpath route={[{"x":0.9999979999998914,"y":1.249984799999993},{"x":0.9999979999998914,"y":-1.2500102000000197}]} />
<silkscreencircle pcbX="-0.6100064mm" pcbY="-0.4299966mm" radius="0.100076mm" />
<silkscreentext text="{NAME}" pcbX="-0.0254mm" pcbY="2.549527mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-1.291400000000067,"y":1.7995270000001256},{"x":1.2406000000000859,"y":1.7995270000001256},{"x":1.2406000000000859,"y":-1.799272999999971},{"x":-1.291400000000067,"y":-1.799272999999971},{"x":-1.291400000000067,"y":1.7995270000001256}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C76578.obj?uuid=c09306f78a674865a8ba119b578d5a5f",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C76578.step?uuid=c09306f78a674865a8ba119b578d5a5f",
        pcbRotationOffset: 90,
        modelOriginPosition: { x: -0.0002667000001110864, y: 0, z: -0.81 },
      }}
      {...props}
    />
  )
}