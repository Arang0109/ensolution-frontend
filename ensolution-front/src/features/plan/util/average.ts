export const calcArrayAvg = (arr: string[]): string => {
  const numbers = arr
    .map(v => parseFloat(v))
    .filter(v => !isNaN(v));

  if (numbers.length === 0) return "";

  const sum = numbers.reduce((acc, cur) => acc + cur, 0);
  const avg = sum / numbers.length;

  return avg.toFixed(1);
};