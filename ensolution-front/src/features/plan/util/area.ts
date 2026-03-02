export const calcSquareArea = (vertical: string, horizontal: string): string => {
  const v = parseFloat(vertical);
  const h = parseFloat(horizontal);

  if (isNaN(v) || isNaN(h)) return "";

  return (v * h).toFixed(3);
};

export const calcCircleArea = (diameter: string): string => {
  const d = parseFloat(diameter);
  if (isNaN(d)) return "";

  const r = d / 2;
  return (Math.PI * r * r).toFixed(3);
};