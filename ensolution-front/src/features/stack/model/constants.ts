import type { Cycle, Orientation, Shape } from "@shared/model";

/**
 * 배출구 형태 라벨
 */
export const SHAPE_LABELS = {
  CIRCULAR: '원형',
  RECTANGULAR: '사각형',
  OTHER: '기타',
} as const;

/**
 * 배출구 방향 라벨
 */
export const ORIENTATION_LABELS = {
  VERTICAL: '수직',
  HORIZONTAL: '수평',
} as const;

/**
 * 측정 주기 라벨
 */
export const CYCLE_LABELS = {
  MONTHLY_1: '1회 | 1개월',
  MONTHLY_2: '2회 | 1개월',
  BIMONTHLY: '1회 | 2개월',
  QUARTERLY: '1회 | 3개월(분기)',
  SEMI_ANNUAL: '1회 | 6개월(반기)',
  ANNUAL: '1회 | 1년',
} as const;

export const SHAPE_LABELS_OPTIONS =
  Object.entries(SHAPE_LABELS).map(([value, label]) => ({
    value,
    label,
  })) as {
    value: Shape;
    label: string;
  }[];

export const ORIENTATION_LABELS_OPTIONS =
  Object.entries(ORIENTATION_LABELS).map(([value, label]) => ({
    value,
    label,
  })) as {
    value: Orientation;
    label: string;
  }[];

export const CYCLE_LABELS_OPTIONS =
  Object.entries(CYCLE_LABELS).map(([value, label]) => ({
    value,
    label,
  })) as {
    value: Cycle;
    label: string;
  }[];