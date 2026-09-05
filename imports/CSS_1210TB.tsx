import type { SwitchProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["pin1"],
  pin2: ["pin2"],
  pin3: ["pin3"]
} as const

export const CSS_1210TB = (props: SwitchProps) => {
  const { name = "SW1", ...restProps } = props

  return (
    <switch
      name={name}
      pinLabels={pinLabels}
      supplierPartNumbers={{
  "jlcpcb": [
    "C2921710"
  ]
}}
      manufacturerPartNumber="CSS-1210TB"
      footprint={<footprint>
        <hole pcbX="3.150108mm" pcbY="-2.27502085mm" diameter="0.9000236mm" />
<hole pcbX="-3.150108mm" pcbY="-2.27502085mm" diameter="0.9000236mm" />
<smtpad portHints={["pin3"]} pcbX="0.999998mm" pcbY="1.47503515mm" width="0.999998mm" height="2.499995mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="-0.999998mm" pcbY="1.47503515mm" width="0.999998mm" height="2.499995mm" shape="rect" />
<smtpad portHints={["pin1"]} pcbX="-2.999994mm" pcbY="1.47503515mm" width="0.999998mm" height="2.499995mm" shape="rect" />
<silkscreenpath route={[{"x":4.34418740000001,"y":0.3452431500001012},{"x":4.34418740000001,"y":-2.654954050000015},{"x":-0.2989580000000842,"y":-2.6545222500001273},{"x":-0.2989580000000842,"y":-4.654975449999938},{"x":-0.9949180000000979,"y":-4.654950050000025},{"x":-1.6146525999999994,"y":-4.654950050000025},{"x":-1.6146525999999994,"y":-2.6545222500001273},{"x":-4.550918000000138,"y":-2.6545222500001273},{"x":-4.550918000000138,"y":0.35032315000000835}]} />
<silkscreenpath route={[{"x":-3.731133,"y":0.3452177499999607},{"x":-4.550918000000138,"y":0.3452177499999607}]} />
<silkscreenpath route={[{"x":-1.7311369999999897,"y":0.3452177499999607},{"x":-2.268855000000144,"y":0.3452177499999607}]} />
<silkscreenpath route={[{"x":0.2688589999999067,"y":0.3452177499999607},{"x":-0.2688590000000204,"y":0.3452177499999607}]} />
<silkscreenpath route={[{"x":4.344161999999983,"y":0.3452177499999607},{"x":1.731136999999876,"y":0.3452177499999607}]} />
<silkscreentext text="{NAME}" pcbX="-0.066294mm" pcbY="3.71963515mm" anchorAlignment="center" fontSize="1mm" />
<fabricationnotepath route={[{"x":-1.6349980000001096,"y":-2.588964850000025},{"x":-1.6349980000001096,"y":-4.620964850000064},{"x":-0.23799800000006144,"y":-4.620964850000064},{"x":-0.23799800000006144,"y":-2.588964850000025},{"x":-1.6349980000001096,"y":-2.588964850000025}]} strokeWidth="0.254mm" />
<fabricationnotepath route={[{"x":-3.474999400000115,"y":-2.3749698499999568},{"x":-3.474999400000115,"y":-2.174970250000001},{"x":-2.8249880000000758,"y":-2.174970250000001},{"x":-2.8249880000000758,"y":-2.3749698499999568},{"x":-3.474999400000115,"y":-2.3749698499999568}]} strokeWidth="0.254mm" />
<fabricationnotepath route={[{"x":2.825216599999976,"y":-2.3749698499999568},{"x":2.825216599999976,"y":-2.174970250000001},{"x":3.475227999999902,"y":-2.174970250000001},{"x":3.475227999999902,"y":-2.3749698499999568},{"x":2.825216599999976,"y":-2.3749698499999568}]} strokeWidth="0.254mm" />
<courtyardoutline outline={[{"x":-4.799394000000007,"y":2.9696351500000446},{"x":4.666805999999951,"y":2.9696351500000446},{"x":4.666805999999951,"y":-4.921764850000045},{"x":-4.799394000000007,"y":-4.921764850000045},{"x":-4.799394000000007,"y":2.9696351500000446}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2921710.obj?uuid=e6870ee571e74bea9c692e16cd3450b2",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2921710.step?uuid=e6870ee571e74bea9c692e16cd3450b2",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0, y: 1.282953950000016, z: -1.7999952000000001 },
      }}
      {...restProps}
    />
  )
}