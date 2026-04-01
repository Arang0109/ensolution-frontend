import type { Shape } from "@/entities/stack/model";

export type PointRecord = Record<number, number | null>;

const safeCalc = <T>(
  deps: (number | number[] | null)[],
  fn: () => T
): T | null => {
  const isValid = deps.every(v => {
    if (v === null) return false;
    if (Array.isArray(v)) return v.every(x => x !== null);
    return true;
  });

  return isValid ? fn() : null;
};

const toNumber = (v: string): number | null => {
  if (!v) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

const toNumbers = (values: string[]): number[] | null => {
  if (!values) return null;

  const result = values
    .map((v) => {
      if (!v) return null;
      const n = Number(v);
      return Number.isFinite(n) ? n : null;
    })
    .filter((v): v is number => v !== null);

  return result.length ? result : null;
};

// 인덱스를 보존하며 문자열 배열을 Record로 변환 (null 제거 없이 위치 유지)
const toNumberRecord = (values: string[]): PointRecord => {
  return Object.fromEntries(
    values.map((v, i) => {
      if (!v) return [i, null];
      const n = Number(v);
      return [i, Number.isFinite(n) ? n : null];
    })
  );
};

// Record에서 유효한(non-null) 값만 추출 (평균 등 집계용)
const validValues = (record: PointRecord): number[] =>
  Object.values(record).filter((v): v is number => v !== null);

const round = (value: number, digits: number): number => {
  return Number(value.toFixed(digits));
};

const calcArea = (shape: Shape, numbers: number[]): number => {
  if (shape === "CIRCULAR") {
    return calcCircleArea(numbers[0]);
  } else {
    return calcRectangleArea(numbers[0], numbers[1]);
  };
}

const calcRectangleArea = (vertical: number, horizontal: number): number => 
  vertical * horizontal;

const calcCircleArea = (diameter: number): number => {
  const r = diameter / 2;
  return Math.PI * r * r;
};

const calcAverage = (values: number[]): number => {
  const sum = values.reduce((acc, cur) => acc + cur, 0);
  const avg = sum / values.length;
  return avg;
};

const calcDelta = (before: number, after: number): number => 
  after - before;

export const calculator = {
  safeCalc,
  toNumber,
  toNumbers,
  toNumberRecord,
  validValues,
  round,

  calcArea,
  calcAverage,
  calcDelta,
}