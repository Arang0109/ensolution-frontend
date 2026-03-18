import type { WeatherCondition, WindDirection, PlanDetailResponse, MeasurementSheetDocResponse, Category } from '@plan/model';

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

  quantity: string;
  pitotTubeCoefficient: string;
  nozzleSize: string;

  startTime: string;
  endTime: string;
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

    primaryItemId: null,
    concurrentItemIds: [],

    weather: getDefaultWeatherEditForm(sheet),
    moisture: getDefaultMoistureEditForm(sheet),
    exhaustGas: getDefaultExhaustGasEditForm(sheet),

    measurementPoints: getDefaultMeasurementpointEditForm(sheet, measurementPointCnt),
    samples: getDefaultSamplesEditForm(sheet),

    quantity: sheet.quantity ?? "",
    pitotTubeCoefficient: sheet.pitotTubeCoefficient ?? "",
    nozzleSize: sheet.nozzleSize ?? "",

    startTime: sheet.startTime ?? "",
    endTime: sheet.endTime ?? "",
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
  gasTemperature: string;
  dynamicPressure: string;
  staticPressure: string;

  inEquipmentTemperature: string;
  outEquipmentTemperature: string;
  beforeEquipmentVolume: string;
  afterEquipmentVolume: string;
  measureTime: string;

  vacuumGaugePressure: string;
  finalImpingerTemperature: string;
}

const createEmptyMeasurementPoint = (): MeasurementpointEditForm => ({
  gasTemperature: "",
  dynamicPressure: "",
  staticPressure: "",

  inEquipmentTemperature: "",
  outEquipmentTemperature: "",
  beforeEquipmentVolume: "",
  afterEquipmentVolume: "",
  measureTime: "",

  vacuumGaugePressure: "",
  finalImpingerTemperature: "",
});

export const getDefaultMeasurementpointEditForm = (
  sheet: MeasurementSheetDocResponse | undefined,
  measurementPointCnt: number
): MeasurementpointEditForm[] => {
  const measurementPoints = sheet?.measurementPoints ?? [];

  const mapped = measurementPoints.map((mp) => ({
    gasTemperature: mp?.gasTemperature ?? "",
    dynamicPressure: mp?.dynamicPressure ?? "",
    staticPressure: mp?.staticPressure ?? "",


    inEquipmentTemperature: mp?.equipmentTemperature?.inletTemperature ?? "",
    outEquipmentTemperature: mp?.equipmentTemperature?.outletTemperature ?? "",
    beforeEquipmentVolume: mp?.equipmentVolume?.beforeVolume ?? "",
    afterEquipmentVolume: mp?.equipmentVolume?.afterVolume ?? "",
    measureTime: mp?.measureTime ?? "",

    vacuumGaugePressure: mp?.vacuumGaugePressure ?? "",
    finalImpingerTemperature: mp?.finalImpingerTemperature ?? "",
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