import type { WeatherCondition, WindDirection, PlanDetailResponse, MeasurementSheetDocResponse, Category } from '@/entities/plan/model';

export interface MeasurementSheetEditForm {
  category: Category;
  referenceNumber: string;

  primaryItemId: number | null;
  concurrentItemIds: number[];

  weather: WeatherEditForm;
  moisture: MoistureEditForm;
  exhaustGas: ExhaustGasEditForm;

  measurementPoints: MeasurementpointEditForm[];
  samples: SampleEditForm[];
  particleSample: ParticleSampleEditForm;

  quantity: string;
}

//////////////////////////////////////////////////

export const getDefaultMeasurementSheetsEditForm = (
  plan: PlanDetailResponse | undefined
): MeasurementSheetEditForm[] => {

  const measurementSheets = plan?.measurementInfo?.sheets ?? [];
  const measurementPointCnt = Number(plan?.measurementInfo?.measurementPointCnt ?? 1);

  return measurementSheets.map((sheet) => ({
    category: sheet.category ?? "OTHER",
    referenceNumber: sheet.referenceNumber ?? "",

    primaryItemId: sheet.primaryItemId ?? null,
    concurrentItemIds: sheet.concurrentItemIds ?? [],

    weather: getDefaultWeatherEditForm(sheet),
    moisture: getDefaultMoistureEditForm(sheet),
    exhaustGas: getDefaultExhaustGasEditForm(sheet),

    measurementPoints: getDefaultMeasurementpointEditForm(sheet, measurementPointCnt),
    samples: getDefaultSamplesEditForm(sheet),
    particleSample: getDefaultParticleSampleEditForm(sheet),

    quantity: sheet.quantity ?? "",
  }));
};

export interface WeatherEditForm {
  pressure: string;
  unit: string;
  weatherCondition: WeatherCondition;
  temperature: string;
  humidity: string;
  windDirection: WindDirection;
  windSpeed: string;
}

export const getDefaultWeatherEditForm = (
  sheet: MeasurementSheetDocResponse | undefined
): WeatherEditForm => {
  const weather = sheet?.weather;

  return {
    pressure: weather?.pressure.pressure ?? "",
    unit: "Hpa",
    weatherCondition: weather?.weatherCondition ?? "CLEAR",
    temperature: weather?.temperature ?? "",
    humidity: weather?.humidity ?? "",
    windDirection: weather?.windDirection ?? "CALM",
    windSpeed: weather?.windSpeed ?? "",
  }
}

export interface MoistureEditForm {
  beforeWeight: string;
  afterWeight: string;
  inTemperature: string;
  outTemperature: string;
  beforeDryVolume: string;
  afterDryVolume: string;

  suctionVelocity: string;
  gasMeterGaugePressure: string;
}

export const getDefaultMoistureEditForm = (
  sheet: MeasurementSheetDocResponse | undefined
): MoistureEditForm => {
  const moisture = sheet?.moisture;

  return {
    beforeWeight: moisture?.weight.before ?? "263.25",
    afterWeight: moisture?.weight.after ?? "263.35",
    inTemperature: moisture?.gasMeterTemperature.in ?? "",
    outTemperature: moisture?.gasMeterTemperature.out ?? "",
    beforeDryVolume: moisture?.dryGasVolume.before ?? "",
    afterDryVolume: moisture?.dryGasVolume.after ?? "",

    suctionVelocity: moisture?.suctionVelocity ?? "1",
    gasMeterGaugePressure: moisture?.gasMeterGaugePressure ?? "",
  }
}

export interface ExhaustGasEditForm {
  o2Concentration: string[];
  co2Concentration: string[];
  coConcentration: string[];
  noxConcentration: string[];
  soxConcentration: string[];
}

export const getDefaultExhaustGasEditForm = (
  sheet: MeasurementSheetDocResponse | undefined
): ExhaustGasEditForm => {
  const exhaustGas = sheet?.exhaustGas;

  return {
    o2Concentration: exhaustGas?.o2Concentration ?? ["20.9", "20.9", "20.9"],
    co2Concentration: exhaustGas?.co2Concentration ?? ["0", "0", "0"],
    coConcentration: exhaustGas?.coConcentration ?? ["0", "0", "0"],
    noxConcentration: exhaustGas?.noxConcentration ?? ["0", "0", "0"],
    soxConcentration: exhaustGas?.soxConcentration ?? ["0", "0", "0"],
  }
}

