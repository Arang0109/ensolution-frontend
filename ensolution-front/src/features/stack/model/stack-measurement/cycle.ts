export const CYCLE_LABELS = {
  MONTHLY_1: '1회 | 1개월',
  MONTHLY_2: '2회 | 1개월',
  BIMONTHLY: '1회 | 2개월',
  QUARTERLY: '1회 | 3개월(분기)',
  SEMI_ANNUAL: '1회 | 6개월(반기)',
  ANNUAL: '1회 | 1년',
} as const;
export type Cycle = keyof typeof CYCLE_LABELS;

export const CYCLE_LABELS_OPTIONS =
  Object.entries(CYCLE_LABELS).map(([value, label]) => ({
    value,
    label,
  })) as {
    value: Cycle;
    label: string;
  }[];