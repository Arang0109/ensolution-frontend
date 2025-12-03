import type { Grade, Shape, Orientation, Cycle } from '@model/common.types';

/**
 * 배출시설 등급 라벨
 */
export const GRADE_LABELS: Record<Grade, string> = {
  TYPE_1: '1종',
  TYPE_2: '2종',
  TYPE_3: '3종',
  TYPE_4: '4종',
  TYPE_5: '5종',
} as const;

/**
 * 배출구 형태 라벨
 */
export const SHAPE_LABELS: Record<Shape, string> = {
  CIRCULAR: '원형',
  RECTANGULAR: '사각형',
  OTHER: '기타',
} as const;

/**
 * 배출구 방향 라벨
 */
export const ORIENTATION_LABELS: Record<Orientation, string> = {
  VERTICAL: '수직',
  HORIZONTAL: '수평',
} as const;

/**
 * 측정 주기 라벨
 */
export const CYCLE_LABELS: Record<Cycle, string> = {
  MONTHLY_1: '월 1회',
  MONTHLY_2: '월 2회',
  BIMONTHLY: '2개월 1회',
  QUARTERLY: '분기 1회',
  SEMI_ANNUAL: '반기 1회',
  ANNUAL: '연간 1회',
} as const;
