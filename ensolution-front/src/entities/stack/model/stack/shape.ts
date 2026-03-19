export const SHAPE_LABELS = {
  CIRCULAR: '원형',
  RECTANGULAR: '사각형',
  OTHER: '기타',
} as const;
export type Shape = keyof typeof SHAPE_LABELS;

export const SHAPE_LABELS_OPTIONS =
  Object.entries(SHAPE_LABELS).map(([value, label]) => ({
    value,
    label,
  })) as {
    value: Shape;
    label: string;
  }[];