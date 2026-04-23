import { useState } from "react";
import { createPortal } from "react-dom";

import type { MeasurementSheetEditForm, MeasurementpointEditForm, ParticleSampleEditForm } from "@/entities/plan/model";
import type { NozzleSpec, TypedEquipmentResponse } from "@/entities/agency/equipment/model";

import {
  TableLabelCell, TableInputCell, TableResultCell, TableSelectableCell, TableActionCell
} from "@shared/ui";

import type { PointRecord } from "@shared/lib";
import type { OrificeDpRecord } from "@/features/plan/util";
import { display } from "@shared/lib";
import { Sparkles } from "lucide-react";
import { NozzleRecommendModal } from "./nozzle-modal";

interface ParticleSectionProps {
  sheet: MeasurementSheetEditForm;
  onChange: (index: number, name: keyof MeasurementpointEditForm, value: string) => void;
  onSheetChange: (name: keyof MeasurementSheetEditForm, value: string) => void;
  onParticleSampleChange: (name: keyof ParticleSampleEditForm, value: string | null) => void;

  avgInTemp: number | null;
  avgOutTemp: number | null;

  recommendList: {
    nozzle: number,
    orificeDp: number | null,
    Vm: number | null,
    Vlc: number | null,
    samplingTime: number | null,
  }[];
  orificeDpRecord: OrificeDpRecord;

  standardGasDensityList: PointRecord;
  avgGasVelocity: number | null;
  gasVelocityList: PointRecord;
  pitotTubeCoefficient: number | null;

  selectedNZ?: TypedEquipmentResponse;
}

