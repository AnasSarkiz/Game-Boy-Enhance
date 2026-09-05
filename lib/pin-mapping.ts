import { portName } from "./reference"

type PinMapping = Record<string, string[]>

// Datasheet references and every omitted endpoint are recorded in docs/PIN-MAPPING.md.
const ldoPinMapping: PinMapping = {
  "1": ["pin6"], "2": ["pin3", "pin7", "pin2"],
  "3": ["pin4"], "4": ["pin5"], "5": ["pin1"],
}
const ramPinMapping: PinMapping = {
  "1": ["pin20"], "2": ["pin21"], "3": ["pin22"], "4": ["pin23"],
  "5": ["pin24"], "6": ["pin25"], "7": ["pin26"], "8": ["pin27"],
  "9": [], "10": [], "11": ["pin17"], "12": [], "13": ["pin12"],
  "14": ["pin40"], "15": ["pin39"], "16": ["pin11"], "17": ["pin18"],
  "18": ["pin42"], "19": ["pin43"], "20": ["pin44"], "21": ["pin1"],
  "22": ["pin2"], "23": ["pin3"], "24": ["pin4"], "25": ["pin5"],
  "26": ["pin6"], "27": ["pin12"], "28": ["pin41"], "29": ["pin7"],
  "30": ["pin29"], "31": ["pin8"], "32": ["pin30"], "33": ["pin9"],
  "34": ["pin31"], "35": ["pin10"], "36": ["pin32"], "37": ["pin33"],
  "38": ["pin13"], "39": ["pin35"], "40": ["pin14"], "41": ["pin36"],
  "42": ["pin15"], "43": ["pin37"], "44": ["pin16"], "45": ["pin38"],
  "46": ["pin34"], "47": [], "48": ["pin19"],
}
const volumePinMapping: PinMapping = {
  "1": ["pin4"], "2": ["pin2"], "3": ["pin3"], "4": ["pin5"], "5": ["pin1"],
}
const powerSwitchPinMapping: PinMapping = {
  "1": ["pin1"], "2": ["pin3"], "3": ["pin3"], "4": ["pin2"], "5": [],
}
export const buttonDefinitions = [
  { name: "SW_B", original: "SW4", signal: "1", ground: "3", label: "B" },
  { name: "SW_A", original: "SW4", signal: "2", ground: "4", label: "A" },
  { name: "SW_START", original: "SW5", signal: "1", ground: "3", label: "START" },
  { name: "SW_SELECT", original: "SW5", signal: "2", ground: "4", label: "SELECT" },
  { name: "SW_UP", original: "SW6", signal: "1", ground: "5", label: "UP" },
  { name: "SW_RIGHT", original: "SW6", signal: "2", ground: "6", label: "RIGHT" },
  { name: "SW_DOWN", original: "SW6", signal: "3", ground: "7", label: "DOWN" },
  { name: "SW_LEFT", original: "SW6", signal: "4", ground: "8", label: "LEFT" },
]

export function mappedPorts(referenceDesignator: string, pinNumber: string) {
  let mapping: PinMapping | undefined
  if (referenceDesignator === "U4" || referenceDesignator === "U8") mapping = ldoPinMapping
  if (referenceDesignator === "U2") mapping = ramPinMapping
  if (referenceDesignator === "VR2") mapping = volumePinMapping
  if (referenceDesignator === "SW1") mapping = powerSwitchPinMapping
  if (mapping) {
    if (!mapping[pinNumber]) throw new Error(`Unmapped pin: ${referenceDesignator}.${pinNumber}`)
    return mapping[pinNumber]
  }
  if (referenceDesignator === "P2" && pinNumber === "0") return ["pin41", "pin42"]
  return [portName(referenceDesignator, pinNumber)]
}

export function mappedEndpoints(referenceDesignator: string, pinNumber: string) {
  const buttons = buttonDefinitions.filter((button) => button.original === referenceDesignator)
  if (buttons.length) {
    const button = buttons.find((button) => button.signal === pinNumber || button.ground === pinNumber)
    if (!button) throw new Error(`Unmapped button contact: ${referenceDesignator}.${pinNumber}`)
    // Alps circuit diagram: 1/3 are joined, 2/4 are joined; press connects the pairs.
    return (button.signal === pinNumber ? ["pin1", "pin3"] : ["pin2", "pin4"])
      .map((port) => ({ reference: button.name, port }))
  }
  return mappedPorts(referenceDesignator, pinNumber).map((port) => ({ reference: referenceDesignator, port }))
}
