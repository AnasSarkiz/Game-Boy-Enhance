import { readFileSync, writeFileSync } from "node:fs"
import { rotateDEG, applyToPoint } from "transformation-matrix"
import { reference } from "../lib/reference.ts"
import { mappedPorts } from "../lib/pin-mapping.ts"
const circuit = JSON.parse(readFileSync("dist/index/circuit.json", "utf8"))
const mean = points => ({ x: points.reduce((sum,p) => sum + p.x,0) / points.length, y: points.reduce((sum,p) => sum + p.y,0) / points.length })
const findings = []
for (const footprint of reference.footprints) {
  if (["SW4","SW5","SW6"].includes(footprint.reference)) continue
  const source = circuit.find(e => e.type === "source_component" && e.name === footprint.reference)
  if (!source?.supplier_part_numbers?.jlcpcb) continue
  const component = circuit.find(e => e.type === "pcb_component" && e.source_component_id === source.source_component_id)
  const pairs = []
  const schematicPins = reference.components.find(c => c.reference === footprint.reference).pins.map(p => p.num)
  for (const pin of new Set(footprint.pads.map(p => p.number).filter(p => schematicPins.includes(p)))) {
    const referencePoint = mean(footprint.pads.filter(p => p.number === pin).map(p => p.center))
    const portNumbers = mappedPorts(footprint.reference, pin).map(p => Number(p.slice(3)))
    const sourcePorts = circuit.filter(e => e.type === "source_port" && e.source_component_id === source.source_component_id && portNumbers.includes(e.pin_number)).map(e => e.source_port_id)
    const pcbPorts = circuit.filter(e => e.type === "pcb_port" && sourcePorts.includes(e.source_port_id)).map(e => e.pcb_port_id)
    const pads = circuit.filter(e => ["pcb_smtpad","pcb_plated_hole"].includes(e.type) && pcbPorts.includes(e.pcb_port_id))
    if (pads.length) pairs.push({ reference: referencePoint, catalog: mean(pads) })
  }
  if (pairs.length < 2) continue
  const originalCenter = mean(pairs.map(p => p.reference))
  const catalogCenter = mean(pairs.map(p => p.catalog))
  const normalizedPairs = pairs.map(p => ({ reference: { x:p.reference.x-originalCenter.x,y:p.reference.y-originalCenter.y }, catalog: { x:p.catalog.x-catalogCenter.x,y:p.catalog.y-catalogCenter.y } }))
  const candidates = [0,90,180,270].map(angle => {
    const matrix = rotateDEG(angle)
    const squaredError = normalizedPairs.reduce((sum,p) => {
      const rotated = applyToPoint(matrix,p.catalog)
      return sum + (rotated.x-p.reference.x)**2 + (rotated.y-p.reference.y)**2
    },0)
    return { additionalCcwRotationDegrees: angle, rmsPinPositionDifferenceMm: Math.sqrt(squaredError/pairs.length) }
  }).sort((a,b) => a.rmsPinPositionDifferenceMm - b.rmsPinPositionDifferenceMm)
  findings.push({ reference: footprint.reference, pinPairs: pairs.length, currentRotationDegrees: component.rotation,
    best: candidates[0], current: candidates.find(c => c.additionalCcwRotationDegrees === 0) })
}
writeFileSync("reports/orientation-comparison.json", JSON.stringify(findings,null,2)+"\n")
console.log(JSON.stringify(findings.filter(f => f.best.additionalCcwRotationDegrees && f.current.rmsPinPositionDifferenceMm-f.best.rmsPinPositionDifferenceMm > 0.4),null,2))
