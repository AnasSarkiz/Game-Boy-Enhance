import { Resvg } from "@resvg/resvg-js"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"

const outputDirectory = "dist/s4/power-core"
const circuit = await Bun.file(`${outputDirectory}/circuit.json`).json()
const sheets = circuit.filter((entry) => entry.type === "schematic_sheet")
if (sheets.length !== 6) throw new Error("Expected six connected-stage sheets")

for (const sheet of sheets) {
  const svg = convertCircuitJsonToSchematicSvg(circuit, {
    schematicSheetId: sheet.schematic_sheet_id,
    width: 2000,
    height: 1500,
  })
  const outputPath = `${outputDirectory}/sheet-${sheet.name}`
  await Bun.write(`${outputPath}.svg`, svg)
  await Bun.write(`${outputPath}.png`, new Resvg(svg).render().asPng())
  console.log(`Rendered ${sheet.name}`)
}
