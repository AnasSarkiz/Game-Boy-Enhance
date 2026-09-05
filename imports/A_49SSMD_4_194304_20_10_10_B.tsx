import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["pin1"],
  pin2: ["GND"]
} as const

const pinAttributes = {
  pin2: {requiresGround: true}
} as const

export const A_49SSMD_4_194304_20_10_10_B = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      symbol={
        <symbol>
          <schematicrect schX={0} schY={0} width={0.08} height={0.28} color="#880000" />
          <schematicpath points={[{"x":0.1,"y":-0.14},{"x":0.1,"y":0.14}]} strokeColor="#881100" />
          <schematicpath points={[{"x":-0.1,"y":-0.14},{"x":-0.1,"y":0.14}]} strokeColor="#881100" />
          <port name="pin2" pinNumber={2} aliases={["GND"]} direction="right" schX={0.4} schY={0} schStemLength={0.3} />
          <port name="pin1" pinNumber={1} aliases={["1"]} direction="left" schX={-0.4} schY={0} schStemLength={0.3} />
        </symbol>
      }
      supplierPartNumbers={{
  "jlcpcb": [
    "C718663"
  ]
}}
      manufacturerPartNumber="49SSMD-4.194304-20-10-10/B"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} pcbX="-4.55295mm" pcbY="0mm" width="5.499989mm" height="1.2999974mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="4.55295mm" pcbY="0mm" width="5.499989mm" height="1.2999974mm" shape="rect" />
<silkscreenpath route={[{"x":5.699988600000211,"y":0.6624066000000539},{"x":5.7150000000001455,"y":2.4130000000001246},{"x":-5.714999999999918,"y":2.4130000000001246},{"x":-5.69998859999987,"y":0.6624066000000539}]} />
<silkscreenpath route={[{"x":-5.69998859999987,"y":-0.6624065999999402},{"x":-5.714999999999918,"y":-2.4129999999998972},{"x":5.7150000000001455,"y":-2.4129999999998972},{"x":5.699988600000211,"y":-0.6624065999999402}]} />
<silkscreenpath route={[{"x":5.699988600000211,"y":0.6624066000000539},{"x":5.7150000000001455,"y":2.4130000000001246},{"x":-5.714999999999918,"y":2.4130000000001246},{"x":-5.69998859999987,"y":0.6624066000000539}]} />
<silkscreenpath route={[{"x":-5.69998859999987,"y":-0.6624065999999402},{"x":-5.714999999999918,"y":-2.4129999999998972},{"x":5.7150000000001455,"y":-2.4129999999998972},{"x":5.699988600000211,"y":-0.6624065999999402}]} />
<silkscreentext text="{NAME}" pcbX="-0.010414mm" pcbY="3.4017478mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-7.562913999999864,"y":2.6517478000000665},{"x":7.542086000000154,"y":2.6517478000000665},{"x":7.542086000000154,"y":-2.699652199999832},{"x":-7.562913999999864,"y":-2.699652199999832},{"x":-7.562913999999864,"y":2.6517478000000665}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C718663.obj?uuid=f0978b2903244298b5438358622284f0",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C718663.step?uuid=f0978b2903244298b5438358622284f0",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0.000012699999842880061, y: 0, z: -0.01 },
      }}
      {...props}
    />
  )
}