import type { ChipProps } from "@tscircuit/props"

// Pin roles: Allwinner family datasheet tables 4-2/5-2, cross-checked against
// Trellis S4. Exact S4 voltage tolerances remain unqualified; do not invent them.
export const cpuSupplyInputs = [
  20, 26, 29, 34, 46, 48, 49, 50, 51, 65,
  66, 77, 81, 83, 89, 97, 107, 116, 117, 128,
] as const

export const cpuPinAttributes: NonNullable<ChipProps["pinAttributes"]> = {
  ...Object.fromEntries(cpuSupplyInputs.map((pin) => [
    `pin${pin}`, { requiresPower: true, mustBeConnected: true },
  ])),
  pin28: { providesPower: true, mustBeConnected: true },
  pin30: { providesPower: true, mustBeConnected: true },
  pin91: { requiresGround: true, mustBeConnected: true },
  pin129: { requiresGround: true, mustBeConnected: true },
  pin106: { doNotConnect: true },
}
