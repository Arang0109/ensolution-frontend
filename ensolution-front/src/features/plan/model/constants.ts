export const MEASUREMENT_FIELDS = {
  AIR: "대기",
  ODOR: "악취",
  WATER: "수질",
}
export type MeasurementField = typeof MEASUREMENT_FIELDS[keyof typeof MEASUREMENT_FIELDS];

export const MEASUREMENT_TYPES = {
  SELF: "자가측정용",
  IMPACT: "환경영향평가",
  PERMIT: "인허가용",
  REFERENCE: "참고용",
} as const;

export type MeasurementType =
  typeof MEASUREMENT_TYPES[keyof typeof MEASUREMENT_TYPES];

export const MEASUREMENT_FIELD_OPTIONS = Object.entries(MEASUREMENT_FIELDS).map(
  ([key, value]) => ({
    label: value,
    value: key,
  })
);

export const MEASUREMENT_TYPES_OPTIONS = Object.entries(MEASUREMENT_TYPES).map(
  ([key, value]) => ({
    label: value,
    value: key,
  })
);