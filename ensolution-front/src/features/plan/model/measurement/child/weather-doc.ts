import type { WeatherCondition, WindDirection } from "@plan/model";

export interface WeatherDocResponse {
  pressure: WeatherPressureSnapshot;

  weatherCondition: WeatherCondition;
  temperature: string;
  humidity: string;
  windDirection: WindDirection;
  windSpeed: string;

  convertedPressure: string;
}

export interface WeatherPressureSnapshot {
  pressure: string;
  unit: string;
}