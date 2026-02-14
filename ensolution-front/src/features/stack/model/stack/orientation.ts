export const ORIENTATION_LABELS = {
  VERTICAL: '수직',
  HORIZONTAL: '수평',
} as const;
export type Orientation = keyof typeof ORIENTATION_LABELS;

export const ORIENTATION_LABELS_OPTIONS =
  Object.entries(ORIENTATION_LABELS).map(([value, label]) => ({
    value,
    label,
  })) as {
    value: Orientation;
    label: string;
  }[];