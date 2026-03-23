import type { MoistureEditForm } from "@/entities/plan/model";

import {
  TableLabelCell, TableInputCell, TableResultCell
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

const WeightRow = ({
  moisture,
  onChange,
  weightDiff
}: {
  moisture: MoistureSectionProps["moisture"];
  onChange: MoistureSectionProps["onChange"];
  weightDiff: MoistureSectionProps["weightDiff"];
}) => (
  <>
    <TableLabelCell>흡습병 무게</TableLabelCell>
    <TableInputCell value={moisture.beforeWeight} onChange={(value) => onChange("beforeWeight", value)} unit="g"/>
    <TableInputCell value={moisture.afterWeight} onChange={(value) => onChange("afterWeight", value)} unit="g" />
    <TableResultCell value={display(weightDiff)} unit="g" />
  </>
);

const TemperatureRow = ({
  moisture,
  onChange,
  tempAvg
}: {
  moisture: MoistureSectionProps["moisture"];
  onChange: MoistureSectionProps["onChange"];
  tempAvg: MoistureSectionProps["tempAvg"];
}) => (
  <>
    <TableLabelCell>온도</TableLabelCell>
    <TableInputCell value={moisture.inTemperature} onChange={(value) => onChange("inTemperature", value)} unit="°C" />
    <TableInputCell value={moisture.outTemperature} onChange={(value) => onChange("outTemperature", value)} unit="°C" />
    <TableResultCell value={display(tempAvg)} unit="°C" />
  </>
);

const GaugePressureRow = ({
  moisture,
  onChange,
  colSpan = 1,
}: {
  moisture: MoistureSectionProps["moisture"];
  onChange: MoistureSectionProps["onChange"];
  colSpan?: number;
}) => (
  <>
    <TableLabelCell>게이지압</TableLabelCell>
    <TableInputCell colSpan={colSpan} value={moisture.gasMeterGaugePressure} onChange={(value) => onChange("gasMeterGaugePressure", value)} unit={<>mmH<sub>2</sub>O</>} />
  </>
);

const GaugePressureConvertRow = ({
  pressureToMmHg,
  pressureToInchH2O,
  colSpan = 1,
}: {
  pressureToMmHg: MoistureSectionProps["pressureToMmHg"];
  pressureToInchH2O: MoistureSectionProps["pressureToInchH2O"];
  colSpan?: number;
}) => (
  <>
    <TableResultCell colSpan={colSpan} value={display(pressureToMmHg)} unit="mmHg" />
    <TableResultCell colSpan={colSpan} value={display(pressureToInchH2O)} unit={<>inchH<sub>2</sub>O</>} />
  </>
)

const DryVolumeRow = ({
  moisture,
  onChange,
  dryVolumeDiff,
}: {
  moisture: MoistureSectionProps["moisture"];
  onChange: MoistureSectionProps["onChange"];
  dryVolumeDiff: MoistureSectionProps["dryVolumeDiff"];
}) => (
  <>
    <TableLabelCell>흡인량</TableLabelCell>
    <TableInputCell value={moisture.beforeDryVolume} onChange={(value) => onChange("beforeDryVolume", value)} unit="L" />
    <TableInputCell value={moisture.afterDryVolume} onChange={(value) => onChange("afterDryVolume", value)} unit="L" />
    <TableResultCell value={display(dryVolumeDiff)} unit="L" />
  </>
);

const VelocityRow = ({
  moisture,
  onChange
}: {
  moisture: MoistureSectionProps["moisture"];
  onChange: MoistureSectionProps["onChange"];
}) => (
  <>
    <TableLabelCell>흡인유속</TableLabelCell>
    <TableInputCell value={moisture.suctionVelocity} onChange={(value) => onChange("suctionVelocity", value)} unit="m/s" />
  </>
);

const MoistureRatioRow = ({
  moistureRatio
}: {
  moistureRatio: MoistureSectionProps["moistureRatio"];
}) => (
  <>
    <TableLabelCell>수분량</TableLabelCell>
    <TableResultCell value={display(moistureRatio)} unit="%" />
  </>
)

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
    <section>
      <h3 className="text-sm font-semibold text-gray-700 mb-2">수분량정보</h3>

      {/* Mobile */}
      <div className={mobileWrap}>
        <table className="w-full table-fixed border-collapse text-sm">
          <tbody>
            <tr>
              <WeightRow
                moisture={moisture}
                onChange={onChange}
                weightDiff={weightDiff}
              />
            </tr>
            <tr>
              <TemperatureRow
                moisture={moisture}
                onChange={onChange}
                tempAvg={tempAvg}
              />
            </tr>
            <tr>
              <GaugePressureRow
                colSpan={3}
                moisture={moisture}
                onChange={onChange}
              />
            </tr>
            <tr>
              <GaugePressureConvertRow
                colSpan={2}
                pressureToMmHg={pressureToMmHg}
                pressureToInchH2O={pressureToInchH2O}
              />
            </tr>
            <tr>
              <DryVolumeRow
                moisture={moisture}
                onChange={onChange}
                dryVolumeDiff={dryVolumeDiff}
              />
            </tr>
            <tr>
              <VelocityRow
                moisture={moisture}
                onChange={onChange}
              />
              <MoistureRatioRow
                moistureRatio={moistureRatio}
              />
            </tr>
          </tbody>
        </table>
      </div>

      {/* Desktop */}
      <div className={desktopWrap}>
        <table className="w-full table-fixed border-collapse text-sm">
          <tbody>
            <tr>
              <WeightRow
                moisture={moisture}
                onChange={onChange}
                weightDiff={weightDiff}
              />
              <TemperatureRow
                moisture={moisture}
                onChange={onChange}
                tempAvg={tempAvg}
              />
            </tr>
            <tr>
              <DryVolumeRow
                moisture={moisture}
                onChange={onChange}
                dryVolumeDiff={dryVolumeDiff}
              />
              <GaugePressureRow
                moisture={moisture}
                onChange={onChange}
              />
              <GaugePressureConvertRow
                pressureToMmHg={pressureToMmHg}
                pressureToInchH2O={pressureToInchH2O}
              />
            </tr>
            <tr>
              <VelocityRow
                moisture={moisture}
                onChange={onChange}
              />
              <MoistureRatioRow
                moistureRatio={moistureRatio}
              />
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}