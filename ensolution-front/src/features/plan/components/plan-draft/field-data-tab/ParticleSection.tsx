import type { MeasurementpointEditForm } from "@plan/model";
import { TableLabelCell, TableInputCell, TableResultCell, TableSelectableCell } from "@shared/ui";
import type { NozzleSpec, TypedEquipmentResponse } from "@equipment/model";
import { useState } from "react";

interface ParticleSectionProps {
  measurementPoints: MeasurementpointEditForm[];
  onChange: (index: number, name: keyof MeasurementpointEditForm, value: string) => void;
  selectedNZ?: TypedEquipmentResponse;
}

export const ParticleSection = ({
  measurementPoints,
  onChange,
  selectedNZ,
}: ParticleSectionProps) => {

  const [standardDesiredGasVolume, setStandardDesiredGasVolume] = useState("");
  const [measuringTime, setMeasuringTime] = useState("");

  const nozzleSizeOptions =
  ((selectedNZ?.spec as NozzleSpec | undefined)?.diameters ?? []).map(d => ({
    label: `${d.diameter} cm`,
    value: String(d.diameter),
  }));

  return (
    <>
      <tr>
        <TableLabelCell><i>V<sub>std-desired</sub></i></TableLabelCell>
        <TableInputCell
          value={standardDesiredGasVolume}
          onChange={setStandardDesiredGasVolume}
          colSpan={3}
          unit={<>S<sub>m</sub><sup>3</sup></>}
        />
      </tr>
      <tr>
        <TableLabelCell><i>θ</i></TableLabelCell>
        <TableInputCell
          value={measuringTime}
          onChange={setMeasuringTime}
          colSpan={3}
          unit={<>min</>}
        />
      </tr>

      <tr>
        <TableLabelCell>노즐</TableLabelCell>
        <TableSelectableCell
          value=""
          options={nozzleSizeOptions} 
          colSpan={3}
          onChange={(value) => console.log(value)} 
        />
      </tr>
      
      <tr>
        <TableLabelCell>△H</TableLabelCell>
        {measurementPoints.map((_, index) => (
          <TableResultCell
            key={index}
            value="re"
            unit="kg/Sm³"
          />
        ))}
        <TableResultCell value="re" unit="kg/Sm³" />
      </tr>
      <tr>
        <TableLabelCell>K-factor</TableLabelCell>
        {measurementPoints.map((_, index) => (
          <TableResultCell
            key={index}
            value="re"
            unit="kg/Sm³"
          />
        ))}
        <TableResultCell value="re" unit="kg/Sm³" />
      </tr>
      <tr>
        <TableLabelCell><i>T<sub>m-In</sub></i></TableLabelCell>
        {measurementPoints.map((mp, index) => (
          <TableInputCell
            key={index}
            value={mp.inEquipmentTemperature}
            onChange={(value) =>
              onChange(index, "inEquipmentTemperature", value)
            }
            unit="°C"
          />
        ))}
        <TableResultCell value="re" unit={<>mmH<sub>2</sub>O</>} />
      </tr>
      <tr>
        <TableLabelCell><i>T<sub>m-Out</sub></i></TableLabelCell>
        {measurementPoints.map((mp, index) => (
          <TableInputCell
            key={index}
            value={mp.outEquipmentTemperature}
            onChange={(value) =>
              onChange(index, "outEquipmentTemperature", value)
            }
            unit="°C"
          />
        ))}
        <TableResultCell value="re" unit={<>mmH<sub>2</sub>O</>} />
      </tr>
      <tr>
        <TableLabelCell><i>T<sub>m-Avg</sub></i></TableLabelCell>
        {measurementPoints.map((_, index) => (
          <TableResultCell
            key={index}
            value="re"
            unit="kg/Sm³"
          />
        ))}
        <TableResultCell value="re" unit="kg/Sm³" />
      </tr>

      <tr>
        <TableLabelCell><i>V<sub>m</sub></i></TableLabelCell>
        {measurementPoints.map((mp, index) => (
          <TableInputCell
            key={index}
            value={mp.outEquipmentTemperature}
            onChange={(value) =>
              onChange(index, "outEquipmentTemperature", value)
            }
            unit="m³"
          />
        ))}
        <TableResultCell value="re" unit={<>mmH<sub>2</sub>O</>} />
      </tr>

      <tr>
        <TableLabelCell><i>I(%)</i></TableLabelCell>
        {measurementPoints.map((_, index) => (
          <TableResultCell
            key={index}
            value="re"
            unit="kg/Sm³"
          />
        ))}
        <TableResultCell value="re" unit="kg/Sm³" />
      </tr>
    </>
  );
}