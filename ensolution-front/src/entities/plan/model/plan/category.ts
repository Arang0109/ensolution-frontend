export const CATEGORY_LABELS = {
  GAS: "가스상",
  DUST: "먼지",
  HEAVY_METAL: "중금속",
  MERCURY: "수은",
  PM25: "PM2.5",
  PM10: "PM10",
}
export type Category = keyof typeof CATEGORY_LABELS;

export const CATEGORY_OPTIONS =
  Object.entries(CATEGORY_LABELS).map(([key, value]) => ({
    label: value,
    value: key,
  })) as {
  value: Category;
  label: string;
}[];