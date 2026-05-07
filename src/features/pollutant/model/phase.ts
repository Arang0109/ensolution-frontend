export const PHASE_LABELS = {
  PARTICLE: '입자상',
  GAS: '가스상',
} as const;
export type Phase = keyof typeof PHASE_LABELS;

export const PHASE_LABELS_OPTIONS =
  Object.entries(PHASE_LABELS).map(([value, label]) => ({
    value,
    label,
  })) as {
    value: Phase;
    label: string;
  }[];