export const ParticleSection = ({
  sheet,
  onChange,
  // onSheetChange,
  onParticleSampleChange,

  avgInTemp,
  avgOutTemp,

  recommendList,
  orificeDpRecord,

  standardGasDensityList,
  gasVelocityList,
  pitotTubeCoefficient,

  selectedNZ,
}: ParticleSectionProps) => {
  const [showAddModal, setShowAddModal] = useState(false);

  const measurementPoints = sheet.measurementPoints;

  const nozzleSizeOptions =
    ((selectedNZ?.spec as NozzleSpec | undefined)?.diameters ?? []).map(d => ({
      label: `${d.diameter} cm`,
      value: String(d.diameter),
  }));

  const orificeDpEntries = Object.entries(orificeDpRecord).sort(([a], [b]) => Number(a) - Number(b));
  const gasDensityEntries = Object.entries(standardGasDensityList).sort(([a], [b]) => Number(a) - Number(b));
  const gasVelocityEntries = Object.entries(gasVelocityList).sort(([a], [b]) => Number(a) - Number(b));

  const calcEndTime = (startTime: string, totalMinutes: number): string => {
    if (!startTime || totalMinutes <= 0) return "";
    const [h, m] = startTime.split(":").map(Number);
    const endTotal = h * 60 + m + totalMinutes;
    return `${String(Math.floor(endTotal / 60) % 24).padStart(2, "0")}:${String(endTotal % 60).padStart(2, "0")}`;
  };

  const getTotalSamplingTime = (overrideIndex?: number, overrideValue?: string) =>
    measurementPoints.reduce((sum, mp, i) => {
      const t = Number(i === overrideIndex ? overrideValue : mp.samplingTime);
      return sum + (isNaN(t) ? 0 : t);
    }, 0);

  const handleSamplingTimeChange = (index: number, value: string) => {
    onChange(index, "samplingTime", value);
    const endTime = calcEndTime(sheet.particleSample.samplingStartTime, getTotalSamplingTime(index, value));
    if (endTime) onParticleSampleChange("samplingEndTime", endTime);
  };

  const handleStartTimeChange = (value: string) => {
    onParticleSampleChange("samplingStartTime", value);
    const endTime = calcEndTime(value, getTotalSamplingTime());
    if (endTime) onParticleSampleChange("samplingEndTime", endTime);
  };

  return (
    <>
      <tr>
        <TableLabelCell>DGM 입구온도 (<i>P<sub>g</sub></i>)</TableLabelCell>
        {measurementPoints.map((mp, index) => (
          <TableInputCell
            key={index}
            type="text"
            value={mp.inTm}
            onChange={(value) =>
              onChange(index, "inTm", value)
            }
            unit={<i>°C</i>}
          />
        ))}
        <TableResultCell value={display(avgInTemp, 1)} unit={<i>°C</i>} />
      </tr>
      <tr>
        <TableLabelCell>DGM 출구온도 (<i>P<sub>g</sub></i>)</TableLabelCell>
        {measurementPoints.map((mp, index) => (
          <TableInputCell
            key={index}
            type="text"
            value={mp.outTm}
            onChange={(value) =>
              onChange(index, "outTm", value)
            }
            unit={<i>°C</i>}
          />
        ))}
        <TableResultCell value={display(avgOutTemp, 1)} unit={<i>°C</i>} />
      </tr>
      <tr>
        <TableLabelCell>노즐 추천</TableLabelCell>
        <TableActionCell
          colSpan={measurementPoints.length + 1}
        >
          <button
            onClick={() => setShowAddModal(true)}
            className="flex w-full items-center gap-1.5 rounded-md border border-primary-400 px-3 py-0.5 text-xs font-medium text-primary-600 transition-colors hover:bg-primary-50 active:bg-primary-100">
            <Sparkles size={10} strokeWidth={2} />
            auto calc
          </button>
        </TableActionCell>
      </tr>
      <tr>
        <TableLabelCell>노즐 사이즈</TableLabelCell>
        <TableSelectableCell
          value={sheet.particleSample.nozzleSize}
          options={nozzleSizeOptions}
          colSpan={measurementPoints.length}
          onChange={(value) => onParticleSampleChange("nozzleSize", value)}
        />
        <TableResultCell value="" />
      </tr>
      <tr>
        <TableLabelCell>피토우관 계수 (<i>C<sub>P</sub></i>)</TableLabelCell>
        <TableResultCell
          value={display(pitotTubeCoefficient)}
          colSpan={measurementPoints.length + 1}
        />
      </tr>
      <tr>
        <TableLabelCell>배출가스 밀도 (<i>ρ</i>)</TableLabelCell>
        {gasDensityEntries.map(([key, value]) => (
          <TableResultCell
            key={key}
            value={display(value)}
            unit={<i>kg/m³</i>}
          />
        ))}
        <TableResultCell value="" />
      </tr>
      <tr>
        <TableLabelCell>배출가스 유속 (<i>V<sub>s</sub></i>)</TableLabelCell>
        {gasVelocityEntries.map(([key, value]) => (
          <TableResultCell
            key={key}
            value={display(value)}
            unit={<i>m/s</i>}
          />
        ))}
        <TableResultCell value="" />
      </tr>
      <tr>
        <TableLabelCell>오리피스 차압 (△<i>H</i>)</TableLabelCell>
        {orificeDpEntries.map(([key, entry]) => (
          <TableResultCell
            key={key}
            value={display(entry.orificeDp)}
            unit={<i>m/s</i>}
          />
        ))}
        <TableResultCell value="" />
      </tr>
      <tr>
        <TableLabelCell>K Factor</TableLabelCell>
        {orificeDpEntries.map(([key, entry]) => (
          <TableResultCell
            key={key}
            value={display(entry.kFactor)}
            unit={<i>m/s</i>}
          />
        ))}
        <TableResultCell value="" />
      </tr>
      <tr>
        <TableLabelCell>입자상물질 채취시작시간</TableLabelCell>
        <TableInputCell
          colSpan={2}
          type="time"
          value={sheet.particleSample.samplingStartTime}
          onChange={handleStartTimeChange}
        />
      </tr>
      <tr>
        <TableLabelCell>채취시간</TableLabelCell>
        {measurementPoints.map((mp, index) => (
          <TableInputCell
            key={index}
            type="number"
            value={mp.samplingTime}
            onChange={(value) => handleSamplingTimeChange(index, value)}
            unit={<i>min</i>}
             min={0} step={1}
          />
        ))}
      </tr>
      <tr>
        <TableLabelCell>흡입량 (전)</TableLabelCell>
        {measurementPoints.map((mp, index) => (
          <TableInputCell
            key={index}
            type="number"
            value={mp.beforeVm}
            onChange={(value) =>
              onChange(index, "beforeVm", value)
            }
            unit={<i>°C</i>}
            min={0.00000} step={0.00001}
          />
        ))}
      </tr>
      <tr>
        <TableLabelCell>흡입량 (후)</TableLabelCell>
        {measurementPoints.map((mp, index) => (
          <TableInputCell
            key={index}
            type="number"
            value={mp.afterVm}
            onChange={(value) =>
              onChange(index, "afterVm", value)
            }
            unit={<i>°C</i>}
            min={0.00000} step={0.00001}
          />
        ))}
      </tr>
      <tr>
        <TableLabelCell>등속흡입계수 (<i>I</i>)</TableLabelCell>
        {orificeDpEntries.map(([key, entry]) => (
          <TableResultCell
            key={key}
            value={display(entry.isokineticRatio)}
            unit={<i>%</i>}
          />
        ))}
        <TableResultCell value="" />
      </tr>
      <tr>
        <TableLabelCell>진공게이지압</TableLabelCell>
        {measurementPoints.map((mp, index) => (
          <TableInputCell
            key={index}
            type="number"
            value={mp.vacuumGaugePressure}
            onChange={(value) =>
              onChange(index, "vacuumGaugePressure", value)
            }
            unit={<i>°C</i>}
            min={0.00} step={0.01}
          />
        ))}
      </tr>
      <tr>
        <TableLabelCell>최종임핀저 출구온도</TableLabelCell>
        {measurementPoints.map((mp, index) => (
          <TableInputCell
            key={index}
            type="number"
            value={mp.finalImpingerTemperature}
            onChange={(value) =>
              onChange(index, "finalImpingerTemperature", value)
            }
            unit={<i>°C</i>}
            min={0.0} step={0.1}
          />
        ))}
      </tr>

      {showAddModal && createPortal(
        <NozzleRecommendModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => console.log("success")}
          sheet={sheet}
          onParticleSampleChange={onParticleSampleChange}
          recommendList={recommendList}
        />, document.body)}

    </>
    );
  };
