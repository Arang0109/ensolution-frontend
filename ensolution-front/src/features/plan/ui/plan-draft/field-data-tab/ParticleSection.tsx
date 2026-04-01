import { useState } from "react";
import { createPortal } from "react-dom";

import type { MeasurementSheetEditForm, MeasurementpointEditForm, ParticleSampleEditForm } from "@/entities/plan/model";
import type { NozzleSpec, TypedEquipmentResponse } from "@/entities/agency/equipment/model";

import {
  TableLabelCell, TableInputCell, TableResultCell, TableSelectableCell, TableActionCell
} from "@shared/ui";

import type { PointRecord } from "@shared/lib";
import type { OrificeDpRecord } from "@plan/util";
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

  return (
    <>
      <tr>
        <TableLabelCell>DGM 입구온도 (<i>P<sub>g</sub></i>)</TableLabelCell>
        {measurementPoints.map((mp, index) => (
          <TableInputCell
            key={index}
            type="number"
            value={mp.inTm}
            onChange={(value) =>
              onChange(index, "inTm", value)
            }
            unit={<i>°C</i>}
          />
        ))}
        <TableResultCell value={display(avgInTemp)} unit={<i>°C</i>} />
      </tr>
      <tr>
        <TableLabelCell>DGM 출구온도 (<i>P<sub>g</sub></i>)</TableLabelCell>
        {measurementPoints.map((mp, index) => (
          <TableInputCell
            key={index}
            type="number"
            value={mp.outTm}
            onChange={(value) =>
              onChange(index, "outTm", value)
            }
            unit={<i>°C</i>}
          />
        ))}
        <TableResultCell value={display(avgOutTemp)} unit={<i>°C</i>} />
      </tr>
      <tr>
        <TableLabelCell>노즐 추천</TableLabelCell>
        <TableActionCell
          colSpan={measurementPoints.length}
        >
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 rounded-md border border-blue-400 px-3 py-1.5 text-xs font-medium text-blue-600 transition-colors hover:bg-blue-50 active:bg-blue-100">
            <Sparkles size={13} strokeWidth={2} />
            auto
          </button>
        </TableActionCell>
        <TableResultCell value="" />
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
          unit="Sm³/hr"
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
        <TableLabelCell>채취시간 (<i>P<sub>g</sub></i>)</TableLabelCell>
        {measurementPoints.map((mp, index) => (
          <TableInputCell
            key={index}
            type="number"
            value={mp.samplingTime}
            onChange={(value) =>
              onChange(index, "samplingTime", value)
            }
            unit={<i>min</i>}
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
