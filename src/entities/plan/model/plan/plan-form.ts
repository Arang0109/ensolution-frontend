
import {
  getDefaultPreInfoEditForm,
  getDefaultEquipmentEditForm,
  getDefaultMeasurementItemsEditForm,
  getDefaultMeasurementSheetsEditForm
} from '@/entities/plan/model';
import type {
  MeasurementField, PlanDetailResponse,
  PlanInfoEditForm, EquipmentEditForm,
  MeasurementItemEditForm, MeasurementSheetEditForm
} from '@/entities/plan/model';

export const DEFAULT_MEASUREMENT_FIELD: MeasurementField = "AIR";
const today = new Date().toISOString().slice(0, 10);

export interface PlanCreateForm {
  stackId: number | null;
  teamId: number | null;
  measureDate: string;
  measurementField: MeasurementField;
  measurementType: string;
  measurementItemIds: number[];

  referenceNumber: string;
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
  measurementItemIds: [],

  referenceNumber: "",
  vehicleNumber: "",
  mentor: "",
  mentee: "",

  particleSamplerId: "",
  gasSamplerId: "",
  pitotTubeId: "",
  nozzleId: "",
});

export interface PlanDraftEditForm {
  planInfo: PlanInfoEditForm;
  equipment: EquipmentEditForm;
  measurementItems: MeasurementItemEditForm[];
  sheets: MeasurementSheetEditForm[];

  // 추후 추가할 것!
  // labData: LabDataEditForm;
}

export const getDefaultPlanDraftEditForm = (
  plan?: PlanDetailResponse
): PlanDraftEditForm => {
  const planInfo = getDefaultPreInfoEditForm(plan);
  const equipment = getDefaultEquipmentEditForm(plan);
  const measurementItems = getDefaultMeasurementItemsEditForm(plan);
  const sheets = getDefaultMeasurementSheetsEditForm(plan);

  return {
    planInfo: planInfo,
    equipment: equipment,
    measurementItems: measurementItems,
    sheets: sheets,
  }
}