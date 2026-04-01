import type { Shape } from "@/entities/stack/model";

const safeCalc = <T>(deps: (number | number[] | null)[], fn: () => T): T | null => {
  return deps.every(v => v !== null) ? fn() : null;
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
  round,

  calcArea,
  calcAverage,
  calcDelta,
}