import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["DVDD1"],
  pin2: ["VSYNC"],
  pin3: ["SPDIF"],
  pin4: ["MCLK"],
  pin5: ["I2S0"],
  pin6: ["I2S1"],
  pin7: ["I2S2"],
  pin8: ["I2S3"],
  pin9: ["SCLK"],
  pin10: ["LRCLK"],
  pin11: ["DVDD2"],
  pin12: ["PVDD"],
  pin13: ["BGVDD"],
  pin14: ["R_EXT"],
  pin15: ["AVDD1"],
  pin16: ["HPD"],
  pin17: ["pin17"],
  pin18: ["TXC_POS"],
  pin19: ["AVDD2"],
  pin20: ["pin20"],
  pin21: ["TX0_POS"],
  pin22: ["PD"],
  pin23: ["pin23"],
  pin24: ["TX1_POS"],
  pin25: ["AVDD3"],
  pin26: ["pin26"],
  pin27: ["TX2_POS"],
  pin28: ["INT"],
  pin29: ["DVDD_3V"],
  pin30: ["CEC"],
  pin31: ["DVDD3"],
  pin32: ["CEC_CLK"],
  pin33: ["DDCSCL"],
  pin34: ["DDCSDA"],
  pin35: ["SCL"],
  pin36: ["SDA"],
  pin37: ["D23"],
  pin38: ["D22"],
  pin39: ["D21"],
  pin40: ["D20"],
  pin41: ["D19"],
  pin42: ["D18"],
  pin43: ["D17"],
  pin44: ["D16"],
  pin45: ["D15"],
  pin46: ["D14"],
  pin47: ["D13"],
  pin48: ["D12"],
  pin49: ["D11"],
  pin50: ["D10"],
  pin51: ["DVDD4"],
  pin52: ["D9"],
  pin53: ["CLK"],
  pin54: ["D8"],
  pin55: ["D7"],
  pin56: ["D6"],
  pin57: ["D5"],
  pin58: ["D4"],
  pin59: ["D3"],
  pin60: ["D2"],
  pin61: ["D1"],
  pin62: ["D0"],
  pin63: ["DE"],
  pin64: ["HSYNC"],
  pin65: ["EP"]
} as const

