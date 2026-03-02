import { calcSquareArea, calcCircleArea } from "@plan/util";
import type { PreInfoEditForm } from "@plan/model";

const calcArea = (preInfo: PreInfoEditForm) => {
  if (preInfo.shape == 'CIRCULAR') {
    return calcCircleArea(preInfo.horizontalLength)
  };

  if (preInfo.shape == 'RECTANGULAR') {
    return calcSquareArea(preInfo.horizontalLength, preInfo.verticalLength);
  }

  return ""
}

const calcMeasurePointCnt = (preInfo: PreInfoEditForm) => {
  if (preInfo.shape == 'CIRCULAR') {
    const diameter = parseFloat(preInfo.horizontalLength);

    if ( diameter <= 1 ) {
      return 1;
    } else if ( diameter <= 2 ) {
      return 2;
    } else if ( diameter <= 4 ) {
      return 3;
    } else if ( diameter < 4.5 ) {
      return 4;
    } else { return 5; }
  }

  if (preInfo.shape == 'RECTANGULAR') {
    const area = parseFloat(calcArea(preInfo));
    const horizontal = parseFloat(preInfo.horizontalLength);
    const vertical = parseFloat(preInfo.verticalLength);

    if ( area <= 1 ) {
      return Math.ceil(horizontal / 0.5) * Math.ceil(vertical / 0.5);
    } else if ( area <= 4 ) {
      return Math.ceil(horizontal / 0.667) * Math.ceil(vertical / 0.667);
    } else if ( area <= 20) {
      return Math.ceil(horizontal) * Math.ceil(vertical);
    } else { return 20; }
  }

  return 1;
}

export const measurePointCaculator = (
  preInfo: PreInfoEditForm
) => {
  const area = calcArea(preInfo);
  const measurePointCnt = calcMeasurePointCnt(preInfo);

  return {
    area: area,
    measurePointCnt: Math.ceil(measurePointCnt / 4),
  }

}