export interface MeasurementpointEditForm {
  Ts: string;
  Pv: string;
  Ps: string;

  inTm: string;
  outTm: string;
  beforeVm: string;
  afterVm: string;

  samplingTime: string;
  vacuumGaugePressure: string;
  finalImpingerTemperature: string;

  Vlc: string;
  kFactor: string;
  orificeDp: string;
  isokineticRatio: string;
}

const createEmptyMeasurementPoint = (): MeasurementpointEditForm => ({
  Ts: "",
  Pv: "",
  Ps: "",

  inTm: "",
  outTm: "",
  beforeVm: "",
  afterVm: "",

  samplingTime: "",
  vacuumGaugePressure: "",
  finalImpingerTemperature: "",

  Vlc: "",
  kFactor: "",
  orificeDp: "",
  isokineticRatio: "",
});

export const getDefaultMeasurementpointEditForm = (
  sheet: MeasurementSheetDocResponse | undefined,
  measurementPointCnt: number
): MeasurementpointEditForm[] => {
  const measurementPoints = sheet?.measurementPoints ?? [];

  const mapped = measurementPoints.map((mp) => ({
    Ts: mp?.Ts ?? "",
    Pv: mp?.Pv ?? "",
    Ps: mp?.Ps ?? "",


    inTm: mp?.equipmentTemperature?.inTm ?? "",
    outTm: mp?.equipmentTemperature?.outTm ?? "",
    beforeVm: mp?.equipmentVolume?.beforeVm ?? "",
    afterVm: mp?.equipmentVolume?.afterVm ?? "",

    samplingTime: mp?.samplingTime ?? "",
    vacuumGaugePressure: mp?.vacuumGaugePressure ?? "",
    finalImpingerTemperature: mp?.finalImpingerTemperature ?? "",

    Vlc: mp?.Vlc ?? "",
    kFactor: mp?.kFactor ?? "",
    orificeDp: mp?.orificeDp ?? "",
    isokineticRatio: mp?.isokineticRatio ?? "",
  }));

  if (measurementPointCnt <= mapped.length) {
    return mapped.slice(0, measurementPointCnt);
  }

  return [
    ...mapped,
    ...Array.from(
      { length: measurementPointCnt - mapped.length },
      createEmptyMeasurementPoint
    ),
  ];
};

export interface SampleEditForm {
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

export const getDefaultSamplesEditForm = (
  sheet: MeasurementSheetDocResponse | undefined
): SampleEditForm[] => {
  const samples = sheet?.samples ?? [];

  return samples.map((s) => ({
    startTime: s?.startTime ?? "",
    endTime: s?.endTime ?? "",
    suctionQuantity: s?.suctionQuantity ?? "",
    gasMeterGaugePressure: s?.gasMeterGaugePressure ?? "",
    inTemperature: s?.inTemperature ?? "",
    outTemperature: s?.outTemperature ?? "",
    beforeVolume: s?.beforeVolume ?? "",
    afterVolume: s?.afterVolume ?? "",
    blankSampleNumber: s?.blankSampleNumber ?? "",
    sampleNumber: s?.sampleNumber ?? "",
    samplingVolume: s?.samplingVolume ?? "",
  }));
};

export interface ParticleSampleEditForm {
  Vr: string;

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

export const getDefaultParticleSampleEditForm = (
  sheet: MeasurementSheetDocResponse | undefined
): ParticleSampleEditForm => {
  const particleSample = sheet?.particleSample;

  return {
    Vr: "",
    Cp: particleSample?.Cp ?? "",
    nozzleSize: particleSample?.nozzleSize ?? "",
    Vm: particleSample?.Vm ?? "",
    samplingTime: particleSample?.samplingTime ?? "",
    kFactor: particleSample?.kFactor ?? "",
    orificeDp: particleSample?.orificeDp ?? "",
    isokineticRatio: particleSample?.isokineticRatio ?? "",
    samplingStartTime: particleSample?.samplingStartTime ?? "",
    samplingEndTime: particleSample?.samplingEndTime ?? "",

    thimbleFilter: particleSample?.thimbleFilter ?? "",
    bgThimbleFilter: particleSample?.bgThimbleFilter ?? "",
  }
}