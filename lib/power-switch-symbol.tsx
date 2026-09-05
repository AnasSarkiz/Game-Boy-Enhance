// Nidec CSS-1210B: physical common is terminal 3 (manufacturer page 3).
// Symbol only; all PCB lands and the courtyard remain supplier-imported.
export const powerSwitchSymbol = <symbol>
  <port name="pin3" pinNumber={3} direction="left" schX={-0.6} schY={0} schStemLength={0.2} />
  <port name="pin1" pinNumber={1} direction="right" schX={0.6} schY={0.35} schStemLength={0.2} />
  <port name="pin2" pinNumber={2} direction="right" schX={0.6} schY={-0.35} schStemLength={0.2} />
  <schematicpath points={[{ x: -0.4, y: 0 }, { x: -0.15, y: 0 }, { x: 0.25, y: 0.3 }]} />
  <schematicpath points={[{ x: 0.3, y: 0.35 }, { x: 0.4, y: 0.35 }]} />
  <schematicpath points={[{ x: 0.3, y: -0.35 }, { x: 0.4, y: -0.35 }]} />
</symbol>
