// hooks/useMeasurementHandlers.ts
import type { MeasurementData, MeasurementPointData } from "@schedule/model/measurementData.types";

type SetTime = (key: 'startTime' | 'endTime', value: string) => void;
type SetWeather = (value: MeasurementData['weather']) => void;
type SetWindDirection = (value: MeasurementData['windDirection']) => void;
type SetNumberField = (
  key: Exclude<
    keyof MeasurementData,
    | 'startTime'
    | 'endTime'
    | 'weather'
    | 'windDirection'
    | 'oxygenConcentration'
    | 'carbonDioxideConcentration'
    | 'carbonMonoxideConcentration'
    | 'measurementPoints'
  >,
  value: number | null
) => void;
type SetTripleValue = (
  field: 'oxygenConcentration' | 'carbonDioxideConcentration' | 'carbonMonoxideConcentration',
  index: 'value1' | 'value2' | 'value3',
  value: number | null
) => void;
type SetMeasurementPoint = (
  pointIndex: number,
  field: keyof MeasurementPointData,
  value: number | null
) => void;

type GasField =
  | 'oxygenConcentration'
  | 'carbonDioxideConcentration'
  | 'carbonMonoxideConcentration';

type TripleIndex = 'value1' | 'value2' | 'value3';

export const useMeasurementHandler = (
  setTime: SetTime,
  setNumberField: SetNumberField,
  setWeather: SetWeather,
  setWindDirection: SetWindDirection,
  setTripleValue: SetTripleValue,
  setMeasurementPoint: SetMeasurementPoint
) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    switch (name) {
      case 'startTime':
      case 'endTime':
        setTime(name, value);
        return;

      case 'weather':
        setWeather(value as MeasurementData['weather']);
        return;

      case 'windDirection':
        setWindDirection(value as MeasurementData['windDirection']);
        return;

      default:
        setNumberField(
          name as Parameters<SetNumberField>[0],
          value === '' ? null : Number(value)
        );
    }
  };

  const handleTripleChange = (
    field: GasField,
    index: TripleIndex,
    value: string
  ) => {
    setTripleValue(field, index, value === '' ? null : Number(value));
  };

  const handleMeasurementPointChange = (
    pointIndex: number,
    field: keyof MeasurementPointData,
    value: string
  ) => {
    setMeasurementPoint(pointIndex, field, value === '' ? null : Number(value));
  };

  return { handleChange, handleTripleChange, handleMeasurementPointChange };
};