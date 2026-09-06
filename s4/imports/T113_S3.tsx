import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["PG6"],
  pin2: ["PG7"],
  pin3: ["PG8"],
  pin4: ["PG9"],
  pin5: ["PG10"],
  pin6: ["PG11"],
  pin7: ["PF0"],
  pin8: ["PF1"],
  pin9: ["PF2"],
  pin10: ["PF3"],
  pin11: ["PF4"],
  pin12: ["PF5"],
  pin13: ["PF6"],
  pin14: ["PC7"],
  pin15: ["PC6"],
  pin16: ["PC5"],
  pin17: ["PC4"],
  pin18: ["PC3"],
  pin19: ["PC2"],
  pin20: ["VCC_PLL"],
  pin21: ["REFCLK_OUT"],
  pin22: ["DXOUT"],
  pin23: ["DXIN"],
  pin24: ["X32KOUT"],
  pin25: ["X32KIN"],
  pin26: ["VCC_RTC"],
  pin27: ["RESET"],
  pin28: ["LDOA_OUT"],
  pin29: ["LDO_IN"],
  pin30: ["LDOB_OUT"],
  pin31: ["PE13"],
  pin32: ["PE12"],
  pin33: ["PE3"],
  pin34: ["VCC_PE"],
  pin35: ["PE2"],
  pin36: ["PE11"],
  pin37: ["PE10"],
  pin38: ["PE9"],
  pin39: ["PE8"],
  pin40: ["PE7"],
  pin41: ["PE6"],
  pin42: ["PE5"],
  pin43: ["PE4"],
  pin44: ["PE0"],
  pin45: ["PE1"],
  pin46: ["VDD_SYS0"],
  pin47: ["DZQ"],
  pin48: ["VCC_DRAM0"],
  pin49: ["VCC_DRAM1"],
  pin50: ["VDD18_DRAM"],
  pin51: ["VDD_SYS1"],
  pin52: ["PD22"],
  pin53: ["PD21"],
  pin54: ["PD20"],
  pin55: ["PD0"],
  pin56: ["PD1"],
  pin57: ["PD2"],
  pin58: ["PD3"],
  pin59: ["PD4"],
  pin60: ["PD5"],
  pin61: ["PD6"],
  pin62: ["PD7"],
  pin63: ["PD8"],
  pin64: ["PD9"],
  pin65: ["VCC_LVDS"],
  pin66: ["VCC_PD"],
  pin67: ["PD10"],
  pin68: ["PD11"],
  pin69: ["PD13"],
  pin70: ["PD12"],
  pin71: ["PD14"],
  pin72: ["PD15"],
  pin73: ["PD16"],
  pin74: ["PD17"],
  pin75: ["PD18"],
  pin76: ["PD19"],
  pin77: ["VCC_TVOUT"],
  pin78: ["TVOUT0"],
  pin79: ["PB7"],
  pin80: ["PB6"],
  pin81: ["VDD_SYS2"],
  pin82: ["PB5"],
  pin83: ["VCC_IO"],
  pin84: ["PB4"],
  pin85: ["PB3"],
  pin86: ["PB2"],
  pin87: ["MICIN3P"],
  pin88: ["MICIN3N"],
  pin89: ["AVCC"],
  pin90: ["VRA2"],
  pin91: ["AGND"],
  pin92: ["VRA1"],
  pin93: ["FMINR"],
  pin94: ["FMINL"],
  pin95: ["LINEINR"],
  pin96: ["LINEINL"],
  pin97: ["HPVCC"],
  pin98: ["HPOUTR"],
  pin99: ["HPOUTL"],
  pin100: ["HPOUTFB"],
  pin101: ["GPADC0"],
  pin102: ["TP_X1"],
  pin103: ["TP_X2"],
  pin104: ["TP_Y1"],
  pin105: ["TP_Y2"],
  pin106: ["NC0"],
  pin107: ["VCC_TVIN"],
  pin108: ["TVIN0"],
  pin109: ["TVIN1"],
  pin110: ["TVIN_VRP"],
  pin111: ["TVIN_VRN"],
  pin112: ["USB1_DP"],
  pin113: ["USB1_DM"],
  pin114: ["USB0_DM"],
  pin115: ["USB0_DP"],
  pin116: ["VDD_CORE0"],
  pin117: ["VDD_CORE1"],
  pin118: ["PG1"],
  pin119: ["PG2"],
  pin120: ["PG0"],
  pin121: ["PG3"],
  pin122: ["PG5"],
  pin123: ["PG4"],
  pin124: ["PG12"],
  pin125: ["PG13"],
  pin126: ["PG14"],
  pin127: ["PG15"],
  pin128: ["VCC_PG"],
  pin129: ["EPAD"]
} as const

