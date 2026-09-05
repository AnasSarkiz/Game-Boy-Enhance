import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["A4"],
  pin2: ["A3"],
  pin3: ["A2"],
  pin4: ["A1"],
  pin5: ["A0"],
  pin6: ["N_CE"],
  pin7: ["pin7"],
  pin8: ["pin8"],
  pin9: ["pin9"],
  pin10: ["pin10"],
  pin11: ["VDD1"],
  pin12: ["GND1"],
  pin13: ["pin13"],
  pin14: ["pin14"],
  pin15: ["pin15"],
  pin16: ["pin16"],
  pin17: ["N_WE"],
  pin18: ["A17"],
  pin19: ["A16"],
  pin20: ["A15"],
  pin21: ["A14"],
  pin22: ["A13"],
  pin23: ["A12"],
  pin24: ["A11"],
  pin25: ["A10"],
  pin26: ["A9"],
  pin27: ["A8"],
  pin28: ["NC"],
  pin29: ["pin29"],
  pin30: ["pin30"],
  pin31: ["pin31"],
  pin32: ["pin32"],
  pin33: ["VDD2"],
  pin34: ["GND2"],
  pin35: ["pin35"],
  pin36: ["pin36"],
  pin37: ["pin37"],
  pin38: ["pin38"],
  pin39: ["N_BLE"],
  pin40: ["N_BHE"],
  pin41: ["N_OE"],
  pin42: ["A7"],
  pin43: ["A6"],
  pin44: ["A5"]
} as const

const pinAttributes = {
  pin11: {requiresPower: true},
  pin12: {requiresGround: true},
  pin28: {doNotConnect: true},
  pin33: {requiresPower: true},
  pin34: {requiresGround: true}
} as const

export const CY62146EV30LL_45ZSXI = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      supplierPartNumbers={{
  "jlcpcb": [
    "C466866"
  ]
}}
      manufacturerPartNumber="CY62146EV30LL-45ZSXI"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} pcbX="-8.400034mm" pcbY="-5.655564mm" width="0.4480052mm" height="1.5510002mm" radius="0.2240026mm" shape="pill" />
