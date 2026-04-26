import type {
  WeatherDocResponse, MoistureDocResponse, ExhaustGasDocResponse,
  Category
} from "@/entities/plan/model";

export interface MeasurementSheetDocResponse {
  category: Category;

  primaryItemId: number | null;
  concurrentItemIds: number[];

  weather: WeatherDocResponse;
  moisture: MoistureDocResponse;
  exhaustGas: ExhaustGasDocResponse;

  measurementPoints: MeasurementPointDocResponse[];
  samples: SampleDocResponse[];
  particleSample: ParticleSampleDocResponse;
  
  quantity: string; // 유량
}

export interface ParticleSampleDocResponse {
  Cp: string; // 피토우관 계수
  nozzleSize: string; // 노즐 사이즈 (cm)

  Vm: string;
  samplingTime: string;

  kFactor: string // K Factor
  orificeDp: string // 오리피스 차압 (mmHg)
  isokineticRatio: string // 등속흡입계수

  samplingStartTime: string; // 입자상 물질 채취시작 시간
  samplingEndTime: string; // 입자상 물질 채취종료 시간

  thimbleFilter: string;
  bgThimbleFilter: string;
}

export interface SampleDocResponse {
  startTime: string;
  endTime: string;
  suctionQuantity: string;
  gasMeterGaugePressure: string;
  inTemperature: string;
  outTemperature: string;
  beforeVolume: string;
  afterVolume: string;
  blankSampleNumber: string;
  sampleNumber: string;
  samplingVolume: string;
}

export interface MeasurementPointDocResponse {
  Ts: string; // 배출가스 온도 (ºC)
  Pv: string; // 배출가스 동압 (mmH₂O)
  Ps: string; // 배출가스 정압 (mmH₂O)

  equipmentTemperature: EquipmentTemperatureSnapshot;
  equipmentVolume: EquipmentVolumeSnapshot;
  
  samplingTime: string;
  vacuumGaugePressure: string;
  finalImpingerTemperature: string;

  Vs: string; // 배출가스 유속 (m/s)
  gasDensity: string; // 배출가스 밀도

  Vm: string; // 건식가스미터 채취량 (m³)
  Vlc: string; // 채취된 물의 총량 (ml)

  kFactor: string; // K Factor
  orificeDp: string; // 오리피스 차압
  isokineticRatio: string; // 등속흡입계수
}

export interface EquipmentTemperatureSnapshot {
  inTm: string; // 가스미터 입구 온도
  outTm: string; // 가스미터 출구 온도

  avgTm: string;
}

export interface EquipmentVolumeSnapshot {
  beforeVm: string; // 건식가스미터 채취 전
  afterVm: string; // 건식가스미터 채취 후
}