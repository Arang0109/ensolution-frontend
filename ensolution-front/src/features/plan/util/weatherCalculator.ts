import type { WeatherEditForm } from "@plan/model";

export const weatherCalculator = (weather: WeatherEditForm) => {
  const raw = String(weather.pressure ?? "").trim(); // ✅ 타입 안전
  const pressure = Number(raw);

  if (!raw || Number.isNaN(pressure)) {
    return { atmosphericPressure: "-" }; // 계산 불가
  }

  const atmosphericPressure = ((pressure * 760) / 1013.25).toFixed(1);

  return {
    atmosphericPressure,
  };
};