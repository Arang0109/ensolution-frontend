export interface ExhaustGasDocResponse {
  o2Concentration: string[];
  co2Concentration: string[];
  coConcentration: string[];
  noxConcentration: string[];
  soxConcentration: string[];

  gasDensity: string;
  o2CorrectionFactor: string;
}