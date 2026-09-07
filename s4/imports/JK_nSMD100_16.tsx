import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["pin1"],
  pin2: ["pin2"]
} as const

export const JK_nSMD100_16 = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      symbol={
        <symbol>
          <schematicrect schX={0} schY={0} width={0.52} height={0.12} color="#880000" />
          <port name="pin1" pinNumber={1} aliases={["1"]} direction="left" schX={-0.4} schY={0} schStemLength={0.2} />
          <port name="pin2" pinNumber={2} aliases={["2"]} direction="right" schX={0.4} schY={0} schStemLength={0.2} />
          <schematicpath points={[{"x":-0.2,"y":0},{"x":0.2,"y":0}]} strokeColor="#8D2323" />
        </symbol>
      }
      supplierPartNumbers={{
  "jlcpcb": [
    "C369161"
  ]
}}
      manufacturerPartNumber="JK-nSMD100-16"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} pcbX="-1.445006mm" pcbY="0mm" width="1.1900916mm" height="1.7279874mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="1.445006mm" pcbY="0mm" width="1.1900916mm" height="1.7279874mm" shape="rect" />
<silkscreenpath route={[{"x":-0.9261856000000108,"y":1.0926064000000082},{"x":-2.1163026000000116,"y":1.0926064000000082}]} />
<silkscreenpath route={[{"x":0.926210999999995,"y":1.0926064000000082},{"x":2.1163026000000116,"y":1.0926064000000082}]} />
<silkscreenpath route={[{"x":-2.2687025999999975,"y":0.9402064000000081},{"x":-2.2687025999999975,"y":-0.9402063999999939}]} />
<silkscreenpath route={[{"x":2.2687025999999832,"y":0.9402064000000081},{"x":2.2687025999999832,"y":-0.9402063999999939}]} />
<silkscreenpath route={[{"x":-2.1163026000000116,"y":-1.092606399999994},{"x":-0.9261856000000108,"y":-1.092606399999994}]} />
<silkscreenpath route={[{"x":2.1163026000000116,"y":-1.092606399999994},{"x":0.926210999999995,"y":-1.092606399999994}]} />
<silkscreenpath route={[{"x":-1.4210854715202004e-14,"y":0},{"x":-0.08441074011676619,"y":0.2037855535998574},{"x":-0.11320167162334371,"y":0.422474390000005},{"x":-0.08441074011676619,"y":0.6411632264001383},{"x":0,"y":0.8449487799999957}]} />
<silkscreenpath route={[{"x":2.842170943040401e-14,"y":0},{"x":0.08441074011679461,"y":-0.20378555359984318},{"x":0.11320167162334371,"y":-0.42247438999999076},{"x":0.08441074011679461,"y":-0.6411632264001241},{"x":0,"y":-0.8449487799999957}]} />
<silkscreentext text="{NAME}" pcbX="0.0127mm" pcbY="2.0922mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-2.5105999999999966,"y":1.3422000000000054},{"x":2.5360000000000014,"y":1.3422000000000054},{"x":2.5360000000000014,"y":-1.3421999999999912},{"x":-2.5105999999999966,"y":-1.3421999999999912},{"x":-2.5105999999999966,"y":1.3422000000000054}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C369161.obj?uuid=7dbd95a5ee9a45949b72cb8147e267ff",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C369161.step?uuid=7dbd95a5ee9a45949b72cb8147e267ff",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0, y: -0.000012699999999199463, z: 0 },
      }}
      {...props}
    />
  )
}