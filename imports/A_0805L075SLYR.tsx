import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["pin1"],
  pin2: ["pin2"]
} as const

export const A_0805L075SLYR = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      symbol={
        <symbol>
          <port name="pin2" pinNumber={2} aliases={["2"]} direction="right" schX={0.4} schY={0} schStemLength={0.2} />
          <port name="pin1" pinNumber={1} aliases={["1"]} direction="left" schX={-0.6} schY={0} schStemLength={0.2} />
          <schematicpath points={[{"x":0.1,"y":0},{"x":0.2,"y":0}]} strokeColor="#880000" />
          <schematicpath svgPath="M -0.3 0 C -0.2 0.2 -0.1 0 -0.1 0 C 0 -0.2 0.1 0 0.1 0" strokeColor="#880000" />
          <schematicpath points={[{"x":-0.4,"y":0},{"x":-0.3,"y":0}]} strokeColor="#880000" />
        </symbol>
      }
      supplierPartNumbers={{
  "jlcpcb": [
    "C207023"
  ]
}}
      manufacturerPartNumber="0805L075SLYR"
      footprint={<footprint>
        <smtpad portHints={["pin2"]} pcbX="1.0999978mm" pcbY="0mm" width="0.999998mm" height="1.499997mm" shape="rect" />
<smtpad portHints={["pin1"]} pcbX="-1.0999978mm" pcbY="0mm" width="0.999998mm" height="1.499997mm" shape="rect" />
<silkscreenpath route={[{"x":-2.0590002000001277,"y":0.7619999999999436},{"x":-2.0590002000001277,"y":-0.7620000000000573}]} />
<silkscreenpath route={[{"x":2.0590001999999004,"y":0.7619999999999436},{"x":2.0590001999999004,"y":-0.7620000000000573}]} />
<silkscreenpath route={[{"x":1.77800000000002,"y":1.0160000000000764},{"x":0.5079999999999245,"y":1.0160000000000764}]} />
<silkscreenpath route={[{"x":-1.7780000000001337,"y":1.0160000000000764},{"x":-0.5446014000001469,"y":1.0160000000000764}]} />
<silkscreenpath route={[{"x":-0.5080000000000382,"y":-1.0159999999999627},{"x":-1.7780000000001337,"y":-1.0159999999999627}]} />
<silkscreenpath route={[{"x":0.5079999999999245,"y":-1.0159999999999627},{"x":1.77800000000002,"y":-1.0159999999999627}]} />
<silkscreenpath route={[{"x":0,"y":0},{"x":-0.16497783942099886,"y":-0.09524999999996453},{"x":-0.16497783942099886,"y":-0.2857499999998936},{"x":0,"y":-0.3810000000000855}]} />
<silkscreenpath route={[{"x":0,"y":0},{"x":0.16497783942099886,"y":0.09525000000007822},{"x":0.16497783942099886,"y":0.2857500000000073},{"x":0,"y":0.3809999999999718}]} />
<silkscreentext text="{NAME}" pcbX="0mm" pcbY="2.016mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-2.307399999999916,"y":1.2660000000000764},{"x":2.3074000000000296,"y":1.2660000000000764},{"x":2.3074000000000296,"y":-1.2659999999999627},{"x":-2.307399999999916,"y":-1.2659999999999627},{"x":-2.307399999999916,"y":1.2660000000000764}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C207023.obj?uuid=c1f1754ff6184d2bbcbdd91af271b895",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C207023.step?uuid=c1f1754ff6184d2bbcbdd91af271b895",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: -0.000012699999842880061, y: 0, z: 0 },
      }}
      {...props}
    />
  )
}