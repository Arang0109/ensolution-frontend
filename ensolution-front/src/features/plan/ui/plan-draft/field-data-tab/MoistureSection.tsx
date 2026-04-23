import type { MoistureEditForm } from "@/entities/plan/model";

import {
  TableLabelCell, TableInputCell, TableResultCell, SectionAccordion
} from "@shared/ui";

import { display } from "@shared/lib";

interface MoistureSectionProps {
  mobileWrap: string;
  desktopWrap: string;

  moisture: MoistureEditForm;
  onChange: (name: keyof MoistureEditForm, value: string) => void;

  weightDiff: number | null;
  tempAvg: number | null;
  dryVolumeDiff: number | null;
  pressureToMmHg: number | null;
  pressureToInchH2O: number | null;
  moistureRatio: number | null;
}

export const MoistureSection = ({
  mobileWrap,
  desktopWrap,

  moisture,
  onChange,

  weightDiff,
  tempAvg,
  dryVolumeDiff,
  pressureToMmHg,
  pressureToInchH2O,
  moistureRatio
}: MoistureSectionProps) => {

  return (
    <SectionAccordion title="Part 2. 수분량 계산">
      {/* Mobile */}
      <div className={mobileWrap}>
        <table className="w-full table-fixed border-collapse text-sm">
          <tbody>
            <tr>
              <TableLabelCell colSpan={3}>게이지압 (<i>mmH<sub>2</sub>O</i>)</TableLabelCell>
            </tr>
            <tr>
              <TableInputCell
                type="number"
                value={moisture.gasMeterGaugePressure}
                onChange={(value) => onChange("gasMeterGaugePressure", value)}
                unit={<>mmH<sub>2</sub>O</>} />
              <TableResultCell value={display(pressureToMmHg)} unit="mmHg" />
              <TableResultCell value={display(pressureToInchH2O)} unit={<>inchH<sub>2</sub>O</>} />
            </tr>
            <tr>
              <TableLabelCell colSpan={3}>흡습병 무게 (<i>g</i>)</TableLabelCell>
            </tr>
            <tr>
              <TableInputCell
                type="number"
                value={moisture.beforeWeight}
                onChange={(value) => onChange("beforeWeight", value)}
                unit="g"
                min={0.00}
                step={0.01}/>
              <TableInputCell
                type="number"
                value={moisture.afterWeight}
                onChange={(value) => onChange("afterWeight", value)}
                unit="g"
                min={0.00}
                step={0.01}/>
              <TableResultCell value={display(weightDiff)} unit="g" />
            </tr>
            <tr>
              <TableLabelCell colSpan={3}>온도 (<i>°C</i>)</TableLabelCell>
            </tr>
            <tr>
              <TableInputCell
                type="text"
                value={moisture.inTemperature}
                onChange={(value) => onChange("inTemperature", value)}
                unit="°C" />
              <TableInputCell
                type="text"
                value={moisture.outTemperature}
                onChange={(value) => onChange("outTemperature", value)}
                unit="°C" />
              <TableResultCell value={display(tempAvg)} unit="°C" />
            </tr>
            <tr>
              <TableLabelCell colSpan={3}>흡인량 (<i>L</i>)</TableLabelCell>
            </tr>
            <tr>
              <TableInputCell
                type="number"
                value={moisture.beforeDryVolume}
                onChange={(value) => onChange("beforeDryVolume", value)}
                unit="L"
                min={0.000}
                step={0.001}
                />
              <TableInputCell
                type="number"
                value={moisture.afterDryVolume}
                onChange={(value) => onChange("afterDryVolume", value)}
                unit="L"
                min={0.000}
                step={0.001}
                />
              <TableResultCell value={display(dryVolumeDiff)} unit="L" />
            </tr>
            <tr>
              <TableLabelCell>흡인유속 (<i>m/s</i>)</TableLabelCell>
              <TableInputCell
                colSpan={2}
                type="number"
                value={moisture.suctionVelocity}
                onChange={(value) => onChange("suctionVelocity", value)}
                unit="m/s"
                min={0.0}
                step={0.1}
                />
            </tr>
            <tr>
              <TableLabelCell>수분량 (<i>%</i>)</TableLabelCell>
              <TableResultCell colSpan={2} value={display(moistureRatio)} unit="%" />
            </tr>
          </tbody>
        </table>
      </div>

      {/* Desktop */}
      <div className={desktopWrap}>
        <table className="w-full table-fixed border-collapse text-sm">
          <colgroup>
            <col style={{ width: "17%" }} />
            <col style={{ width: "11%" }} />
            <col style={{ width: "11%" }} />
            <col style={{ width: "11%" }} />
            <col style={{ width: "17%" }} />
            <col style={{ width: "11%" }} />
            <col style={{ width: "11%" }} />
            <col style={{ width: "11%" }} />
          </colgroup>
          <tbody>
            <tr>
              <TableLabelCell>흡습병 무게 (<i>g</i>)</TableLabelCell>
              <TableInputCell
                type="number"
                value={moisture.beforeWeight}
                onChange={(value) => onChange("beforeWeight", value)}
                unit="g"
                min={0.00}
                step={0.01}/>
              <TableInputCell
                type="number"
                value={moisture.afterWeight}
                onChange={(value) => onChange("afterWeight", value)}
                unit="g"
                min={0.00}
                step={0.01}/>
              <TableResultCell value={display(weightDiff)} unit="g" />
              <TableLabelCell>게이지압 (<i>mmH<sub>2</sub>O</i>)</TableLabelCell>
              <TableInputCell
                type="number"
                value={moisture.gasMeterGaugePressure}
                onChange={(value) => onChange("gasMeterGaugePressure", value)}
                unit={<>mmH<sub>2</sub>O</>} />
              <TableResultCell value={display(pressureToMmHg)} unit="mmHg" />
              <TableResultCell value={display(pressureToInchH2O)} unit={<>inchH<sub>2</sub>O</>} />
            </tr>
            <tr>
              <TableLabelCell>온도 (<i>°C</i>)</TableLabelCell>
              <TableInputCell type="text" value={moisture.inTemperature} onChange={(value) => onChange("inTemperature", value)} unit="°C" />
              <TableInputCell type="text" value={moisture.outTemperature} onChange={(value) => onChange("outTemperature", value)} unit="°C" />
              <TableResultCell value={display(tempAvg)} unit="°C" />
              <TableLabelCell>흡인유속 (<i>m/s</i>)</TableLabelCell>
              <TableInputCell
                type="number" colSpan={3} value={moisture.suctionVelocity} onChange={(value) => onChange("suctionVelocity", value)} unit="m/s" />
                min={0.0} step={0.1}
            </tr>
            <tr>
              <TableLabelCell>흡인량 (<i>L</i>)</TableLabelCell>
              <TableInputCell
                type="number" value={moisture.beforeDryVolume} onChange={(value) => onChange("beforeDryVolume", value)} unit="L" />
                min={0.000} step={0.001}
              <TableInputCell
                type="number" value={moisture.afterDryVolume} onChange={(value) => onChange("afterDryVolume", value)} unit="L" />
                min={0.000} step={0.001}
              <TableResultCell value={display(dryVolumeDiff)} unit="L" />
              <TableLabelCell>수분량 (<i>%</i>)</TableLabelCell>
              <TableResultCell colSpan={3} value={display(moistureRatio)} unit="%" />
            </tr>
          </tbody>
        </table>
      </div>
    </SectionAccordion>
  )
}
