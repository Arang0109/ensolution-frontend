export interface WeatherDocResponse {
  pressure: WeatherPressureSnapshot;

  weatherCondition: string;
  temperature: string;
  humidity: string;
  windDirection: string;
  windSpeed: string;

  convertedPressure: string;
}

export interface WeatherPressureSnapshot {
  pressure: string;
  unit: string;
}