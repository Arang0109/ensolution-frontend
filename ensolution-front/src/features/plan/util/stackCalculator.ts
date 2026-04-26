import type { Shape } from "@/entities/stack/model"

import { calculator } from "@shared/lib";

const calcArea = (shape: Shape, diameters: number[]): number => {
  if (shape == 'CIRCULAR') {
    const d = diameters[0];
    return Math.PI * d * d / 4
  } else {
    const h = diameters[0];
    const v = diameters[1];
    return h * v;
  }
}

export const calcMeasurementPointCnt = (shape: Shape, diameters: number[]) => {
  if (shape == 'CIRCULAR') {
    const d = diameters[0];

    if ( d <= 1 ) {
      return 1;
    } else if ( d <= 2 ) {
      return 2;
    } else if ( d <= 4 ) {
      return 3;
    } else if ( d <= 4.5 ) {
      return 4;
    } else { return 5; }
  } else {
    return 1;
  }

  // if (shape == 'RECTANGULAR') {
  //   const horizontal = diameters[0];
  //   const vertical = diameters[1];

  //   const area = horizontal * vertical
    
  //   if (!area) return 1;

  //   if ( area <= 0.25 ) return 1;

  //   if ( area <= 1 ) {
  //     return Math.ceil(horizontal / 0.5) * Math.ceil(vertical / 0.5);
  //   } else if ( area <= 4 ) {
  //     return Math.ceil(horizontal / 0.667) * Math.ceil(vertical / 0.667);
  //   } else if ( area <= 20) {
  //     return Math.ceil(horizontal) * Math.ceil(vertical);
  //   } else { return 20; }
  //   return 1; // 임시
  // }
}

export const stackCalculator = (
  shape: Shape,
  diameters: number[] | null,
) => {
  const { round, safeCalc } = calculator;

  const area = safeCalc([diameters], () => 
    round(calcArea(shape, diameters!), 3)
  );

  const measurementPointCnt = safeCalc([diameters], () => 
    round(calcMeasurementPointCnt(shape, diameters!), 3)
  );

  return {
    area,
    measurementPointCnt,
  }
}