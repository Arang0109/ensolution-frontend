import type { ExhaustGasEditForm } from "@/entities/plan/model";

import {
  TableLabelCell, TableInputCell, TableResultCell, TableResultWithLabelCell, SectionAccordion
} from "@shared/ui";
import { display } from "@shared/lib";

interface ExhaustGasSectionProps {
  mobileWrap: string;
  desktopWrap: string;

  exhaustGas: ExhaustGasEditForm;
  onChange: (name: keyof ExhaustGasEditForm, value: string, index: number) => void;

  standardOxygen: string;

  o2ConcentrationAvg: number | null;
  co2ConcentrationAvg: number | null;
  coConcentrationAvg: number | null;
  n2ConcentrationAvg: number | null;
  noxConcentrationAvg: number | null;
  soxConcentrationAvg: number | null;
  oxygenCorrectionFactor: number | null;
  standardGasDensity: number | null;
}

const O2Row = ({
  exhaustGas,
  onChange,
  o2ConcentrationAvg
}: {
  exhaustGas: ExhaustGasSectionProps["exhaustGas"];
  onChange: ExhaustGasSectionProps["onChange"];
  o2ConcentrationAvg: ExhaustGasSectionProps["o2ConcentrationAvg"]
}) => (
  <>
    <TableLabelCell>O<sub>2</sub> (%)</TableLabelCell>
    <TableInputCell type="number" value={exhaustGas.o2Concentration[0]} onChange={(value) => onChange("o2Concentration", value, 0)} />
    <TableInputCell type="number" value={exhaustGas.o2Concentration[1]} onChange={(value) => onChange("o2Concentration", value, 1)} />
    <TableInputCell type="number" value={exhaustGas.o2Concentration[2]} onChange={(value) => onChange("o2Concentration", value, 2)} />
    <TableResultCell value={display(o2ConcentrationAvg)} unit="%" />
  </>
);

const CO2Row = ({
  exhaustGas,
  onChange,
  co2ConcentrationAvg
}: {
  exhaustGas: ExhaustGasSectionProps["exhaustGas"];
  onChange: ExhaustGasSectionProps["onChange"];
  co2ConcentrationAvg: ExhaustGasSectionProps["co2ConcentrationAvg"]
}) => (
  <>
    <TableLabelCell>CO<sub>2</sub> (%)</TableLabelCell>
    <TableInputCell type="number" value={exhaustGas.co2Concentration[0]} onChange={(value) => onChange("co2Concentration", value, 0)} />
    <TableInputCell type="number" value={exhaustGas.co2Concentration[1]} onChange={(value) => onChange("co2Concentration", value, 1)} />
    <TableInputCell type="number" value={exhaustGas.co2Concentration[2]} onChange={(value) => onChange("co2Concentration", value, 2)} />
    <TableResultCell value={display(co2ConcentrationAvg)} unit="%" />
  </>
);

const CORow = ({
  exhaustGas,
  onChange,
  coConcentrationAvg
}: {
  exhaustGas: ExhaustGasSectionProps["exhaustGas"];
  onChange: ExhaustGasSectionProps["onChange"];
  coConcentrationAvg: ExhaustGasSectionProps["coConcentrationAvg"]
}) => (
  <>
    <TableLabelCell>CO (%)</TableLabelCell>
    <TableInputCell type="number" value={exhaustGas.coConcentration[0]} onChange={(value) => onChange("coConcentration", value, 0)} />
    <TableInputCell type="number" value={exhaustGas.coConcentration[1]} onChange={(value) => onChange("coConcentration", value, 1)} />
    <TableInputCell type="number" value={exhaustGas.coConcentration[2]} onChange={(value) => onChange("coConcentration", value, 2)} />
    <TableResultCell value={display((coConcentrationAvg))} unit="%" />
  </>
);

