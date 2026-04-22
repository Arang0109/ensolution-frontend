import type { WeatherCondition, WindDirection } from "@/entities/plan/model";

export interface WeatherDocResponse {
  pressure: WeatherPressureSnapshot;

  weatherCondition: WeatherCondition;
  temperature: string;
  humidity: string;
  windDirection: WindDirection;
  windSpeed: string;

  pa: string;
}

export interface WeatherPressureSnapshot {
  pressure: string;
  unit: string;
}