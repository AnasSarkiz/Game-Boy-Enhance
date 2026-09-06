import type { InductorProps } from "@tscircuit/props"

export const XRIM252012S2R2MBCA = (props: Omit<InductorProps, "inductance">) => {
  return (
    <inductor
      inductance="2.2uH"
      supplierPartNumbers={{
  "jlcpcb": [
    "C22471111"
  ]
}}
      manufacturerPartNumber="XRIM252012S2R2MBCA"
      footprint={<footprint>
        <smtpad portHints={["pin2"]} pcbX="0.899922mm" pcbY="0mm" width="1.0999978mm" height="2.1999956mm" shape="rect" />
<smtpad portHints={["pin1"]} pcbX="-0.899922mm" pcbY="0mm" width="1.0999978mm" height="2.1999956mm" shape="rect" />
<silkscreenpath route={[{"x":-1.4986000000000104,"y":-1.2953999999999724},{"x":1.5013940000001185,"y":-1.2953999999999724}]} />
<silkscreenpath route={[{"x":-1.4986000000000104,"y":1.295400000000086},{"x":1.5013940000001185,"y":1.295400000000086}]} />
<silkscreentext text="{NAME}" pcbX="-0mm" pcbY="2.2954mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-1.7486000000000104,"y":1.545400000000086},{"x":1.7485999999998967,"y":1.545400000000086},{"x":1.7485999999998967,"y":-1.5453999999999724},{"x":-1.7486000000000104,"y":-1.5453999999999724},{"x":-1.7486000000000104,"y":1.545400000000086}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C22471111.obj?uuid=dfca0b435de34645b55006e00f483960",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C22471111.step?uuid=dfca0b435de34645b55006e00f483960",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0.00013970000009067007, y: 0, z: 0 },
      }}
      {...props}
    />
  )
}