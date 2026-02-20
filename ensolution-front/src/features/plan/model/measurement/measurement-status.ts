export const MEASUREMENT_STATUS = {
  DRAFT: "작성중",
  COMPLETED: "작성완료",
}
export type MeasurementStatus = keyof typeof MEASUREMENT_STATUS;

export const MEASUREMENT_STATUS_OPTIONS =
  Object.entries(MEASUREMENT_STATUS).map(([key, value]) => ({
    label: value,
    value: key,
  })) as {
  value: MeasurementStatus;
  label: string;
}[];