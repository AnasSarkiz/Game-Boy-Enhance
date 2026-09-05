import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["pin1"],
  pin2: ["pin2"],
  pin3: ["pin3"],
  pin4: ["pin4"],
  pin5: ["pin5"],
  pin6: ["pin6"],
  pin7: ["pin7"],
  pin8: ["pin8"],
  pin9: ["pin9"],
  pin10: ["pin10"],
  pin11: ["pin11"],
  pin12: ["pin12"],
  pin13: ["pin13"],
  pin14: ["pin14"]
} as const

export const TLV9064IPWR = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      supplierPartNumbers={{
  "jlcpcb": [
    "C779410"
  ]
}}
      manufacturerPartNumber="TLV9064IPWR"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} pcbX="-1.949958mm" pcbY="-2.800096mm" width="0.3999992mm" height="1.6999966mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="-1.299972mm" pcbY="-2.800096mm" width="0.3999992mm" height="1.6999966mm" shape="rect" />
<smtpad portHints={["pin3"]} pcbX="-0.649986mm" pcbY="-2.800096mm" width="0.3999992mm" height="1.6999966mm" shape="rect" />
<smtpad portHints={["pin4"]} pcbX="0mm" pcbY="-2.800096mm" width="0.3999992mm" height="1.6999966mm" shape="rect" />
<smtpad portHints={["pin5"]} pcbX="0.649986mm" pcbY="-2.800096mm" width="0.3999992mm" height="1.6999966mm" shape="rect" />
<smtpad portHints={["pin6"]} pcbX="1.299972mm" pcbY="-2.800096mm" width="0.3999992mm" height="1.6999966mm" shape="rect" />
<smtpad portHints={["pin7"]} pcbX="1.949958mm" pcbY="-2.800096mm" width="0.3999992mm" height="1.6999966mm" shape="rect" />
<smtpad portHints={["pin8"]} pcbX="1.949958mm" pcbY="2.800096mm" width="0.3999992mm" height="1.6999966mm" shape="rect" />
<smtpad portHints={["pin9"]} pcbX="1.299972mm" pcbY="2.800096mm" width="0.3999992mm" height="1.6999966mm" shape="rect" />
<smtpad portHints={["pin10"]} pcbX="0.649986mm" pcbY="2.800096mm" width="0.3999992mm" height="1.6999966mm" shape="rect" />
<smtpad portHints={["pin11"]} pcbX="0mm" pcbY="2.800096mm" width="0.3999992mm" height="1.6999966mm" shape="rect" />
<smtpad portHints={["pin12"]} pcbX="-0.649986mm" pcbY="2.800096mm" width="0.3999992mm" height="1.6999966mm" shape="rect" />
<smtpad portHints={["pin13"]} pcbX="-1.299972mm" pcbY="2.800096mm" width="0.3999992mm" height="1.6999966mm" shape="rect" />
<smtpad portHints={["pin14"]} pcbX="-1.949958mm" pcbY="2.800096mm" width="0.3999992mm" height="1.6999966mm" shape="rect" />
<silkscreenpath route={[{"x":2.4999949999999984,"y":1.7432782000000202},{"x":2.4999949999999984,"y":-1.7401539999999898}]} />
<silkscreenpath route={[{"x":-2.5146000000000015,"y":0.6858000000000004},{"x":-2.5146000000000015,"y":1.7432782000000202}]} />
<silkscreenpath route={[{"x":-2.5146000000000015,"y":-1.6001999999999867},{"x":-2.5146000000000015,"y":-0.6857999999999862}]} />
<silkscreenpath route={[{"x":-2.5146000000000015,"y":-1.7401539999999898},{"x":2.4999949999999984,"y":-1.7401539999999898}]} />
<silkscreenpath route={[{"x":-2.5146000000000015,"y":1.7432782000000202},{"x":2.4999949999999984,"y":1.7432782000000202}]} />
<silkscreenpath route={[{"x":-2.5146000000000015,"y":0.6858000000000004},{"x":-2.2800426027520473,"y":0.6444411824873129},{"x":-2.0737762936569197,"y":0.525353256474375},{"x":-1.9206798308624684,"y":0.34289998171723823},{"x":-1.839218905095663,"y":0.11908791331384805},{"x":-1.839218905095663,"y":-0.11908791331383384},{"x":-1.9206798308624684,"y":-0.3428999817172098},{"x":-2.0737762936569197,"y":-0.5253532564743608},{"x":-2.2800426027520473,"y":-0.6444411824872986},{"x":-2.5146000000000015,"y":-0.6857999999999862}]} />
<silkscreencircle pcbX="-1.6299942mm" pcbY="-1.1100054mm" radius="0.199898mm" />
<silkscreentext text="{NAME}" pcbX="-0.0127mm" pcbY="4.6576mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-2.7646000000000015,"y":3.9076000000000164},{"x":2.739200000000011,"y":3.9076000000000164},{"x":2.739200000000011,"y":-4.059999999999974},{"x":-2.7646000000000015,"y":-4.059999999999974},{"x":-2.7646000000000015,"y":3.9076000000000164}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C779410.obj?uuid=5377177da492449fa1a3111d646cac17",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C779410.step?uuid=5377177da492449fa1a3111d646cac17",
        pcbRotationOffset: 90,
        modelOriginPosition: { x: -0.000012700000013410317, y: 0, z: -0.069083 },
      }}
      {...props}
    />
  )
}