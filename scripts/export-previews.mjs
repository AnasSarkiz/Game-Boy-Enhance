import { readFileSync, writeFileSync, mkdirSync } from "node:fs"
import { convertCircuitJsonToSchematicSvg, convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { Resvg } from "@resvg/resvg-js"
const circuit = JSON.parse(readFileSync("dist/index/circuit.json", "utf8"))
mkdirSync("docs/previews",{ recursive: true })
for (const sheet of circuit.filter(e => e.type === "schematic_sheet")) {
 const svg = convertCircuitJsonToSchematicSvg(circuit,{ schematicSheetId:sheet.schematic_sheet_id,width:2400,height:2000 })
 writeFileSync(`docs/previews/${sheet.name}.svg`,svg.replace(/[ \t]+$/gm, ""))
 writeFileSync(`docs/previews/${sheet.name}.png`,new Resvg(svg).render().asPng())
}
for (const layer of ["top","bottom"]) {
 const svg = convertCircuitJsonToPcbSvg(circuit,{ layer,width:1600,height:1000 })
 writeFileSync(`docs/previews/pcb-${layer}.svg`,svg)
 writeFileSync(`docs/previews/pcb-${layer}.png`,new Resvg(svg).render().asPng())
}
