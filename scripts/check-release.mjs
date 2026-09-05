import { readFileSync } from "node:fs"
const circuit = JSON.parse(readFileSync("dist/index/circuit.json", "utf8"))
const blockers = circuit.filter(e => e.type.endsWith("_error"))
const routedTraces = circuit.filter(e => e.type === "pcb_trace")
for (const blocker of blockers) console.error(`${blocker.type}: ${blocker.message}`)
if (!routedTraces.length) console.error("No routed copper exists. Full routing and copper DRC are required.")
if (blockers.length || !routedTraces.length) process.exitCode = 1
