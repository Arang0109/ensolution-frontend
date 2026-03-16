/**
 * 숫자를 한국 형식으로 포맷팅합니다. (예: 1,000,000)
 */
export const formatNumber = (value: number): string => {
  return value.toLocaleString('ko-KR');
};

export type Unit =
  | "mm"
  | "cm"
  | "m"
  | "km"
  | "m2"
  | "m3"
  | "kg"
  | "g"
  | "mg"
  | "s"
  | "min"
  | "h";

export const formatNumberWithUnit = (
  value: number | null | undefined,
  unit?: Unit
): string => {
  if (value === null || value === undefined) return "-";

  const formatted = formatNumber(value);

  return unit ? `${formatted} ${unit}` : formatted;
};

export const formatHeight = (value?: number | null) =>
  formatNumberWithUnit(value, "m");

export const formatLength = (value?: number | null) =>
  formatNumberWithUnit(value, "cm");

export const formatArea = (value?: number | null) =>
  formatNumberWithUnit(value, "m2");

export const formatVolume = (value?: number | null) =>
  formatNumberWithUnit(value, "m3");

export const display = (v: number | null) => v ?? "-";