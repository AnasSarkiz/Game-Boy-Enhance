import extractedReference from "./generated/reference.json"
import { applyToPoint, compose, scale, translate } from "transformation-matrix"

export const reference = extractedReference
export type ReferenceComponent = (typeof reference.components)[number]
export type ReferenceFootprint = (typeof reference.footprints)[number]
export type ReferencePad = ReferenceFootprint["pads"][number]
export type Point = { x: number; y: number }
export type ReferenceDesignator = ReferenceComponent["reference"]
type KiCadPinNumber = string

const xs = reference.outline.map((point) => point.x)
const ys = reference.outline.map((point) => point.y)
export const boardCenter = {
  x: (Math.min(...xs) + Math.max(...xs)) / 2,
  y: (Math.min(...ys) + Math.max(...ys)) / 2,
}
export const referenceToBoard = translate(-boardCenter.x, -boardCenter.y)
// User-authorized enlargement. Components keep their actual package dimensions.
export const placementScale = 1.4
export const referenceToPlacement = compose(scale(placementScale), referenceToBoard)
export const boardPoint = (point: Point) => applyToPoint(referenceToPlacement, point)
export const boardOutline = reference.outline.map(boardPoint)
export const boardWidth = (Math.max(...xs) - Math.min(...xs)) * placementScale
export const boardHeight = (Math.max(...ys) - Math.min(...ys)) * placementScale

export function cutoutPoints(points: Point[]) {
  const center = { x: points.reduce((sum, point) => sum + point.x, 0) / points.length, y: points.reduce((sum, point) => sum + point.y, 0) / points.length }
  const placedCenter = boardPoint(center)
  const cutoutToPlacement = translate(placedCenter.x - center.x, placedCenter.y - center.y)
  return points.map((point) => applyToPoint(cutoutToPlacement, point))
}

export function copperLayer(layer: string): "top" | "bottom" {
  if (layer === "top" || layer === "bottom") return layer
  throw new Error(`Invalid component layer: ${layer}`)
}

export function netName(originalName: string) {
  return originalName.replace(/^\//, "").replace(/~\{([^}]+)\}/g, "$1_N")
    .replace(/\+/g, "_PLUS").replace(/-\)/g, "_MINUS)")
    .replace(/[{}]/g, "").replace(/[^a-zA-Z0-9_]/g, "_").replace(/_+/g, "_").replace(/_$/, "")
}
export const connectedNets = reference.nets.filter((net) => !net.name.startsWith("unconnected-"))
const netNames = connectedNets.map((net) => netName(net.name))
if (new Set(netNames).size !== netNames.length) throw new Error("Reference net labels collide after normalization")

export function getFootprint(referenceDesignator: ReferenceDesignator) {
  const footprint = reference.footprints.find((footprint) => footprint.reference === referenceDesignator)
  if (!footprint) throw new Error(`Missing footprint: ${referenceDesignator}`)
  return footprint
}
export function getNoConnectPins(referenceDesignator: ReferenceDesignator) {
  return reference.nets.filter((net) => net.name.startsWith("unconnected-")).flatMap((net) => net.nodes)
    .filter((node) => node.ref === referenceDesignator).map((node) => portName(referenceDesignator, node.pin))
}

// KiCad's cartridge case-contact numbers are alphanumeric. tscircuit requires
// numeric pin keys; retain the original numbers as aliases and audit the map.
export function portName(referenceDesignator: string, pinNumber: string) {
  if (/^\d+$/.test(pinNumber)) return `pin${pinNumber}`
  if (referenceDesignator === "P1" && pinNumber === "C1") return "pin33"
  if (referenceDesignator === "P1" && pinNumber === "C2") return "pin34"
  if (referenceDesignator === "P1" && pinNumber === "S1") return "pin35"
  if (referenceDesignator === "P1" && pinNumber === "S2") return "pin36"
  throw new Error(`Unsupported pin number: ${referenceDesignator}.${pinNumber}`)
}

export const schematicOnlyPins = [{ reference: "U1", number: "129" }, { reference: "U1", number: "130" }]
export function isSchematicOnlyPin(referenceDesignator: string, pinNumber: string) {
  return schematicOnlyPins.some((pin) => pin.reference === referenceDesignator && pin.number === pinNumber)
}

export function physicalPadPorts(footprint: ReferenceFootprint) {
  const counts = new Map<KiCadPinNumber, number>()
  // Extra lands use numbers above the existing package's pin range.
  let nextPinNumber = Math.max(...footprint.pads.filter((pad) => pad.number).map((pad) => Number(portName(footprint.reference, pad.number).slice(3)))) + 1
  return footprint.pads.map((pad) => {
    if (!pad.number) return undefined
    const occurrence = counts.get(pad.number) ?? 0
    counts.set(pad.number, occurrence + 1)
    return occurrence === 0 ? portName(footprint.reference, pad.number) : `pin${nextPinNumber++}`
  })
}