export const ADV7513BSWZ = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      supplierPartNumbers={{
  "jlcpcb": [
    "C408901"
  ]
}}
      manufacturerPartNumber="ADV7513BSWZ"
      footprint={<footprint>
        <smtpad portHints={["pin1"]} pcbX="-3.750056mm" pcbY="-5.700014mm" width="0.2800096mm" height="1.5999968mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin2"]} pcbX="-3.24993mm" pcbY="-5.700014mm" width="0.2800096mm" height="1.5999968mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin3"]} pcbX="-2.750058mm" pcbY="-5.700014mm" width="0.2800096mm" height="1.5999968mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin4"]} pcbX="-2.249932mm" pcbY="-5.700014mm" width="0.2800096mm" height="1.5999968mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin5"]} pcbX="-1.75006mm" pcbY="-5.700014mm" width="0.2800096mm" height="1.5999968mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin6"]} pcbX="-1.249934mm" pcbY="-5.700014mm" width="0.2800096mm" height="1.5999968mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin7"]} pcbX="-0.750062mm" pcbY="-5.700014mm" width="0.2800096mm" height="1.5999968mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin8"]} pcbX="-0.249936mm" pcbY="-5.700014mm" width="0.2800096mm" height="1.5999968mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin9"]} pcbX="0.249936mm" pcbY="-5.700014mm" width="0.2800096mm" height="1.5999968mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin10"]} pcbX="0.750062mm" pcbY="-5.700014mm" width="0.2800096mm" height="1.5999968mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin11"]} pcbX="1.249934mm" pcbY="-5.700014mm" width="0.2800096mm" height="1.5999968mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin12"]} pcbX="1.75006mm" pcbY="-5.700014mm" width="0.2800096mm" height="1.5999968mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin13"]} pcbX="2.249932mm" pcbY="-5.700014mm" width="0.2800096mm" height="1.5999968mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin14"]} pcbX="2.750058mm" pcbY="-5.700014mm" width="0.2800096mm" height="1.5999968mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin15"]} pcbX="3.24993mm" pcbY="-5.700014mm" width="0.2800096mm" height="1.5999968mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin16"]} pcbX="3.750056mm" pcbY="-5.700014mm" width="0.2800096mm" height="1.5999968mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin17"]} pcbX="5.700014mm" pcbY="-3.750056mm" width="1.5999968mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin18"]} pcbX="5.700014mm" pcbY="-3.24993mm" width="1.5999968mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin19"]} pcbX="5.700014mm" pcbY="-2.750058mm" width="1.5999968mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin20"]} pcbX="5.700014mm" pcbY="-2.249932mm" width="1.5999968mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin21"]} pcbX="5.700014mm" pcbY="-1.75006mm" width="1.5999968mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin22"]} pcbX="5.700014mm" pcbY="-1.249934mm" width="1.5999968mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin23"]} pcbX="5.700014mm" pcbY="-0.750062mm" width="1.5999968mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin24"]} pcbX="5.700014mm" pcbY="-0.249936mm" width="1.5999968mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin25"]} pcbX="5.700014mm" pcbY="0.249936mm" width="1.5999968mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin26"]} pcbX="5.700014mm" pcbY="0.750062mm" width="1.5999968mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin27"]} pcbX="5.700014mm" pcbY="1.249934mm" width="1.5999968mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin28"]} pcbX="5.700014mm" pcbY="1.75006mm" width="1.5999968mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin29"]} pcbX="5.700014mm" pcbY="2.249932mm" width="1.5999968mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin30"]} pcbX="5.700014mm" pcbY="2.750058mm" width="1.5999968mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin31"]} pcbX="5.700014mm" pcbY="3.24993mm" width="1.5999968mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin32"]} pcbX="5.700014mm" pcbY="3.750056mm" width="1.5999968mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin33"]} pcbX="3.750056mm" pcbY="5.700014mm" width="0.2800096mm" height="1.5999968mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin34"]} pcbX="3.24993mm" pcbY="5.700014mm" width="0.2800096mm" height="1.5999968mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin35"]} pcbX="2.750058mm" pcbY="5.700014mm" width="0.2800096mm" height="1.5999968mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin36"]} pcbX="2.249932mm" pcbY="5.700014mm" width="0.2800096mm" height="1.5999968mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin37"]} pcbX="1.75006mm" pcbY="5.700014mm" width="0.2800096mm" height="1.5999968mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin38"]} pcbX="1.249934mm" pcbY="5.700014mm" width="0.2800096mm" height="1.5999968mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin39"]} pcbX="0.750062mm" pcbY="5.700014mm" width="0.2800096mm" height="1.5999968mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin40"]} pcbX="0.249936mm" pcbY="5.700014mm" width="0.2800096mm" height="1.5999968mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin41"]} pcbX="-0.249936mm" pcbY="5.700014mm" width="0.2800096mm" height="1.5999968mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin42"]} pcbX="-0.750062mm" pcbY="5.700014mm" width="0.2800096mm" height="1.5999968mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin43"]} pcbX="-1.249934mm" pcbY="5.700014mm" width="0.2800096mm" height="1.5999968mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin44"]} pcbX="-1.75006mm" pcbY="5.700014mm" width="0.2800096mm" height="1.5999968mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin45"]} pcbX="-2.249932mm" pcbY="5.700014mm" width="0.2800096mm" height="1.5999968mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin46"]} pcbX="-2.750058mm" pcbY="5.700014mm" width="0.2800096mm" height="1.5999968mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin47"]} pcbX="-3.24993mm" pcbY="5.700014mm" width="0.2800096mm" height="1.5999968mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin48"]} pcbX="-3.750056mm" pcbY="5.700014mm" width="0.2800096mm" height="1.5999968mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin49"]} pcbX="-5.700014mm" pcbY="3.750056mm" width="1.5999968mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin50"]} pcbX="-5.700014mm" pcbY="3.24993mm" width="1.5999968mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin51"]} pcbX="-5.700014mm" pcbY="2.750058mm" width="1.5999968mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin52"]} pcbX="-5.700014mm" pcbY="2.249932mm" width="1.5999968mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin53"]} pcbX="-5.700014mm" pcbY="1.75006mm" width="1.5999968mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin54"]} pcbX="-5.700014mm" pcbY="1.249934mm" width="1.5999968mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin55"]} pcbX="-5.700014mm" pcbY="0.750062mm" width="1.5999968mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin56"]} pcbX="-5.700014mm" pcbY="0.249936mm" width="1.5999968mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin57"]} pcbX="-5.700014mm" pcbY="-0.249936mm" width="1.5999968mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin58"]} pcbX="-5.700014mm" pcbY="-0.750062mm" width="1.5999968mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin59"]} pcbX="-5.700014mm" pcbY="-1.249934mm" width="1.5999968mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin60"]} pcbX="-5.700014mm" pcbY="-1.75006mm" width="1.5999968mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin61"]} pcbX="-5.700014mm" pcbY="-2.249932mm" width="1.5999968mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin62"]} pcbX="-5.700014mm" pcbY="-2.750058mm" width="1.5999968mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin63"]} pcbX="-5.700014mm" pcbY="-3.24993mm" width="1.5999968mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin64"]} pcbX="-5.700014mm" pcbY="-3.750056mm" width="1.5999968mm" height="0.2800096mm" radius="0.1400048mm" shape="pill" />
