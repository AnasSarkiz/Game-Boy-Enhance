import type { LedProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["cathode","neg"],
  pin2: ["anode","pos"]
} as const

export const A_150060VS75000 = (props: LedProps) => {
  const { name = "LED1", ...restProps } = props

  return (
    <led
      name={name}
      pinLabels={pinLabels}
      supplierPartNumbers={{
  "jlcpcb": [
    "C6848499"
  ]
}}
      manufacturerPartNumber="150060VS75000"
      footprint={<footprint>
        <smtpad portHints={["pin1","cathode","neg"]} pcbX="-0.750062mm" pcbY="0mm" width="0.7999984mm" height="0.7999984mm" shape="rect" />
<smtpad portHints={["pin2","anode","pos"]} pcbX="0.750062mm" pcbY="0mm" width="0.7999984mm" height="0.7999984mm" shape="rect" />
<silkscreenpath route={[{"x":-0.299999400000047,"y":0.6999986000000717},{"x":-1.3999972000001435,"y":0.6999986000000717},{"x":-1.6999966000000768,"y":0.39999919999991107},{"x":-1.6999966000000768,"y":-0.39999919999991107},{"x":-1.3999972000001435,"y":-0.6999985999999581}]} />
<silkscreenpath route={[{"x":-1.3999972000001435,"y":-0.6999985999999581},{"x":-0.299999400000047,"y":-0.6999985999999581}]} />
<silkscreenpath route={[{"x":0.20065999999997075,"y":0.7010400000001482},{"x":1.4706599999999526,"y":0.7010400000001482},{"x":1.4706599999999526,"y":-0.7010400000000345},{"x":0.20065999999997075,"y":-0.7010400000000345}]} />
<silkscreenpath route={[{"x":0.08999219999998331,"y":0.39999919999991107},{"x":0.08999219999998331,"y":-0.380009399999949}]} />
<silkscreenpath route={[{"x":0.08999219999998331,"y":0.0020065999999587802},{"x":-0.11884660000009717,"y":0.0001015999999935957}]} />
<silkscreentext text="{NAME}" pcbX="-0.1143mm" pcbY="1.7112mm" anchorAlignment="center" fontSize="1mm" />
<fabricationnotepath route={[{"x":-1.0800334000000475,"y":0.06502399999999398},{"x":-0.40002460000016526,"y":0.06502399999999398},{"x":-0.40002460000016526,"y":-0.044983399999978246},{"x":-1.0800334000000475,"y":-0.044983399999978246},{"x":-1.0800334000000475,"y":0.06502399999999398}]} strokeWidth="0.254mm" />
<fabricationnotepath route={[{"x":0.4149343999999928,"y":0.09001760000012382},{"x":1.094968599999902,"y":0.09001760000012382},{"x":1.094968599999902,"y":-0.019989799999962088},{"x":0.4149343999999928,"y":-0.019989799999962088},{"x":0.4149343999999928,"y":0.09001760000012382}]} strokeWidth="0.254mm" />
<fabricationnotepath route={[{"x":0.7050024000000121,"y":-0.3499865999999656},{"x":0.7050024000000121,"y":0.33002220000003035},{"x":0.8150097999999844,"y":0.33002220000003035},{"x":0.8150097999999844,"y":-0.3499865999999656},{"x":0.7050024000000121,"y":-0.3499865999999656}]} strokeWidth="0.254mm" />
<courtyardoutline outline={[{"x":-1.9517999999999347,"y":0.9612000000000762},{"x":1.7232000000000198,"y":0.9612000000000762},{"x":1.7232000000000198,"y":-0.9357999999998583},{"x":-1.9517999999999347,"y":-0.9357999999998583},{"x":-1.9517999999999347,"y":0.9612000000000762}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C6848499.obj?uuid=20fe6b1e27554c55b08077acde8b4a1f",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C6848499.step?uuid=20fe6b1e27554c55b08077acde8b4a1f",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: -0.000012699999842880061, y: 0, z: 0 },
      }}
      {...restProps}
    />
  )
}