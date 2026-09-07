import type { CapacitorProps } from "@tscircuit/props"

export const EEEFT1A221AP = (props: Omit<CapacitorProps, "capacitance">) => {
  const { name = "C1", ...restProps } = props

  return (
    <capacitor
      name={name}
      capacitance="220uF"
      supplierPartNumbers={{
  "jlcpcb": [
    "C401764"
  ]
}}
      manufacturerPartNumber="EEEFT1A221AP"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} pcbX="-2.670048mm" pcbY="0mm" width="3.499993mm" height="1.1999976mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="2.670048mm" pcbY="0mm" width="3.499993mm" height="1.1999976mm" shape="rect" />
<silkscreenpath route={[{"x":3.3556194000000232,"y":-0.7392669999999271},{"x":3.3756599999999253,"y":-3.3756599999999253},{"x":-1.981200000000058,"y":-3.3756599999999253},{"x":-3.375660000000039,"y":-1.981200000000058},{"x":-3.3622996000000285,"y":-0.6857999999998583}]} />
<silkscreenpath route={[{"x":3.369487799999888,"y":0.7076948000001266},{"x":3.376168000000007,"y":3.376168000000007},{"x":-1.9800316000000748,"y":3.376168000000007},{"x":-3.376168000000007,"y":1.9800315999999611},{"x":-3.376168000000007,"y":0.685799999999972}]} />
<silkscreentext text="{NAME}" pcbX="0mm" pcbY="4.3782mm" anchorAlignment="center" fontSize="1mm" />
<fabricationnotepath route={[{"x":3.102000399999838,"y":0.09900920000006863},{"x":3.102000399999838,"y":-0.09900919999995494},{"x":2.310002999999938,"y":-0.09900919999995494},{"x":2.310002999999938,"y":0.09900920000006863},{"x":3.102000399999838,"y":0.09900920000006863}]} strokeWidth="0.254mm" />
<fabricationnotepath route={[{"x":-3.1020003999999517,"y":0.09900920000006863},{"x":-3.1020003999999517,"y":-0.09900919999995494},{"x":-2.3100030000000515,"y":-0.09900919999995494},{"x":-2.3100030000000515,"y":0.09900920000006863},{"x":-3.1020003999999517,"y":0.09900920000006863}]} strokeWidth="0.254mm" />
<fabricationnotepath route={[{"x":-2.8100020000001678,"y":0.6599935999998934},{"x":-2.8100020000001678,"y":-0.6599935999998934},{"x":-2.6120090000000573,"y":-0.6599935999998934},{"x":-2.6120090000000573,"y":0.6599935999998934},{"x":-2.8100020000001678,"y":0.6599935999998934}]} strokeWidth="0.254mm" />
<courtyardoutline outline={[{"x":-4.669599999999946,"y":3.6282000000001062},{"x":4.6696000000000595,"y":3.6282000000001062},{"x":4.6696000000000595,"y":-3.6281999999999925},{"x":-4.669599999999946,"y":-3.6281999999999925},{"x":-4.669599999999946,"y":3.6282000000001062}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C401764.obj?uuid=6cb1ec5759f6404189e20b90556867d6",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C401764.step?uuid=6cb1ec5759f6404189e20b90556867d6",
        pcbRotationOffset: 180,
        modelOriginPosition: { x: 0, y: -0.000012700000070253736, z: -0.05 },
      }}
      {...restProps}
    />
  )
}