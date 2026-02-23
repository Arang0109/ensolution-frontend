export const MEASUREMENT_TYPE = {
  SELF: "자가 측정용",
  REFERENCE: "기타 참고용",
}
export type MeasurementType = keyof typeof MEASUREMENT_TYPE;

export const MEASUREMENT_TYPE_OPTIONS =
  Object.entries(MEASUREMENT_TYPE).map(([key, value]) => ({
    label: value,
    value: key,
  })) as {
  value: MeasurementType;
  label: string;
}[];