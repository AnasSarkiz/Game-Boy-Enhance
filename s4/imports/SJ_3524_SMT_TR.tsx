import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["pin1"],
  pin2: ["pin2"],
  pin3: ["pin3"],
  pin4: ["pin4"]
} as const

export const SJ_3524_SMT_TR = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      symbol={
        <symbol>
          <schematicpath points={[{"x":-0.2,"y":-0.4},{"x":-0.3,"y":-0.3},{"x":-0.2,"y":-0.4},{"x":-0.1,"y":-0.3}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.2,"y":0},{"x":-0.2,"y":0},{"x":-0.2,"y":-0.4}]} strokeColor="#880000" />
          <port name="pin4" pinNumber={4} aliases={["4"]} direction="right" schX={0.4} schY={0} schStemLength={0.2} />
          <port name="pin2" pinNumber={2} aliases={["2"]} direction="right" schX={0.4} schY={-0.4} schStemLength={0.2} />
          <schematicpath points={[{"x":0.2,"y":-0.4},{"x":-0.4,"y":-0.4},{"x":-0.5,"y":-0.3},{"x":-0.6,"y":-0.4}]} strokeColor="#880000" />
          <schematicrect schX={-0.4} schY={-0.03} width={0.12} height={0.34} color="#880000" />
          <schematicpath points={[{"x":-0.4,"y":0.14},{"x":-0.4,"y":0.5},{"x":0.2,"y":0.5}]} strokeColor="#880000" />
          <schematicpath points={[{"x":0.2,"y":0.3},{"x":-0.22,"y":0.3},{"x":-0.24,"y":0.24},{"x":-0.26,"y":0.3}]} strokeColor="#880000" />
          <port name="pin1" pinNumber={1} aliases={["1"]} direction="right" schX={0.4} schY={0.5} schStemLength={0.2} />
          <port name="pin3" pinNumber={3} aliases={["3"]} direction="right" schX={0.4} schY={0.3} schStemLength={0.2} />
        </symbol>
      }
      supplierPartNumbers={{
  "jlcpcb": [
    "C20182907"
  ]
}}
      manufacturerPartNumber="SJ-3524-SMT-TR"
      footprint={<footprint>
        <hole pcbX="1.3000482mm" pcbY="0mm" diameter="1.700022mm" />
<hole pcbX="-5.6999378mm" pcbY="0mm" diameter="1.700022mm" />
<smtpad portHints={["pin4"]} pcbX="6.6000122mm" pcbY="0.750062mm" width="2.5999948mm" height="2.7999944mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="2.6000202mm" pcbY="-3.700018mm" width="2.7999944mm" height="2.7999944mm" shape="rect" />
<smtpad portHints={["pin1"]} pcbX="-6.8000118mm" pcbY="-3.700018mm" width="2.1999956mm" height="2.7999944mm" shape="rect" />
<smtpad portHints={["pin3"]} pcbX="-4.8000158mm" pcbY="3.700018mm" width="2.1999956mm" height="2.7999944mm" shape="rect" />
<silkscreenpath route={[{"x":-11.700052799999753,"y":-2.5000204000000394},{"x":-11.700052799999753,"y":2.499969599999986},{"x":-9.20005779999974,"y":2.499969599999986},{"x":-9.20005779999974,"y":2.999968600000102},{"x":-6.131178999999861,"y":2.999968600000102}]} />
<silkscreenpath route={[{"x":-8.130717799999843,"y":-3.0002479999999423},{"x":-9.20005779999974,"y":-3.0002479999999423},{"x":-9.20005779999974,"y":-2.4998679999998785},{"x":-11.699417799999765,"y":-2.4998679999998785}]} />
<silkscreenpath route={[{"x":-9.20005779999974,"y":2.499969599999986},{"x":-9.20005779999974,"y":-2.5000204000000394}]} />
<silkscreenpath route={[{"x":0.9687814000001254,"y":-3.000019400000042},{"x":-5.468899399999827,"y":-3.000019400000042}]} />
<silkscreenpath route={[{"x":5.299913200000219,"y":-0.8811005999999679},{"x":5.299913200000219,"y":-3.000019400000042},{"x":4.231055800000149,"y":-3.000019400000042}]} />
<silkscreenpath route={[{"x":-3.4689033999998173,"y":2.999968600000102},{"x":5.299913200000219,"y":2.999968600000102},{"x":5.299913200000219,"y":2.381173800000056}]} />
<silkscreentext text="{NAME}" pcbX="-1.9204178mm" pcbY="6.102352mm" anchorAlignment="center" fontSize="1mm" />
<fabricationnotepath route={[{"x":-9.20005779999974,"y":2.499969599999986},{"x":-11.70005279999964,"y":2.499969599999986},{"x":-11.70005279999964,"y":-2.5000203999999258},{"x":-9.20005779999974,"y":-2.5000203999999258},{"x":-9.20005779999974,"y":2.499969599999986}]} strokeWidth="0.254mm" />
<courtyardoutline outline={[{"x":-11.98751779999975,"y":5.35235200000011},{"x":8.146682200000214,"y":5.35235200000011},{"x":8.146682200000214,"y":-5.358447999999953},{"x":-11.98751779999975,"y":-5.358447999999953},{"x":-11.98751779999975,"y":5.35235200000011}]} />
      </footprint>}

      {...props}
    />
  )
}