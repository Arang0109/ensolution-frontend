export const MEASUREMENT_FIELD = {
  AIR: "대기",
  ODOR: "악취",
  WATER: "수질",
}
export type MeasurementField = keyof typeof MEASUREMENT_FIELD;

export const MEASUREMENT_FIELD_OPTIONS =
  Object.entries(MEASUREMENT_FIELD).map(([key, value]) => ({
    label: value,
    value: key,
  })) as {
  value: MeasurementField;
  label: string;
}[];