<smtpad portHints={["pin65"]} pcbX="0mm" pcbY="0mm" width="5.2999894mm" height="5.2999894mm" shape="rect" />
<silkscreenpath route={[{"x":-5.076190000000111,"y":4.080510000000004},{"x":-5.076190000000111,"y":5.076189999999997},{"x":-4.080510000000004,"y":5.076189999999997}]} />
<silkscreenpath route={[{"x":5.076189999999997,"y":4.080510000000004},{"x":5.076189999999997,"y":5.076189999999997},{"x":4.080510000000004,"y":5.076189999999997}]} />
<silkscreenpath route={[{"x":-5.076190000000111,"y":-4.080510000000004},{"x":-5.076190000000111,"y":-5.076189999999997},{"x":-4.080510000000004,"y":-5.076189999999997}]} />
<silkscreenpath route={[{"x":5.076189999999997,"y":-4.080510000000004},{"x":5.076189999999997,"y":-5.076189999999997},{"x":4.080510000000004,"y":-5.076189999999997}]} />
<silkscreenpath route={[{"x":-4.671390199999905,"y":-4.671390199999905},{"x":-4.671390199999905,"y":4.671390200000019},{"x":4.671390199999905,"y":4.671390200000019},{"x":4.671390199999905,"y":-4.671390199999905},{"x":-4.671390199999905,"y":-4.671390199999905}]} />
<silkscreencircle pcbX="-3.750056mm" pcbY="-6.800088mm" radius="0.100076mm" />
<silkscreencircle pcbX="-3.750056mm" pcbY="-4.171442mm" radius="0.150114mm" />
<silkscreentext text="{NAME}" pcbX="0.0127mm" pcbY="7.35mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-6.600000000000136,"y":6.600000000000023},{"x":6.6253999999999,"y":6.600000000000023},{"x":6.6253999999999,"y":-7.158799999999928},{"x":-6.600000000000136,"y":-7.158799999999928},{"x":-6.600000000000136,"y":6.600000000000023}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C408901.obj?uuid=7e9b9111dcfd48d3add0eab11d882721",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C408901.step?uuid=7e9b9111dcfd48d3add0eab11d882721",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0, y: 0, z: 0.000795 },
      }}
      {...props}
    />
  )
}