const pinAttributes = {
  pin91: {requiresGround: true},
  pin106: {doNotConnect: true}
} as const

export const T113_S3 = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      supplierPartNumbers={{
  "jlcpcb": [
    "C5197687"
  ]
}}
      manufacturerPartNumber="T113-S3"
      footprint={<footprint>
        <smtpad portHints={["pin128"]} pcbX="-7.629906mm" pcbY="-6.199886mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin127"]} pcbX="-7.629906mm" pcbY="-5.80009mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin126"]} pcbX="-7.629906mm" pcbY="-5.40004mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin125"]} pcbX="-7.629906mm" pcbY="-4.99999mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin124"]} pcbX="-7.629906mm" pcbY="-4.59994mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin123"]} pcbX="-7.629906mm" pcbY="-4.19989mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin122"]} pcbX="-7.629906mm" pcbY="-3.800094mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin121"]} pcbX="-7.629906mm" pcbY="-3.400044mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin120"]} pcbX="-7.629906mm" pcbY="-2.999994mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin119"]} pcbX="-7.629906mm" pcbY="-2.599944mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin118"]} pcbX="-7.629906mm" pcbY="-2.199894mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin117"]} pcbX="-7.629906mm" pcbY="-1.800098mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin116"]} pcbX="-7.629906mm" pcbY="-1.400048mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin115"]} pcbX="-7.629906mm" pcbY="-0.999998mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin114"]} pcbX="-7.629906mm" pcbY="-0.599948mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin113"]} pcbX="-7.629906mm" pcbY="-0.199898mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin112"]} pcbX="-7.629906mm" pcbY="0.199898mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin111"]} pcbX="-7.629906mm" pcbY="0.599948mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin110"]} pcbX="-7.629906mm" pcbY="0.999998mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin109"]} pcbX="-7.629906mm" pcbY="1.400048mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin108"]} pcbX="-7.629906mm" pcbY="1.800098mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin107"]} pcbX="-7.629906mm" pcbY="2.200148mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin106"]} pcbX="-7.629906mm" pcbY="2.599944mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin105"]} pcbX="-7.629906mm" pcbY="2.999994mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin104"]} pcbX="-7.629906mm" pcbY="3.400044mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin103"]} pcbX="-7.629906mm" pcbY="3.800094mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin102"]} pcbX="-7.629906mm" pcbY="4.19989mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin101"]} pcbX="-7.629906mm" pcbY="4.59994mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin100"]} pcbX="-7.629906mm" pcbY="4.99999mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin99"]} pcbX="-7.629906mm" pcbY="5.40004mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin98"]} pcbX="-7.629906mm" pcbY="5.800344mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin97"]} pcbX="-7.629906mm" pcbY="6.199886mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin96"]} pcbX="-6.199886mm" pcbY="7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin95"]} pcbX="-5.80009mm" pcbY="7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin94"]} pcbX="-5.40004mm" pcbY="7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin93"]} pcbX="-4.99999mm" pcbY="7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin92"]} pcbX="-4.59994mm" pcbY="7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin91"]} pcbX="-4.19989mm" pcbY="7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin90"]} pcbX="-3.800094mm" pcbY="7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin89"]} pcbX="-3.400044mm" pcbY="7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin88"]} pcbX="-2.999994mm" pcbY="7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin87"]} pcbX="-2.599944mm" pcbY="7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin86"]} pcbX="-2.199894mm" pcbY="7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin85"]} pcbX="-1.800098mm" pcbY="7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin84"]} pcbX="-1.400048mm" pcbY="7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin83"]} pcbX="-0.999998mm" pcbY="7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin82"]} pcbX="-0.599948mm" pcbY="7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin81"]} pcbX="-0.199898mm" pcbY="7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin80"]} pcbX="0.199898mm" pcbY="7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin79"]} pcbX="0.599948mm" pcbY="7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin78"]} pcbX="0.999998mm" pcbY="7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin77"]} pcbX="1.400048mm" pcbY="7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin76"]} pcbX="1.800098mm" pcbY="7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin75"]} pcbX="2.199894mm" pcbY="7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin74"]} pcbX="2.599944mm" pcbY="7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin73"]} pcbX="2.999994mm" pcbY="7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin72"]} pcbX="3.400044mm" pcbY="7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin71"]} pcbX="3.800094mm" pcbY="7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin70"]} pcbX="4.19989mm" pcbY="7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin69"]} pcbX="4.59994mm" pcbY="7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin68"]} pcbX="4.99999mm" pcbY="7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin67"]} pcbX="5.40004mm" pcbY="7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin66"]} pcbX="5.80009mm" pcbY="7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin65"]} pcbX="6.199886mm" pcbY="7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin64"]} pcbX="7.629906mm" pcbY="6.199886mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin63"]} pcbX="7.629906mm" pcbY="5.800344mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin62"]} pcbX="7.629906mm" pcbY="5.40004mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin61"]} pcbX="7.629906mm" pcbY="4.99999mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin60"]} pcbX="7.629906mm" pcbY="4.59994mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin59"]} pcbX="7.629906mm" pcbY="4.19989mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin58"]} pcbX="7.629906mm" pcbY="3.800094mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin57"]} pcbX="7.629906mm" pcbY="3.400044mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin56"]} pcbX="7.629906mm" pcbY="2.999994mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin55"]} pcbX="7.629906mm" pcbY="2.599944mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin54"]} pcbX="7.629906mm" pcbY="2.200148mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin53"]} pcbX="7.629906mm" pcbY="1.800098mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin52"]} pcbX="7.629906mm" pcbY="1.400048mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin51"]} pcbX="7.629906mm" pcbY="0.999998mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin50"]} pcbX="7.629906mm" pcbY="0.599948mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin49"]} pcbX="7.629906mm" pcbY="0.199898mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin48"]} pcbX="7.629906mm" pcbY="-0.199898mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin47"]} pcbX="7.629906mm" pcbY="-0.599948mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin46"]} pcbX="7.629906mm" pcbY="-0.999998mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin45"]} pcbX="7.629906mm" pcbY="-1.400048mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin44"]} pcbX="7.629906mm" pcbY="-1.800098mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin43"]} pcbX="7.629906mm" pcbY="-2.199894mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin42"]} pcbX="7.629906mm" pcbY="-2.599944mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin41"]} pcbX="7.629906mm" pcbY="-2.999994mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin40"]} pcbX="7.629906mm" pcbY="-3.400044mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin39"]} pcbX="7.629906mm" pcbY="-3.800094mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin38"]} pcbX="7.629906mm" pcbY="-4.19989mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin37"]} pcbX="7.629906mm" pcbY="-4.59994mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin36"]} pcbX="7.629906mm" pcbY="-4.99999mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin35"]} pcbX="7.629906mm" pcbY="-5.40004mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin34"]} pcbX="7.629906mm" pcbY="-5.80009mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin33"]} pcbX="7.629906mm" pcbY="-6.199886mm" width="1.459992mm" height="0.1999996mm" shape="rect" />
