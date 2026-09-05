import { readFileSync, writeFileSync } from "node:fs"
import assert from "node:assert/strict"
import { connectedNets, reference, netName, isSchematicOnlyPin } from "../lib/reference.ts"
import { mappedEndpoints } from "../lib/pin-mapping.ts"

const circuit = JSON.parse(readFileSync("dist/index/circuit.json", "utf8"))
const components = new Map(circuit.filter(e => e.type === "source_component").map(e => [e.source_component_id, e]))
const ports = new Map(circuit.filter(e => e.type === "source_port").map(e => [e.source_port_id, e]))
const nets = new Map(circuit.filter(e => e.type === "source_net").map(e => [e.source_net_id, e.name]))
const expected = new Set()
const actual = new Set()
const rows = ["reference,original_pin,original_net,physical_endpoint,status"]
for (const net of connectedNets) {
  for (const node of net.nodes) {
    const endpoints = isSchematicOnlyPin(node.ref, node.pin) ? [] : mappedEndpoints(node.ref, node.pin)
    if (!endpoints.length) rows.push([node.ref, node.pin, net.name, "", "documented-omission"].map(JSON.stringify).join(","))
    for (const endpoint of endpoints) {
      const key = `${endpoint.reference}.${endpoint.port}:${netName(net.name)}`
      expected.add(key)
      rows.push([node.ref, node.pin, net.name, `${endpoint.reference}.${endpoint.port}`, "reference-connectivity-only"].map(JSON.stringify).join(","))
    }
  }
}
for (const trace of circuit.filter(e => e.type === "source_trace")) {
  for (const portId of trace.connected_source_port_ids) {
    const port = ports.get(portId)
    assert(port, `Unknown port ${portId}`)
    const component = components.get(port.source_component_id)
    for (const netId of trace.connected_source_net_ids) {
      actual.add(`${component.name}.pin${port.pin_number}:${nets.get(netId)}`)
    }
  }
}
const missing = [...expected].filter(key => !actual.has(key))
const extra = [...actual].filter(key => !expected.has(key))
assert.deepEqual(missing, [], "Reference endpoints missing from compiled circuit")
assert.deepEqual(extra, [], "Unexpected compiled endpoints")
const attachedNets = new Map()
for (const key of actual) {
  const [endpoint, net] = key.split(":")
  const values = attachedNets.get(endpoint) ?? new Set()
  values.add(net)
  attachedNets.set(endpoint, values)
}
for (const [endpoint, netNames] of attachedNets) assert.equal(netNames.size, 1, `${endpoint} shorts different named nets`)