const NoxRow = ({
  exhaustGas,
  onChange,
  noxConcentrationAvg
}: {
  exhaustGas: ExhaustGasSectionProps["exhaustGas"];
  onChange: ExhaustGasSectionProps["onChange"];
  noxConcentrationAvg: ExhaustGasSectionProps["noxConcentrationAvg"]
}) => (
  <>
    <TableLabelCell>NO<sub>X</sub> (ppm)</TableLabelCell>
    <TableInputCell type="number" value={exhaustGas.noxConcentration[0]} onChange={(value) => onChange("noxConcentration", value, 0)} />
    <TableInputCell type="number" value={exhaustGas.noxConcentration[1]} onChange={(value) => onChange("noxConcentration", value, 1)} />
    <TableInputCell type="number" value={exhaustGas.noxConcentration[2]} onChange={(value) => onChange("noxConcentration", value, 2)} />
    <TableResultCell value={display(noxConcentrationAvg)} unit="ppm" />
  </>
);

const SoxRow = ({
  exhaustGas,
  onChange,
  soxConcentrationAvg
}: {
  exhaustGas: ExhaustGasSectionProps["exhaustGas"];
  onChange: ExhaustGasSectionProps["onChange"];
  soxConcentrationAvg: ExhaustGasSectionProps["soxConcentrationAvg"]
}) => (
  <>
    <TableLabelCell>SO<sub>X</sub> (ppm)</TableLabelCell>
    <TableInputCell type="number" value={exhaustGas.soxConcentration[0]} onChange={(value) => onChange("soxConcentration", value, 0)} />
    <TableInputCell type="number" value={exhaustGas.soxConcentration[1]} onChange={(value) => onChange("soxConcentration", value, 1)} />
    <TableInputCell type="number" value={exhaustGas.soxConcentration[2]} onChange={(value) => onChange("soxConcentration", value, 2)} />
    <TableResultCell value={display(soxConcentrationAvg)} unit="ppm" />
  </>
);

