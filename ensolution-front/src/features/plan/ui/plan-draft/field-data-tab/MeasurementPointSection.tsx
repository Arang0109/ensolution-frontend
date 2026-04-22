import type { MeasurementSheetEditForm, MeasurementpointEditForm, ParticleSampleEditForm } from "@/entities/plan/model";
import { TableInputCell, TableLabelCell, TableResultCell, SectionAccordion } from "@shared/ui";
import { ParticleSection } from "@/features/plan/ui";
import type { TypedEquipmentResponse } from "@/entities/agency/equipment/model";
import type { PointRecord } from "@shared/lib";
import type { OrificeDpRecord } from "@plan/util";
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
  orificeDpRecord: OrificeDpRecord;

  gasDensityList: PointRecord;
  avgGasVelocity: number | null;
  gasVelocityList: PointRecord;
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
  orificeDpRecord,

  gasDensityList,
  avgGasVelocity,
  gasVelocityList,
  pitotTubeCoefficient,
  // quantity,
  standardQuantity,

  selectedNZ,

  isParticle,
}: MeasurementPointSection) => {
  const measurementPoints = sheet.measurementPoints;

  return (
    <>
      <SectionAccordion title="Part 4. 측정점정보">
        <div className="rounded-b-lg border border-t-0 border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-[540px] w-full table-fixed border-collapse text-sm">
              <colgroup>
                <col style={{ width: "120px" }} />
                <col style={{ width: "70px" }} />
                <col style={{ width: "70px" }} />
                <col style={{ width: "70px" }} />
                <col style={{ width: "70px" }} />
                <col style={{ width: "70px" }} />
                <col style={{ width: "70px" }} />
              </colgroup>
              <tbody>
                <tr>
                  <TableLabelCell>측정점</TableLabelCell>
                  {measurementPoints.map((_, index) => (
                    <TableLabelCell key={index}>{`${index + 1} 지점`}</TableLabelCell>
                  ))}
                  <TableLabelCell>평균</TableLabelCell>
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
                  <TableResultCell value={display(AvgGasTemp! - 273, 1)} unit="°C" />
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
                  <TableResultCell value={display(AvgPd, 1)} unit={<>mmH<sub>2</sub>O</>} />
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
                  <TableResultCell value={display(AvgPs, 1)} unit={<>mmH<sub>2</sub>O</>} />
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
                    orificeDpRecord={orificeDpRecord}

                    standardGasDensityList={gasDensityList}
                    avgGasVelocity={avgGasVelocity}
                    gasVelocityList={gasVelocityList}
                    pitotTubeCoefficient={pitotTubeCoefficient}
                  />
                  :
                  null}
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

      {isParticle?
        <SectionAccordion title="Part 5. 원통여지">
          <div className="overflow-hidden overflow-x-auto">
            <table className="w-full table-fixed border-collapse text-sm">
              <tbody>
                <tr>
                  <TableLabelCell>측정여지번호</TableLabelCell>
                  <TableLabelCell>포집 전</TableLabelCell>
                  <TableLabelCell>포집 후</TableLabelCell>
                </tr>
                <tr>
                  <TableInputCell
                    value={sheet.particleSample.thimbleFilter}
                    onChange={(value) => onParticleSampleChange("thimbleFilter", value)}
                  />
                  <TableInputCell
                    value={""}
                    onChange={() => null}
                  />
                  <TableInputCell
                    value={""}
                    onChange={() => null}
                  />
                </tr>
                <tr>
                  <TableLabelCell>바탕여지번호</TableLabelCell>
                  <TableLabelCell>포집 전</TableLabelCell>
                  <TableLabelCell>포집 후</TableLabelCell>
                </tr>
                <tr>
                  <TableInputCell
                    value={sheet.particleSample.bgThimbleFilter}
                    onChange={(value) => onParticleSampleChange("bgThimbleFilter", value)}
                  />
                  <TableInputCell
                    value={""}
                    onChange={() => null}
                  />
                  <TableInputCell
                    value={""}
                    onChange={() => null}
                  />
                </tr>
              </tbody>
            </table>
          </div>
        </SectionAccordion> : null
      }
    </>
  )
}
