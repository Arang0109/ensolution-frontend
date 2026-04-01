import type { MeasurementSheetEditForm, MeasurementpointEditForm, ParticleSampleEditForm } from "@/entities/plan/model";
import { TableInputCell, TableLabelCell, TableResultCell, SectionAccordion } from "@shared/ui";
import { ParticleSection } from "@/features/plan/ui";
import type { TypedEquipmentResponse } from "@/entities/agency/equipment/model";
import { display } from "@shared/lib";

interface MeasurementPointSection {
  sheet: MeasurementSheetEditForm;
  onChange: (index: number, name: keyof MeasurementpointEditForm, value: string) => void;
  onSheetChange: (name: keyof MeasurementSheetEditForm, value: string) => void;
  onParticleSampleChange: (name: keyof ParticleSampleEditForm, value: string | null) => void;

  AvgGasTemp: number | null;
  AvgPd: number | null;
  AvgPs: number | null;
  avgInTemp: number | null;
  avgOutTemp: number | null;

  recommendList: {
    nozzle: number,
    orificeDp: number | null,
    Vm: number | null,
    Vlc: number | null,
    samplingTime: number | null,
  }[];
  orificeDpList: {
    orificeDp: number | null,
    kFactor: number | null,
  }[];

  standardGasDensityList: number[] | null;
  avgGasVelocity: number | null;
  gasVelocityList: number[] | null;
  pitotTubeCoefficient: number | null;
  quantity: number | null;
  standardQuantity: number | null;

  selectedNZ?: TypedEquipmentResponse
  isParticle: boolean;
}

export const MeasurementPointSection = ({
  sheet,
  onChange,
  onSheetChange,
  onParticleSampleChange,

  AvgGasTemp,
  AvgPd,
  AvgPs,
  avgInTemp,
  avgOutTemp,

  recommendList,
  orificeDpList,

  standardGasDensityList,
  avgGasVelocity,
  gasVelocityList,
  pitotTubeCoefficient,
  quantity,
  standardQuantity,

  selectedNZ,

  isParticle,
}: MeasurementPointSection) => {
  const measurementPoints = sheet.measurementPoints;

  return (
    <SectionAccordion title="Part 4. 측정점정보">
      <div className="rounded-b-lg border border-t-0 border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-[540px] w-full table-fixed border-collapse text-sm">
            <colgroup>
              <col style={{ width: "120px" }} />
              <col style={{ width: "100px" }} />
              <col style={{ width: "100px" }} />
              <col style={{ width: "100px" }} />
              <col style={{ width: "100px" }} />
              <col style={{ width: "100px" }} />
              <col style={{ width: "100px" }} />
            </colgroup>
            <tbody>
              <tr>
                <TableLabelCell>측정점</TableLabelCell>
                {measurementPoints.map((_, index) => (
                  <TableResultCell
                    key={index}
                    value={`${index + 1} 지점`}
                  />
                ))}
                <TableResultCell value="평균" />
              </tr>

              <tr>
                <TableLabelCell>배출가스온도 (<i>T<sub>S</sub></i>)</TableLabelCell>
                {measurementPoints.map((mp, index) => (
                  <TableInputCell
                    key={index}
                    type="number"
                    value={mp.Ts}
                    onChange={(value) =>
                      onChange(index, "Ts", value)
                    }
                    unit="°C"
                  />
                ))}
                <TableResultCell value={display(AvgGasTemp)} unit="°K" />
              </tr>

              <tr>
                <TableLabelCell>동압 (△<i>P</i>)</TableLabelCell>
                {measurementPoints.map((mp, index) => (
                  <TableInputCell
                    key={index}
                    type="number"
                    value={mp.Pv}
                    onChange={(value) =>
                      onChange(index, "Pv", value)
                    }
                    unit={<>mmH<sub>2</sub>O</>}
                  />
                ))}
                <TableResultCell value={display(AvgPd)} unit={<>mmH<sub>2</sub>O</>} />
              </tr>

              <tr>
                <TableLabelCell>정압 (<i>P<sub>g</sub></i>)</TableLabelCell>
                {measurementPoints.map((mp, index) => (
                  <TableInputCell
                    key={index}
                    type="number"
                    value={mp.Ps}
                    onChange={(value) =>
                      onChange(index, "Ps", value)
                    }
                    unit={<>mmH<sub>2</sub>O</>}
                  />
                ))}
                <TableResultCell value={display(AvgPs)} unit={<>mmH<sub>2</sub>O</>} />
              </tr>
              {isParticle ?
                <ParticleSection
                  sheet={sheet}
                  onChange={onChange}
                  onSheetChange={onSheetChange}
                  onParticleSampleChange={onParticleSampleChange}
                  selectedNZ={selectedNZ}

                  avgInTemp={avgInTemp}
                  avgOutTemp={avgOutTemp}

                  recommendList={recommendList}
                  orificeDpList={orificeDpList}

                  standardGasDensityList={standardGasDensityList}
                  avgGasVelocity={avgGasVelocity}
                  gasVelocityList={gasVelocityList}
                  pitotTubeCoefficient={pitotTubeCoefficient}
                />
                :
                null}
              <tr>
                <TableLabelCell><i>Q</i></TableLabelCell>
                <TableResultCell
                  value={display(quantity)}
                  colSpan={measurementPoints.length + 1}
                  unit="m³/min"
                />
              </tr>
              <tr>
                <TableLabelCell><i>Q<sub>S</sub></i></TableLabelCell>
                <TableResultCell
                  value={display(standardQuantity)}
                  colSpan={measurementPoints.length + 1}
                  unit="Sm³/hr"
                />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </SectionAccordion>
  )
}
