/**
 * 배출구 형태 라벨
 */
export const SHAPE_LABELS: Record<string, string> = {
  CIRCULAR: '원형',
  RECTANGULAR: '사각형',
  OTHER: '기타',
} as const;

/**
 * 배출구 방향 라벨
 */
export const ORIENTATION_LABELS: Record<string, string> = {
  VERTICAL: '수직',
  HORIZONTAL: '수평',
} as const;

/**
 * 측정 주기 라벨
 */
export const CYCLE_LABELS: Record<string, string> = {
  MONTHLY_1: '1회 | 1개월',
  MONTHLY_2: '2회 | 1개월',
  BIMONTHLY: '1회 | 2개월',
  QUARTERLY: '1회 | 3개월(분기)',
  SEMI_ANNUAL: '1회 | 6개월(반기)',
  ANNUAL: '1회 | 1년',
} as const;