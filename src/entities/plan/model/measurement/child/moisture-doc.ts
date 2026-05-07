export interface MoistureDocResponse {
  weight: MoistureWeightSnapshot;
  gasMeterTemperature: GasMeterTemperatureSnapshot;
  dryGasVolume: DryGasVolumeSnapshot;

  suctionVelocity: string;
  gasMeterGaugePressure: string;

  moistureRatio?: string;
}

export interface MoistureWeightSnapshot {
  before: string;
  after: string;
}

export interface GasMeterTemperatureSnapshot {
  in: string;
  out: string;
}

export interface DryGasVolumeSnapshot {
  before: string;
  after: string;
}