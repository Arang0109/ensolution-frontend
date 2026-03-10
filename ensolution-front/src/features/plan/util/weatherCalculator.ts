import type { WeatherEditForm } from "@plan/model";

export const weatherCalculator = (weather: WeatherEditForm) => {
  const raw = String(weather.pressure ?? "").trim();
  const pressure = Number(raw);

  if (!raw || Number.isNaN(pressure)) {
    return { atmosphericPressure: 0 };
  }

  const atmosphericPressure = 
    Number(((pressure * 760) / 1013.25).toFixed(1));

  return {
    atmosphericPressure,
  };
};