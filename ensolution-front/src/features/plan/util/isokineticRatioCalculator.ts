import { calculator } from "@shared/lib"

const calcExpectSamplingTime = (
  Pa: number,
  Pg: number,
  orificeDp: number,
  Vm: number,
  Vlc: number,
  Tm: number,
  Tg: number,
  Vs: number,
  An: number,
) => {
  const Pm = Pa + (orificeDp/13.6);

  const a = Tg * ((0.00346 * Vlc) + (Vm * (Pm/Tm))) * 1.667 * Math.pow(10,2);
  const b = Pg * Vs * An;

  return a / b;
}

// const calcIsokineticRatio = (
//   Vlc: number,
//   Vm: number,
//   Pm: number,
//   Pg: number,
//   Tm: number,
//   Tg: number,
//   t: number,
//   Vs: number,
//   An: number
// ) => {
//   const a = Tg * (0.00346 * Vlc + Vm * (Pm / Tm));
//   const b = Pg * t * Vs * An;

//   return (a / b) * (1.667 * Math.pow(10, 6));
// }

const calcVlc = (
  Xw: number,
  Vm: number
) => {
  return Vm * Math.pow(10,3) * (Xw/(100-Xw)) * (18/22.4);
}

export const isokineticRatioCalculator = (
  recommendNozzleList: {
    nozzle: number,
    orificeDp: number | null,
    Vm: number | null,
    Vlc: number | null,
    samplingTime: number | null,
  }[],
  Xw: number | null,
  Pa: number | null,
  Pg: number | null,
  AvgTm: number | null,
  AvgTg: number | null,
  Vs: number | null,
  selectedNozzle: number | null,
) => {
  const { safeCalc, round, calcArea } = calculator;

  // 1. recommendNozzleList 구하기
  for (let i = 0; i < recommendNozzleList.length; i++) {
    const Vm = recommendNozzleList[i].Vm;
    const orificeDp = recommendNozzleList[i].orificeDp
    recommendNozzleList[i].Vlc = safeCalc([Xw, Vm], () => round(calcVlc(Xw!, Vm!), 2));

    const Dn = recommendNozzleList[i].nozzle; // cm
    const An = round(calcArea('CIRCULAR', [Dn]), 3);

    recommendNozzleList[i].samplingTime = safeCalc([Pa, Pg, orificeDp, Vm, recommendNozzleList[i].Vlc, AvgTm, AvgTg, Vs, An], () =>
      round(calcExpectSamplingTime(Pa!, Pg!, orificeDp!, Vm!, recommendNozzleList[i].Vlc!, AvgTm!, AvgTg!, Vs!, An!), 1)
    );
  };

  return {
    recommendList: recommendNozzleList
  };
}