// These checks are deliberately independent of the reference-to-catalog map.
const requireNet = (endpoint, net) => assert(actual.has(`${endpoint}:${net}`), `${endpoint} must connect to ${net}`)
const addressPins = [5,4,3,2,1,44,43,42,27,26,25,24,23,22,21,20,19]
const dataPins = [7,8,9,10,13,14,15,16,29,30,31,32,35,36,37,38]
addressPins.forEach((pin, bit) => requireNet(`U2.pin${pin}`, `CPU_MA_${bit}`))
dataPins.forEach((pin, bit) => requireNet(`U2.pin${pin}`, `CPU_MD_${bit}`))
for (const pin of [11,33]) requireNet(`U2.pin${pin}`, "VDD2")
for (const pin of [6,12,34]) requireNet(`U2.pin${pin}`, "GND")
for (const [pin, net] of [[17,"CPU_WE_N_RAM"],[18,"Net_JP2_B"],[39,"CPU_LB_N"],[40,"CPU_UB_N"],[41,"CPU_OE_N_RAM"]]) requireNet(`U2.pin${pin}`, net)
assert(!attachedNets.has("U2.pin28"), "SRAM NC must remain unconnected")
for (const ref of ["U4","U8"]) {
  requireNet(`${ref}.pin6`, "VOUT3")
  for (const pin of [2,3,7]) requireNet(`${ref}.pin${pin}`, "GND")
}
requireNet("U4.pin1", "VAUD"); requireNet("U4.pin4", "PG_2V5")
requireNet("U8.pin1", "VDD2"); requireNet("U8.pin4", "PG_3V3"); requireNet("U8.pin5", "PG_2V5")
requireNet("SW1.pin3", "SW"); requireNet("SW1.pin1", "VBATT")
assert(!attachedNets.has("SW1.pin2"), "Unused switch throw must stay open")
for (const [name, bit] of [["A",0],["B",1],["SELECT",2],["START",3],["RIGHT",4],["LEFT",5],["UP",6],["DOWN",7]]) {
  for (const pin of [1,3]) requireNet(`SW_${name}.pin${pin}`, `CPU_TP${bit}`)
  for (const pin of [2,4]) requireNet(`SW_${name}.pin${pin}`, "GND")
}
for (const pin of [41,42]) requireNet(`P2.pin${pin}`, "GND")
requireNet("X1.pin1", "CPU_CK1"); requireNet("X1.pin2", "Net_C4_Pad1")
assert.equal(components.size, reference.components.length + 5, "Three composite symbols must become eight physical switches")
// Compare every original fixed R/C value with the actual native primitive value.
const multiplier = { p:1e-12, n:1e-9, u:1e-6, m:1e-3, "":1, k:1e3, M:1e6 }
for (const original of reference.components.filter(c => /^(R|C|CP)\d+$/.test(c.reference))) {
  const source = [...components.values()].find(c => c.name === original.reference)
  const match = original.value.match(/^(\d+(?:\.\d+)?)([pnumkM]?)$/)
  assert(match, `Unparsed reference value ${original.reference}: ${original.value}`)
  const expectedValue = Number(match[1]) * multiplier[match[2]]
  const actualValue = original.reference.startsWith("R") ? source.resistance : source.capacitance
  assert(Math.abs(actualValue - expectedValue) <= Math.max(1e-15, expectedValue * 1e-10), `Wrong value for ${original.reference}`)
}
assert.equal([...components.values()].find(c => c.name === "JP2").resistance, 0, "A17 bank-selection link must be populated")
const board = circuit.find(e => e.type === "pcb_board")
assert.equal(board.num_layers, 4)
assert(board.min_via_pad_diameter >= 0.45 && board.min_via_hole_diameter >= 0.3, "Via constraints below requested minimum")
const pcbComponents = circuit.filter(e => e.type === "pcb_component")
const courtyards = new Set(circuit.filter(e => ["pcb_courtyard_outline","pcb_courtyard_rect","pcb_courtyard_circle","pcb_courtyard_pill"].includes(e.type)).map(e => e.pcb_component_id))
const unresolved = []
for (const pcb of pcbComponents) {
  const source = components.get(pcb.source_component_id)
  if (source.supplier_part_numbers?.jlcpcb?.length) assert(courtyards.has(pcb.pcb_component_id), `${source.name} has no imported courtyard`)
  else unresolved.push(source.name)
}
const counts = {}
for (const e of circuit) if (e.type.endsWith("_error") || e.type.endsWith("_warning")) counts[e.type] = (counts[e.type] ?? 0) + 1
const checkSummary = filename => {
  const log = readFileSync(filename, "utf8")
  const errors = log.match(/Errors:\s*(\d+)/)
  const warnings = log.match(/Warnings:\s*(\d+)/)
  return { errors: errors ? Number(errors[1]) : null, warnings: warnings ? Number(warnings[1]) : null }
}
const report = { timestamp: new Date().toISOString(), referenceComponents: reference.components.length,
  compiledComponents: components.size, referenceNets: connectedNets.length, checkedPhysicalNetEndpoints: expected.size,
  missingEndpoints: missing, extraEndpoints: extra, importedCourtyards: courtyards.size,
  unresolvedComponents: unresolved.sort(), diagnostics: counts, routingEnabled: false,
  placementCheck: checkSummary("reports/catalog-placement-check.log"),
  sourceNetlistCheck: checkSummary("reports/catalog-netlist.log"),
  releaseCheck: "blocked: three unresolved footprints and no routed copper",
  electricalQualification: "Incomplete; reference consistency is not independent datasheet verification." }
writeFileSync("reports/reference-connectivity.csv", rows.join("\n") + "\n")
writeFileSync("reports/current-status.json", JSON.stringify(report, null, 2) + "\n")
const bomRows = ["reference,manufacturer_part_number,jlcpcb,pcb_status"]
for (const component of components.values()) bomRows.push([component.name, component.manufacturer_part_number ?? "", component.supplier_part_numbers?.jlcpcb?.join(";") ?? "", unresolved.includes(component.name) ? "unresolved" : "supplier-imported"].map(JSON.stringify).join(","))
writeFileSync("reports/catalog-bom.csv", bomRows.join("\n") + "\n")
console.log(JSON.stringify(report, null, 2))
