import { create } from 'zustand';
import type { TripleMeasurement, MeasurementData } from '@schedule/model';

type GasField =
  | 'oxygenConcentration'
  | 'carbonDioxideConcentration'
  | 'carbonMonoxideConcentration';

type TripleIndex = 'value1' | 'value2' | 'value3';

interface MeasurementDataState {
  data: MeasurementData;
  setTime: (key: 'startTime' | 'endTime', value: string) => void;
  setWeather: (value: MeasurementData['weather']) => void;
  setWindDirection: (value: MeasurementData['windDirection']) => void;
  setNumberField: (
    key: Exclude<
      keyof MeasurementData,
      | 'startTime'
      | 'endTime'
      | 'weather'
      | 'windDirection'
      | 'oxygenConcentration'
      | 'carbonDioxideConcentration'
      | 'carbonMonoxideConcentration'
    >,
    value: number | null
  ) => void;  setTripleValue: (
    field: GasField,
    index: TripleIndex,
    value: number | null
  ) => void;
  resetData: () => void;
}

// 평균 계산 헬퍼 함수
export const calculateAverage = (measurement: TripleMeasurement): number | null => {
  const values = [measurement.value1, measurement.value2, measurement.value3].filter((v): v is number => v !== null);
  if (values.length === 0) return null;
  return values.reduce((sum, val) => sum + val, 0) / values.length;
};

const createInitialTriple = (): TripleMeasurement => ({
  value1: null,
  value2: null,
  value3: null,
});

const createInitialData = (): MeasurementData => ({
  startTime: '',
  endTime: '',
  atmosphericPressure: null,
  weather: '',
  temperature: null,
  humidity: null,
  windDirection: '',
  windSpeed: null,

  exhaustGasTemperature: null,
  oxygenConcentration: createInitialTriple(),
  carbonDioxideConcentration: createInitialTriple(),
  carbonMonoxideConcentration: createInitialTriple(),
  dynamicPressure: null,
  staticPressure: null,
});

export const useMeasurementDataStore = create<MeasurementDataState>((set) => ({
  data: createInitialData(),

  setTime: (key, value) =>
    set((state) => ({
      data: { ...state.data, [key]: value },
    })),

  setNumberField: (key, value) =>
    set((state) => ({
      data: {
        ...state.data,
        [key]: value,
      },
    })),
    
    setWeather: (value) =>
      set((state) => ({
        data: {
          ...state.data,
          weather: value,
        },
      })),
    
    setWindDirection: (value) =>
      set((state) => ({
        data: {
          ...state.data,
          windDirection: value,
        },
      })),

  setTripleValue: (field, index, value) =>
    set((state) => ({
      data: {
        ...state.data,
        [field]: {
          ...state.data[field],
          [index]: value,
        },
      },
    })),

  resetData: () => set({ data: createInitialData() }),
}));
