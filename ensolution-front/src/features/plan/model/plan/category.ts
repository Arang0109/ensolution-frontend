export const CATEGORY_LABELS = {
  OTHER: "기타",
  DUST: "먼지",
  HEAVY_METAL: "중금속",
  MERCURY: "수은",
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