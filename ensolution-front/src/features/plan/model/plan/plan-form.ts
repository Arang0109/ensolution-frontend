
import {
  getDefaultPreInfoEditForm,
  getDefaultEquipmentEditForm,
  getDefaultMeasurementItemEditForm,
  getDefaultFieldDataEditForm
} from '@plan/model';
import type {
  MeasurementField, PlanDetailResponse,
  PreInfoEditForm, EquipmentEditForm,
  MeasurementItemEditForm, FieldDataEditForm
} from '@plan/model';

export const DEFAULT_MEASUREMENT_FIELD: MeasurementField = "AIR";
const today = new Date().toISOString().slice(0, 10);

export interface PlanCreateForm {
  stackId: number | null;
  teamId: number | null;
  measureDate: string;
  measurementField: MeasurementField;
  measurementType: string;
  measurementIds: number[];

  referenceNumber: string;
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
  measureDate: today,
  measurementField: DEFAULT_MEASUREMENT_FIELD,
  measurementType: "",
  measurementIds: [],

  referenceNumber: "",
  simplifiedMeasurement: true,
  vehicleNumber: "",
  mentor: "",
  mentee: "",

  particleSamplerId: "",
  gasSamplerId: "",
  pitotTubeId: "",
  nozzleId: "",
});

export interface PlanDraftEditForm {
  preInfo: PreInfoEditForm;
  equipment: EquipmentEditForm;
  measurementItems: MeasurementItemEditForm;
  fieldData: FieldDataEditForm;

  // 추후 추가할 것!
  // labData: LabDataEditForm;
}

export const getDefaultPlanDraftEditForm = (
  plan: PlanDetailResponse | undefined
): PlanDraftEditForm => {
  const preInfo = getDefaultPreInfoEditForm(plan);
  const equipment = getDefaultEquipmentEditForm(plan);
  const measurementItems = getDefaultMeasurementItemEditForm(plan);
  const fieldData = getDefaultFieldDataEditForm(plan);

  return {
    preInfo: preInfo,
    equipment: equipment,
    measurementItems: measurementItems,

    fieldData: fieldData,
  }
}