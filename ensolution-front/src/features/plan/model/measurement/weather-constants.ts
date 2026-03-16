export const WEATHER_CONDITION_LABELS = {
  CLEAR: '맑음',
  CLOUDY: '흐림',
  RAIN: '비',
  SNOW: '눈',
} as const;
export type WeatherCondition = keyof typeof WEATHER_CONDITION_LABELS;

export const WEATHER_CONDITION_LABELS_OPTIONS =
  Object.entries(WEATHER_CONDITION_LABELS).map(([value, label]) => ({
    value,
    label,
  })) as {
    value: WeatherCondition;
    label: string;
  }[];

 export const WIND_DIRECTION_LABELS = {
  CALM: '정온',

  N: '북',
  NNE: '북북동',
  NE: '북동',
  ENE: '동북동',

  E: '동',
  ESE: '동남동',
  SE: '남동',
  SSE: '남남동',

  S: '남',
  SSW: '남남서',
  SW: '남서',
  WSW: '서남서',

  W: '서',
  WNW: '서북서',
  NW: '북서',
  NNW: '북북서',
} as const;
export type WindDirection = keyof typeof WIND_DIRECTION_LABELS;

export const WIND_DIRECTION_LABELS_OPTIONS =
  Object.entries(WIND_DIRECTION_LABELS).map(([value, label]) => ({
    value,
    label,
  })) as {
    value: WindDirection;
    label: string;
  }[];