<smtpad portHints={["pin32"]} pcbX="6.199886mm" pcbY="-7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin31"]} pcbX="5.80009mm" pcbY="-7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin30"]} pcbX="5.40004mm" pcbY="-7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin29"]} pcbX="4.99999mm" pcbY="-7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin28"]} pcbX="4.59994mm" pcbY="-7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin27"]} pcbX="4.19989mm" pcbY="-7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin26"]} pcbX="3.800094mm" pcbY="-7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin25"]} pcbX="3.400044mm" pcbY="-7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin24"]} pcbX="2.999994mm" pcbY="-7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin23"]} pcbX="2.599944mm" pcbY="-7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin22"]} pcbX="2.199894mm" pcbY="-7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin21"]} pcbX="1.800098mm" pcbY="-7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin20"]} pcbX="1.400048mm" pcbY="-7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin19"]} pcbX="0.999998mm" pcbY="-7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin18"]} pcbX="0.599948mm" pcbY="-7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin17"]} pcbX="0.199898mm" pcbY="-7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin16"]} pcbX="-0.199898mm" pcbY="-7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin15"]} pcbX="-0.599948mm" pcbY="-7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin14"]} pcbX="-0.999998mm" pcbY="-7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin13"]} pcbX="-1.400048mm" pcbY="-7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin12"]} pcbX="-1.800098mm" pcbY="-7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin11"]} pcbX="-2.199894mm" pcbY="-7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin10"]} pcbX="-2.599944mm" pcbY="-7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin9"]} pcbX="-2.999994mm" pcbY="-7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin8"]} pcbX="-3.400044mm" pcbY="-7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin7"]} pcbX="-3.800094mm" pcbY="-7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin6"]} pcbX="-4.19989mm" pcbY="-7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin5"]} pcbX="-4.59994mm" pcbY="-7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin4"]} pcbX="-4.99999mm" pcbY="-7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin3"]} pcbX="-5.40004mm" pcbY="-7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="-5.80009mm" pcbY="-7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin1"]} pcbX="-6.199886mm" pcbY="-7.629906mm" width="0.1999996mm" height="1.459992mm" shape="rect" />
<smtpad portHints={["pin129"]} pcbX="-0mm" pcbY="0mm" width="5.5999888mm" height="5.5999888mm" shape="rect" />
<silkscreenpath route={[{"x":-7.0761606000002075,"y":6.50262859999998},{"x":-7.0761606000002075,"y":7.076338400000054},{"x":-6.502450800000133,"y":7.076338400000054}]} />
<silkscreenpath route={[{"x":7.076262199999974,"y":6.50262859999998},{"x":7.076262199999974,"y":7.076338400000054},{"x":6.502552399999786,"y":7.076338400000054}]} />
<silkscreenpath route={[{"x":-7.0761606000002075,"y":-6.502374600000053},{"x":-7.0761606000002075,"y":-7.076084400000013},{"x":-6.502450800000133,"y":-7.076084400000013}]} />
<silkscreenpath route={[{"x":7.076262199999974,"y":-6.502374600000053},{"x":7.076262199999974,"y":-7.076084400000013},{"x":6.502552399999786,"y":-7.076084400000013}]} />
<silkscreenpath route={[{"x":-6.67136080000023,"y":-6.671284600000035},{"x":-6.67136080000023,"y":6.671538599999963},{"x":6.671462399999882,"y":6.671538599999963},{"x":6.671462399999882,"y":-6.671284600000035},{"x":-6.67136080000023,"y":-6.671284600000035}]} />
<silkscreencircle pcbX="-6.171438mm" pcbY="-6.171438mm" radius="0.150114mm" />
<silkscreencircle pcbX="-6.199886mm" pcbY="-8.66013mm" radius="0.100076mm" />
<silkscreentext text="{NAME}" pcbX="-0.004572mm" pcbY="9.37184mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-8.611172000000124,"y":8.621840000000134},{"x":8.602027999999791,"y":8.621840000000134},{"x":8.602027999999791,"y":-8.997759999999971},{"x":-8.611172000000124,"y":-8.997759999999971},{"x":-8.611172000000124,"y":8.621840000000134}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C5197687.obj?uuid=138cf4ad0f544b5585356689f7c677f5",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C5197687.step?uuid=138cf4ad0f544b5585356689f7c677f5",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: -0.000050799999826267594, y: -0.0001269999999067295, z: -0.8 },
      }}
      {...props}
    />
  )
}