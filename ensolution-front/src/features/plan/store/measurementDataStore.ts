import { create } from 'zustand';
import type { TripleMeasurement, MeasurementData, MeasurementPointData } from '@plan/model';

type GasField =
  | 'oxygenConcentration'
  | 'carbonDioxideConcentration'
  | 'carbonMonoxideConcentration';

type TripleIndex = 'value1' | 'value2' | 'value3';

type MeasurementPointField = keyof MeasurementPointData;

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
      | 'measurementPoints'
    >,
    value: number | null
  ) => void;
  setTripleValue: (
    field: GasField,
    index: TripleIndex,
    value: number | null
  ) => void;
  setMeasurementPoint: (
    pointIndex: number,
    field: MeasurementPointField,
    value: number | null
  ) => void;
  setMeasurementPointCount: (count: number) => void;
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

const createInitialMeasurementPoint = (): MeasurementPointData => ({
  exhaustGasTemperature: null,
  dynamicPressure: null,
  staticPressure: null,
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

  oxygenConcentration: createInitialTriple(),
  carbonDioxideConcentration: createInitialTriple(),
  carbonMonoxideConcentration: createInitialTriple(),

  measurementPoints: [createInitialMeasurementPoint()],
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

  setMeasurementPoint: (pointIndex, field, value) =>
    set((state) => {
      const newPoints = [...state.data.measurementPoints];
      if (pointIndex >= 0 && pointIndex < newPoints.length) {
        newPoints[pointIndex] = {
          ...newPoints[pointIndex],
          [field]: value,
        };
      }
      return {
        data: {
          ...state.data,
          measurementPoints: newPoints,
        },
      };
    }),

  setMeasurementPointCount: (count) =>
    set((state) => {
      const currentLength = state.data.measurementPoints.length;
      let newPoints = [...state.data.measurementPoints];

      if (count > currentLength) {
        // 측정점 추가
        const pointsToAdd = count - currentLength;
        for (let i = 0; i < pointsToAdd; i++) {
          newPoints.push(createInitialMeasurementPoint());
        }
      } else if (count < currentLength) {
        // 측정점 제거
        newPoints = newPoints.slice(0, count);
      }

      return {
        data: {
          ...state.data,
          measurementPoints: newPoints,
        },
      };
    }),

  resetData: () => set({ data: createInitialData() }),
}));
