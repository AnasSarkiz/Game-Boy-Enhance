import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["pin1"],
  pin2: ["SHUTDOWN"],
  pin3: ["HP_IN"],
  pin4: ["GND"],
  pin5: ["pin5"],
  pin6: ["pin6"],
  pin7: ["BYPASS"],
  pin8: ["pin8"],
  pin9: ["VDD"],
  pin10: ["pin10"]
} as const

const pinAttributes = {
  pin4: {requiresGround: true},
  pin9: {requiresPower: true}
} as const

export const LM4853MM_NOPB = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      supplierPartNumbers={{
  "jlcpcb": [
    "C2872995"
  ]
}}
      manufacturerPartNumber="LM4853MM/NOPB"
      footprint={<footprint>
        <smtpad portHints={["pin10"]} pcbX="-0.999998mm" pcbY="2.169922mm" width="0.2999994mm" height="1.1999976mm" radius="0.1499997mm" shape="pill" />
<smtpad portHints={["pin9"]} pcbX="-0.499872mm" pcbY="2.169922mm" width="0.2999994mm" height="1.1999976mm" radius="0.1499997mm" shape="pill" />
<smtpad portHints={["pin8"]} pcbX="0mm" pcbY="2.169922mm" width="0.2999994mm" height="1.1999976mm" radius="0.1499997mm" shape="pill" />
<smtpad portHints={["pin7"]} pcbX="0.500126mm" pcbY="2.169922mm" width="0.2999994mm" height="1.1999976mm" radius="0.1499997mm" shape="pill" />
<smtpad portHints={["pin6"]} pcbX="0.999998mm" pcbY="2.169922mm" width="0.2999994mm" height="1.1999976mm" radius="0.1499997mm" shape="pill" />
<smtpad portHints={["pin5"]} pcbX="0.999998mm" pcbY="-2.169922mm" width="0.2999994mm" height="1.1999976mm" radius="0.1499997mm" shape="pill" />
<smtpad portHints={["pin4"]} pcbX="0.500126mm" pcbY="-2.169922mm" width="0.2999994mm" height="1.1999976mm" radius="0.1499997mm" shape="pill" />
<smtpad portHints={["pin3"]} pcbX="0mm" pcbY="-2.169922mm" width="0.2999994mm" height="1.1999976mm" radius="0.1499997mm" shape="pill" />
<smtpad portHints={["pin2"]} pcbX="-0.499872mm" pcbY="-2.169922mm" width="0.2999994mm" height="1.1999976mm" radius="0.1499997mm" shape="pill" />
<smtpad portHints={["pin1"]} pcbX="-0.999998mm" pcbY="-2.169922mm" width="0.2999994mm" height="1.1999976mm" radius="0.1499997mm" shape="pill" />
<silkscreenpath route={[{"x":1.4999970000000076,"y":1.4999970000000076},{"x":1.4999970000000076,"y":-1.4999969999999792},{"x":1.3003276000000028,"y":-1.4999969999999792}]} />
<silkscreenpath route={[{"x":-1.3003275999999886,"y":-1.4999969999999792},{"x":-1.498599999999982,"y":-1.4999969999999792}]} />
<silkscreenpath route={[{"x":1.4999970000000076,"y":1.4999970000000076},{"x":1.3003276000000028,"y":1.4999970000000076}]} />
<silkscreenpath route={[{"x":-1.3003275999999886,"y":1.4999970000000076},{"x":-1.5239999999999867,"y":1.4999970000000076}]} />
<silkscreenpath route={[{"x":-1.5239999999999867,"y":1.4999970000000076},{"x":-1.5239999999999867,"y":0.5461000000000098}]} />
<silkscreenpath route={[{"x":-1.498599999999982,"y":-0.5460999999999956},{"x":-1.498599999999982,"y":-1.4999969999999792}]} />
<silkscreenpath route={[{"x":-1.5239999999999867,"y":0.546100000000024},{"x":-1.2895402517080612,"y":0.4941476461354881},{"x":-1.1000062512083844,"y":0.34667804487553155},{"x":-0.992015777098544,"y":0.13218217511875707},{"x":-0.9864324805502065,"y":-0.10789957645938841},{"x":-1.0843350488507042,"y":-0.3271836565047721},{"x":-1.2668088041020695,"y":-0.483304600921727},{"x":-1.498599999999982,"y":-0.5460999999999814}]} />
<silkscreentext text="{NAME}" pcbX="-0.0127mm" pcbY="3.6289mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-1.7739999999999867,"y":2.8789000000000016},{"x":1.7486000000000104,"y":2.8789000000000016},{"x":1.7486000000000104,"y":-3.1836999999999875},{"x":-1.7739999999999867,"y":-3.1836999999999875},{"x":-1.7739999999999867,"y":2.8789000000000016}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2872995.obj?uuid=1c7e720f22194d6cbb0a564f25af7214",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2872995.step?uuid=1c7e720f22194d6cbb0a564f25af7214",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0, y: 0, z: 0 },
      }}
      {...props}
    />
  )
}