import importedOrientations from "./generated/catalog-orientations.json"
import { boardPoint, getFootprint } from "./reference"

const catalogOrientations: Record<string, number> = importedOrientations

type PlacementAdjustment = { x?: number; y?: number; rotation?: number; reason: string }
// Millimetre offsets from the enlarged reference centers, never footprint edits.
export const placementAdjustments: Record<string, PlacementAdjustment> = {
  SW2: { rotation: 180, reason: "Align the shoulder switch contact axis with the reference." },
  SW1: { y: 4, reason: "Keep the shorter imported power switch within the angled edge." },
  SW3: { x: -3.1, y: -0.3, rotation: 180, reason: "Keep the shoulder switch bracket holes inside the edge." },
  VR2: { x: 13, y: 16, rotation: 195.25, reason: "Clear the original shell cutout and lower board edge." },
  P3: { x: -3, y: 5, reason: "Keep the imported headphone jack copper inside the angled edge." },
  TP0: { x: 1.5, y: -3, reason: "Separate the larger imported test loops TP0 and TP1." },
  TP1: { x: -1.5, y: -1, reason: "Separate the larger imported test loops TP0 and TP1." },
  TP33: { x: 1.5, y: 1, reason: "Separate the larger imported test loops TP33 and TP34." },
  TP34: { x: -1.5, y: -1, reason: "Separate the larger imported test loops TP33 and TP34." },
  TP114: { y: 1, reason: "Clear the imported TP115 courtyard." },
  TP115: { y: -1, reason: "Clear the imported TP114 courtyard." },
  TP15: { x: -2, y: 1, reason: "Clear the C30 courtyard." },
  C35: { x: -2, reason: "Clear the relocated volume control courtyard." },
  C14: { y: -2, reason: "Clear the imported display connector courtyard." },
}
export function componentPlacement(referenceDesignator: string) {
  const footprint = getFootprint(referenceDesignator)
  const center = boardPoint(footprint.position)
  const adjustment = placementAdjustments[referenceDesignator]
  return { x: center.x + (adjustment?.x ?? 0), y: center.y + (adjustment?.y ?? 0),
    rotation: adjustment?.rotation ?? catalogOrientations[referenceDesignator] ?? footprint.rotation }
}
