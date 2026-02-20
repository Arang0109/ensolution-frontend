import type { MeasurementField } from '@plan/model';

export const DEFAULT_MEASUREMENT_FIELD: MeasurementField = "AIR";

export interface PlanCreateForm {
  stackId: number | null;
  teamId: number | null;
  measureDate: string;
  measureField: MeasurementField;
  measurementType: string;
  measurementIds: number[];

  simplifiedMeasurement: boolean;
  vehicleNumber: string;
  mentor: string;
  mentee: string;

  particleSamplerId: string;
  gasSamplerId: string;
  pitotTubeId: string;
  nozzleId: string;
}

export const getDefaultPlanCreateForm = (): PlanCreateForm => ({
  stackId: null,
  teamId: null,
  measureDate: "",
  measureField: DEFAULT_MEASUREMENT_FIELD,
  measurementType: "",
  measurementIds: [],


  simplifiedMeasurement: true,
  vehicleNumber: "",
  mentor: "",
  mentee: "",

  particleSamplerId: "",
  gasSamplerId: "",
  pitotTubeId: "",
  nozzleId: "",
});