export const GRADE_LABELS = {
  TYPE_1: '1종',
  TYPE_2: '2종',
  TYPE_3: '3종',
  TYPE_4: '4종',
  TYPE_5: '5종',
} as const;
export type Grade = keyof typeof GRADE_LABELS;

export const GRADE_LABELS_OPTIONS =
  Object.entries(GRADE_LABELS).map(([value, label]) => ({
    value,
    label,
  })) as {
    value: Grade;
    label: string;
  }[];