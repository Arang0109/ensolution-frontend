import type { WeatherCondition, WindDirection, PlanDetailResponse } from '@plan/model';

export interface FieldDataEditForm {
  weather: WeatherEditForm;
  moisture: MoistureEditForm;
  exhaustGas: ExhaustGasEditForm;
 
}

//////////////////////////////////////////////////

export const getDefaultFieldDataEditForm = (
  plan: PlanDetailResponse | undefined
): FieldDataEditForm => {
  const weather = getDefaultWeatherEditForm(plan);
  const moisture = getDefaultMoistureEditForm(plan);
  const exhaustGas = getDefaultExhaustGasEditForm(plan);

  return {
    weather: weather,
    moisture: moisture,
    exhaustGas: exhaustGas,
  }
}

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
  plan: PlanDetailResponse | undefined
): WeatherEditForm => {
  const weather = plan?.measurementInfo.weather;

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
  plan: PlanDetailResponse | undefined
): MoistureEditForm => {
  const moisture = plan?.measurementInfo.moisture;

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
  plan: PlanDetailResponse | undefined
): ExhaustGasEditForm => {
  const exhaustGas = plan?.measurementInfo.exhaustGas;

  return {
    o2Concentration: exhaustGas?.o2Concentration ?? ["20.9", "20.9", "20.9"],
    co2Concentration: exhaustGas?.co2Concentration ?? ["0", "0", "0"],
    coConcentration: exhaustGas?.coConcentration ?? ["0", "0", "0"],
    noxConcentration: exhaustGas?.noxConcentration ?? ["0", "0", "0"],
    soxConcentration: exhaustGas?.soxConcentration ?? ["0", "0", "0"],
  }
}