<smtpad portHints={["pin2"]} pcbX="-7.599934mm" pcbY="-5.655564mm" width="0.4480052mm" height="1.5510002mm" radius="0.2240026mm" shape="pill" />
<smtpad portHints={["pin3"]} pcbX="-6.800088mm" pcbY="-5.655564mm" width="0.4480052mm" height="1.5510002mm" radius="0.2240026mm" shape="pill" />
<smtpad portHints={["pin4"]} pcbX="-5.999988mm" pcbY="-5.655564mm" width="0.4480052mm" height="1.5510002mm" radius="0.2240026mm" shape="pill" />
<smtpad portHints={["pin5"]} pcbX="-5.199888mm" pcbY="-5.655564mm" width="0.4480052mm" height="1.5510002mm" radius="0.2240026mm" shape="pill" />
<smtpad portHints={["pin6"]} pcbX="-4.400042mm" pcbY="-5.655564mm" width="0.4480052mm" height="1.5510002mm" radius="0.2240026mm" shape="pill" />
<smtpad portHints={["pin7"]} pcbX="-3.599942mm" pcbY="-5.655564mm" width="0.4480052mm" height="1.5510002mm" radius="0.2240026mm" shape="pill" />
<smtpad portHints={["pin8"]} pcbX="-2.800096mm" pcbY="-5.655564mm" width="0.4480052mm" height="1.5510002mm" radius="0.2240026mm" shape="pill" />
<smtpad portHints={["pin9"]} pcbX="-1.999996mm" pcbY="-5.655564mm" width="0.4480052mm" height="1.5510002mm" radius="0.2240026mm" shape="pill" />
<smtpad portHints={["pin10"]} pcbX="-1.199896mm" pcbY="-5.655564mm" width="0.4480052mm" height="1.5510002mm" radius="0.2240026mm" shape="pill" />
<smtpad portHints={["pin11"]} pcbX="-0.40005mm" pcbY="-5.655564mm" width="0.4480052mm" height="1.5510002mm" radius="0.2240026mm" shape="pill" />
<smtpad portHints={["pin12"]} pcbX="0.40005mm" pcbY="-5.655564mm" width="0.4480052mm" height="1.5510002mm" radius="0.2240026mm" shape="pill" />
<smtpad portHints={["pin13"]} pcbX="1.199896mm" pcbY="-5.655564mm" width="0.4480052mm" height="1.5510002mm" radius="0.2240026mm" shape="pill" />
<smtpad portHints={["pin14"]} pcbX="1.999996mm" pcbY="-5.655564mm" width="0.4480052mm" height="1.5510002mm" radius="0.2240026mm" shape="pill" />
<smtpad portHints={["pin15"]} pcbX="2.800096mm" pcbY="-5.655564mm" width="0.4480052mm" height="1.5510002mm" radius="0.2240026mm" shape="pill" />
<smtpad portHints={["pin16"]} pcbX="3.599942mm" pcbY="-5.655564mm" width="0.4480052mm" height="1.5510002mm" radius="0.2240026mm" shape="pill" />
<smtpad portHints={["pin17"]} pcbX="4.400042mm" pcbY="-5.655564mm" width="0.4480052mm" height="1.5510002mm" radius="0.2240026mm" shape="pill" />
<smtpad portHints={["pin18"]} pcbX="5.199888mm" pcbY="-5.655564mm" width="0.4480052mm" height="1.5510002mm" radius="0.2240026mm" shape="pill" />
<smtpad portHints={["pin19"]} pcbX="5.999988mm" pcbY="-5.655564mm" width="0.4480052mm" height="1.5510002mm" radius="0.2240026mm" shape="pill" />
<smtpad portHints={["pin20"]} pcbX="6.800088mm" pcbY="-5.655564mm" width="0.4480052mm" height="1.5510002mm" radius="0.2240026mm" shape="pill" />
<smtpad portHints={["pin21"]} pcbX="7.599934mm" pcbY="-5.655564mm" width="0.4480052mm" height="1.5510002mm" radius="0.2240026mm" shape="pill" />
<smtpad portHints={["pin22"]} pcbX="8.400034mm" pcbY="-5.655564mm" width="0.4480052mm" height="1.5510002mm" radius="0.2240026mm" shape="pill" />
<smtpad portHints={["pin44"]} pcbX="-8.400034mm" pcbY="5.655564mm" width="0.4480052mm" height="1.5510002mm" radius="0.2240026mm" shape="pill" />
<smtpad portHints={["pin43"]} pcbX="-7.599934mm" pcbY="5.655564mm" width="0.4480052mm" height="1.5510002mm" radius="0.2240026mm" shape="pill" />
<smtpad portHints={["pin42"]} pcbX="-6.800088mm" pcbY="5.655564mm" width="0.4480052mm" height="1.5510002mm" radius="0.2240026mm" shape="pill" />
<smtpad portHints={["pin41"]} pcbX="-5.999988mm" pcbY="5.655564mm" width="0.4480052mm" height="1.5510002mm" radius="0.2240026mm" shape="pill" />
<smtpad portHints={["pin40"]} pcbX="-5.199888mm" pcbY="5.655564mm" width="0.4480052mm" height="1.5510002mm" radius="0.2240026mm" shape="pill" />
<smtpad portHints={["pin39"]} pcbX="-4.400042mm" pcbY="5.655564mm" width="0.4480052mm" height="1.5510002mm" radius="0.2240026mm" shape="pill" />
<smtpad portHints={["pin38"]} pcbX="-3.599942mm" pcbY="5.655564mm" width="0.4480052mm" height="1.5510002mm" radius="0.2240026mm" shape="pill" />
<smtpad portHints={["pin37"]} pcbX="-2.800096mm" pcbY="5.655564mm" width="0.4480052mm" height="1.5510002mm" radius="0.2240026mm" shape="pill" />
<smtpad portHints={["pin36"]} pcbX="-1.999996mm" pcbY="5.655564mm" width="0.4480052mm" height="1.5510002mm" radius="0.2240026mm" shape="pill" />
<smtpad portHints={["pin35"]} pcbX="-1.199896mm" pcbY="5.655564mm" width="0.4480052mm" height="1.5510002mm" radius="0.2240026mm" shape="pill" />
<smtpad portHints={["pin34"]} pcbX="-0.40005mm" pcbY="5.655564mm" width="0.4480052mm" height="1.5510002mm" radius="0.2240026mm" shape="pill" />
<smtpad portHints={["pin33"]} pcbX="0.40005mm" pcbY="5.655564mm" width="0.4480052mm" height="1.5510002mm" radius="0.2240026mm" shape="pill" />
<smtpad portHints={["pin32"]} pcbX="1.199896mm" pcbY="5.655564mm" width="0.4480052mm" height="1.5510002mm" radius="0.2240026mm" shape="pill" />
<smtpad portHints={["pin31"]} pcbX="1.999996mm" pcbY="5.655564mm" width="0.4480052mm" height="1.5510002mm" radius="0.2240026mm" shape="pill" />
<smtpad portHints={["pin30"]} pcbX="2.800096mm" pcbY="5.655564mm" width="0.4480052mm" height="1.5510002mm" radius="0.2240026mm" shape="pill" />
<smtpad portHints={["pin29"]} pcbX="3.599942mm" pcbY="5.655564mm" width="0.4480052mm" height="1.5510002mm" radius="0.2240026mm" shape="pill" />
<smtpad portHints={["pin28"]} pcbX="4.400042mm" pcbY="5.655564mm" width="0.4480052mm" height="1.5510002mm" radius="0.2240026mm" shape="pill" />
<smtpad portHints={["pin27"]} pcbX="5.199888mm" pcbY="5.655564mm" width="0.4480052mm" height="1.5510002mm" radius="0.2240026mm" shape="pill" />
<smtpad portHints={["pin26"]} pcbX="5.999988mm" pcbY="5.655564mm" width="0.4480052mm" height="1.5510002mm" radius="0.2240026mm" shape="pill" />
<smtpad portHints={["pin25"]} pcbX="6.800088mm" pcbY="5.655564mm" width="0.4480052mm" height="1.5510002mm" radius="0.2240026mm" shape="pill" />
<smtpad portHints={["pin24"]} pcbX="7.599934mm" pcbY="5.655564mm" width="0.4480052mm" height="1.5510002mm" radius="0.2240026mm" shape="pill" />
<smtpad portHints={["pin23"]} pcbX="8.400034mm" pcbY="5.655564mm" width="0.4480052mm" height="1.5510002mm" radius="0.2240026mm" shape="pill" />
<silkscreenpath route={[{"x":-9.281210800000053,"y":-4.651400399999943},{"x":-9.281210800000053,"y":4.651400400000057},{"x":9.281210799999826,"y":4.651400400000057},{"x":9.281210799999826,"y":-4.651400399999943},{"x":-9.281210800000053,"y":-4.651400399999943}]} />
<silkscreencircle pcbX="-8.400034mm" pcbY="-3.8989mm" radius="0.150114mm" />
<silkscreencircle pcbX="-9.076436mm" pcbY="-5.655564mm" radius="0.150114mm" />
<silkscreentext text="{NAME}" pcbX="0.0127mm" pcbY="7.1976mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-9.520999999999958,"y":6.4476000000000795},{"x":9.546399999999949,"y":6.4476000000000795},{"x":9.546399999999949,"y":-6.701599999999871},{"x":-9.520999999999958,"y":-6.701599999999871},{"x":-9.520999999999958,"y":6.4476000000000795}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C466866.obj?uuid=2c914ee516034fcebfcb50b4229ab125",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C466866.step?uuid=2c914ee516034fcebfcb50b4229ab125",
        pcbRotationOffset: 90,
        modelOriginPosition: { x: 0.000012699999956566899, y: 0, z: 0.000917 },
      }}
      {...props}
    />
  )
}