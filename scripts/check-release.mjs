import { readFileSync } from "node:fs"
const circuit = JSON.parse(readFileSync("dist/s4/power-core/circuit.json", "utf8"))
const manifest = JSON.parse(readFileSync("s4/generated/power-core.json", "utf8"))
const blockers = circuit.filter(e => e.type.endsWith("_error") || e.type.endsWith("_warning") || "error_type" in e)
const routedTraces = circuit.filter(e => e.type === "pcb_trace")
for (const blocker of blockers) console.error(`${blocker.type}: ${blocker.message}`)
if (!routedTraces.length) console.error("No routed copper exists. Full routing and copper DRC are required.")
if (!manifest.full_console) console.error("Console circuitry and hardware qualification are incomplete. Do not fabricate.")
if (blockers.length || !routedTraces.length || !manifest.full_console) process.exitCode = 1
