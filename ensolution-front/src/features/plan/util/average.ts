export const calcArrayAvg = (arr: string[]): number | null => {
  const numbers = arr
    .map(v => Number(v))
    .filter(v => Number.isFinite(v));

  if (numbers.length === 0) return null;

  const sum = numbers.reduce((acc, cur) => acc + cur, 0);
  const avg = sum / numbers.length;

  return Number(avg.toFixed(1));
};