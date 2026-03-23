import type { MeasurementSheetEditForm, MeasurementpointEditForm } from "@/entities/plan/model";
import { TableInputCell, TableLabelCell, TableResultCell } from "@shared/ui";
import { ParticleSection } from "@/features/plan/ui";
import type { TypedEquipmentResponse } from "@/entities/agency/equipment/model";
import { display } from "@shared/lib";

interface MeasurementPointSection {
  sheet: MeasurementSheetEditForm;
  onChange: (index: number, name: keyof MeasurementpointEditForm, value: string) => void;

  measurePointLength: string[];
  AvgGasTemp: number | null;
  AvgPd: number | null;
  AvgPs: number | null;
  avgInTemp: number | null;
  avgOutTemp: number | null;

  pointVelocities: (number | null)[];

  standardDensity: number | null;
  gasVelocity: number | null;
  pitotTubeCoefficient: number | null;
  quantity: number | null;
  standardQuantity: number | null;

  selectedNZ?: TypedEquipmentResponse
  isParticle: boolean;
}

export const MeasurementPointSection = ({
  sheet,
  onChange,

  measurePointLength,
  AvgGasTemp,
  AvgPd,
  AvgPs,

  pointVelocities,

  gasVelocity,
  pitotTubeCoefficient,
  quantity,
  standardQuantity,

  selectedNZ,

  isParticle,
}: MeasurementPointSection) => {
  const measurementPoints = sheet.measurementPoints;

  return (
    <>
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">측정점정보</h3>

        <div className="rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
          <table className="min-w-[540px] w-full table-fixed border-collapse text-sm">
            <tbody>
              <tr>
                <TableLabelCell>측정점</TableLabelCell>
                {measurementPoints.map((_, index) => (
                  <TableResultCell
                    key={index}
                    value={`${index + 1} 지점 - ${measurePointLength[index]} cm`}
                  />
                ))}
                <TableResultCell value="Average" />
              </tr>

              <tr>
                <TableLabelCell><i>T<sub>S</sub></i></TableLabelCell>
                {measurementPoints.map((mp, index) => (
                  <TableInputCell
                    key={index}
                    value={mp.gasTemperature}
                    onChange={(value) =>
                      onChange(index, "gasTemperature", value)
                    }
                    unit="°C"
                  />
                ))}
                <TableResultCell value={display(AvgGasTemp)} unit="°C" />
              </tr>

              <tr>
                <TableLabelCell>△<i>P</i></TableLabelCell>
                {measurementPoints.map((mp, index) => (
                  <TableInputCell
                    key={index}
                    value={mp.dynamicPressure}
                    onChange={(value) =>
                      onChange(index, "dynamicPressure", value)
                    }
                    unit={<>mmH<sub>2</sub>O</>}
                  />
                ))}
                <TableResultCell value={display(AvgPd)} unit={<>mmH<sub>2</sub>O</>} />
              </tr>

              <tr>
                <TableLabelCell><i>P<sub>g</sub></i></TableLabelCell>
                {measurementPoints.map((mp, index) => (
                  <TableInputCell
                    key={index}
                    value={mp.staticPressure}
                    onChange={(value) =>
                      onChange(index, "staticPressure", value)
                    }
                    unit={<>mmH<sub>2</sub>O</>}
                  />
                ))}
                <TableResultCell value={display(AvgPs)} unit={<>mmH<sub>2</sub>O</>} />
              </tr>

              <tr>
                <TableLabelCell><i>V<sub>s</sub></i></TableLabelCell>
                {pointVelocities.map((v, index) => (
                  <TableResultCell
                    key={index}
                    value={display(v)}
                    unit="m/s"
                  />
                ))}
                <TableResultCell value={display(gasVelocity)} unit="kg/Sm³" />
              </tr>

              <tr>
                <TableLabelCell><i><span style={{ textDecoration: "overline" }}>V</span><sub>s</sub></i></TableLabelCell>
                <TableResultCell
                value={display(gasVelocity)}
                colSpan={measurementPoints.length + 1}
                unit="m/s" />
              </tr>
              <tr>
                <TableLabelCell><i>C<sub>p</sub></i></TableLabelCell>
                <TableResultCell
                  value={display(pitotTubeCoefficient)}
                  colSpan={measurementPoints.length + 1}
                />
              </tr>
              {isParticle ?
              <ParticleSection
                measurementPoints={sheet.measurementPoints}
                onChange={onChange}
                selectedNZ={selectedNZ}
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
      </section>
    </>
  )
}