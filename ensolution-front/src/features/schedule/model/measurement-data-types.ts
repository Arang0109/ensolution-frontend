export interface TripleMeasurement {
  value1: number | null;
  value2: number | null;
  value3: number | null;
}

// 측정점별 데이터
export interface MeasurementPointData {
  exhaustGasTemperature: number | null; // 배출가스 온도 (°C)
  dynamicPressure: number | null; // 동압 (mmH₂O)
  staticPressure: number | null; // 정압 (mmH₂O)
}

// 측정 데이터 타입 정의
export interface MeasurementData {
  // 사전 정보
  startTime: string;
  endTime: string;
  atmosphericPressure: number | null; // 대기압 (mmH20)
  weather: 'SUNNY' | 'CLOUDY' | 'RAINY' | 'SNOWY' | '';
  temperature: number | null; // 기온 (°C)
  humidity: number | null; // 습도 (%)
  windDirection: 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW' | '';
  windSpeed: number | null; // 풍속 (m/s)

  // 배출구 측정 데이터
  oxygenConcentration: TripleMeasurement; // 산소 농도 (%) - 3회 측정
  carbonDioxideConcentration: TripleMeasurement; // 이산화탄소 농도 (%) - 3회 측정
  carbonMonoxideConcentration: TripleMeasurement; // 일산화탄소 농도 (ppm) - 3회 측정

  // 측정점별 데이터 (1~5개)
  measurementPoints: MeasurementPointData[];
}