export const ExhaustGasSection = ({
  mobileWrap,
  desktopWrap,

  exhaustGas,
  onChange,

  standardOxygen,

  o2ConcentrationAvg,
  co2ConcentrationAvg,
  coConcentrationAvg,
  n2ConcentrationAvg,
  noxConcentrationAvg,
  soxConcentrationAvg,
  oxygenCorrectionFactor,
  standardGasDensity,
}: ExhaustGasSectionProps) => {

  return (
    <SectionAccordion title="Part 3. 배출가스정보">
      {/* Mobile */}
      <div className={mobileWrap}>
        <table className="w-full table-fixed border-collapse text-sm">
          <tbody>
            <tr>
            </tr>
            <tr>
              <TableLabelCell >O<sub>2</sub> (<i>%</i>)</TableLabelCell>
              <TableInputCell type="number" value={exhaustGas.o2Concentration[0]} onChange={(value) => onChange("o2Concentration", value, 0)} unit="%" />
              <TableInputCell type="number" value={exhaustGas.o2Concentration[1]} onChange={(value) => onChange("o2Concentration", value, 1)} unit="%" />
              <TableInputCell type="number" value={exhaustGas.o2Concentration[2]} onChange={(value) => onChange("o2Concentration", value, 2)} unit="%" />
            </tr>
            <tr>
              <TableLabelCell>CO<sub>2</sub> (<i>%</i>)</TableLabelCell>
              <TableInputCell type="number" value={exhaustGas.co2Concentration[0]} onChange={(value) => onChange("co2Concentration", value, 0)} unit="%" />
              <TableInputCell type="number" value={exhaustGas.co2Concentration[1]} onChange={(value) => onChange("co2Concentration", value, 1)} unit="%" />
              <TableInputCell type="number" value={exhaustGas.co2Concentration[2]} onChange={(value) => onChange("co2Concentration", value, 2)} unit="%" />
            </tr>
            <tr>
              <TableLabelCell>CO (<i>%</i>)</TableLabelCell>
              <TableInputCell type="number" value={exhaustGas.coConcentration[0]} onChange={(value) => onChange("coConcentration", value, 0)} unit="%" />
              <TableInputCell type="number" value={exhaustGas.coConcentration[1]} onChange={(value) => onChange("coConcentration", value, 1)} unit="%" />
              <TableInputCell type="number" value={exhaustGas.coConcentration[2]} onChange={(value) => onChange("coConcentration", value, 2)} unit="%" />
            </tr>
            <tr>

            </tr>
            <tr>
              <TableResultWithLabelCell label={<>O<sub>2</sub> <i>avg</i></>} value={display(o2ConcentrationAvg)} unit="%" />
              <TableResultWithLabelCell label={<>CO<sub>2</sub> <i>avg</i></>} value={display(co2ConcentrationAvg)} unit="%" />
              <TableResultWithLabelCell label={<>CO <i>avg</i></>} value={display(coConcentrationAvg)} unit="%" />
              <TableResultWithLabelCell label={<>N<sub>2</sub> <i>avg</i></>} value={display(n2ConcentrationAvg)} unit="%" />
            </tr>
            {/* <tr>
              <TableLabelCell colSpan={4}>NO<sub>X</sub> (<i>ppm</i>)</TableLabelCell>
            </tr>
            <tr>
              <TableInputCell value={exhaustGas.co2Concentration[0]} onChange={(value) => onChange("noxConcentration", value, 0)} unit="ppm" />
              <TableInputCell value={exhaustGas.co2Concentration[1]} onChange={(value) => onChange("noxConcentration", value, 1)} unit="ppm" />
              <TableInputCell value={exhaustGas.co2Concentration[2]} onChange={(value) => onChange("noxConcentration", value, 2)} unit="ppm" />
              <TableResultCell value={display(noxConcentrationAvg)} unit="ppm" />
            </tr>
            <tr>
              <TableLabelCell colSpan={4}>SO<sub>X</sub> (<i>ppm</i>)</TableLabelCell>
            </tr>
            <tr>
              <TableInputCell value={exhaustGas.co2Concentration[0]} onChange={(value) => onChange("soxConcentration", value, 0)} unit="ppm" />
              <TableInputCell value={exhaustGas.co2Concentration[1]} onChange={(value) => onChange("soxConcentration", value, 1)} unit="ppm" />
              <TableInputCell value={exhaustGas.co2Concentration[2]} onChange={(value) => onChange("soxConcentration", value, 2)} unit="ppm" />
              <TableResultCell value={display(soxConcentrationAvg)} unit="ppm" />
            </tr> */}
            <tr>
              <TableLabelCell>기준산소농도</TableLabelCell>
              <TableLabelCell>산소보정계수</TableLabelCell>
              <TableLabelCell colSpan={2}>표준상태 배출가스 밀도 (<i>ρ</i>)</TableLabelCell>
            </tr>
            <tr>
              <TableResultCell value={standardOxygen} unit="%" />
              <TableResultCell value={display(oxygenCorrectionFactor)} unit="" />
              <TableResultCell colSpan={2} value={display(standardGasDensity)} unit="kg/m³" />
            </tr>
          </tbody>
        </table>
      </div>

      {/* Desktop */}
      <div className={desktopWrap}>
        <table className="w-full table-fixed border-collapse text-sm">
          <tbody>
            <tr>
              <O2Row
                exhaustGas={exhaustGas}
                onChange={onChange}
                o2ConcentrationAvg={o2ConcentrationAvg}
              />
              <CO2Row
                exhaustGas={exhaustGas}
                onChange={onChange}
                co2ConcentrationAvg={co2ConcentrationAvg}
              />
              <CORow
                exhaustGas={exhaustGas}
                onChange={onChange}
                coConcentrationAvg={coConcentrationAvg}
              />
            </tr>
            <tr>
              <TableLabelCell>N<sub>2</sub></TableLabelCell>
              <TableResultCell colSpan={4} value={display(n2ConcentrationAvg)} unit="%" />
              <NoxRow
                exhaustGas={exhaustGas}
                onChange={onChange}
                noxConcentrationAvg={noxConcentrationAvg}
              />
              <SoxRow
                exhaustGas={exhaustGas}
                onChange={onChange}
                soxConcentrationAvg={soxConcentrationAvg}
              />
            </tr>
            <tr>
              <TableResultWithLabelCell colSpan={5} label="기준산소농도" value={standardOxygen} unit="%" />
              <TableResultWithLabelCell colSpan={5} label="산소보정계수" value={display(oxygenCorrectionFactor)} />
              <TableResultWithLabelCell colSpan={5} label={<>표준상태 배출가스밀도 (<i>ρ</i>)</>} value={display(standardGasDensity)} unit="kg/Nm³" />
            </tr>
          </tbody>
        </table>
      </div>
    </SectionAccordion>
  )
}
