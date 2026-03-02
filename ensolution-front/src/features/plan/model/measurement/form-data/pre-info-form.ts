import type { Shape, Orientation } from '@stack/model';

import type { Grade } from '@shared/model';

import type { PlanDetailResponse } from '@plan/model';

export interface MeasurementItemEditForm {
  measurementItems: number[];
}

export const getDefaultMeasurementItemEditForm = (
  plan: PlanDetailResponse | undefined
): MeasurementItemEditForm => {
  const measurements = plan?.measurementInfo?.measurementItems ?? [];

  return {
    measurementItems: measurements.map(m => m.stackMeasurementId),
  }
}

export interface EquipmentEditForm {
  particleSamplerId: string | null;
  gasSamplerId: string | null;
  pitotTubeId: string | null;
  nozzleId: string | null;
}

export const getDefaultEquipmentEditForm = (
  plan: PlanDetailResponse | undefined
): EquipmentEditForm => {
  const equipment = plan?.measurementInfo.equipment;

  return {
    particleSamplerId: equipment?.particleSampler.equipmentId ?? null,
    gasSamplerId: equipment?.gasSampler.equipmentId ?? null,
    pitotTubeId: equipment?.pitotTube.equipmentId ?? null,
    nozzleId: equipment?.nozzle.equipmentId ?? null
  }
}

export interface PreInfoEditForm {
  referenceNumber: string;
  measureDate: string;
  measurementField: string;
  measurementType: string;
  teamName: string;
  mentor: string;
  mentee: string;
  vehicleNumber: string;

  companyName: string;
  workplaceName: string;
  address: string;
  ceoName: string;
  manager: string;
  bizNumber: string;
  businessCategory: string;
  workplaceGrade: Grade;

  stackName: string;
  semsNumber: string;
  height: string;
  horizontalLength: string;
  verticalLength: string;
  shape: Shape;
  orientation: Orientation;
  standardOxygen: string;
  stackGrade: Grade;
}

export const getDefaultPreInfoEditForm = (
  plan: PlanDetailResponse | undefined
): PreInfoEditForm => {
  const preInfo = plan?.measurementInfo.preInfo;
  const company = plan?.measurementInfo.client.company;
  const stack = plan?.measurementInfo.client.stack;

  return {
    referenceNumber: preInfo?.referenceNumber ?? "",
    measureDate: preInfo?.measureDate ?? "",
    measurementField: preInfo?.measurementField ?? "",
    measurementType: preInfo?.measurementType ?? "",
    teamName: preInfo?.teamName ?? "",
    mentor: preInfo?.mentor ?? "",
    mentee: preInfo?.mentee ?? "",
    vehicleNumber: preInfo?.vehicleNumber ?? "",

    companyName: company?.companyName ?? "",
    workplaceName: company?.workplaceName ?? "",
    ceoName: company?.ceoName ?? "",
    manager: company?.manager ?? "",
    bizNumber: company?.bizNumber ?? "",
    businessCategory: company?.businessCategory ?? "",
    address: company?.address ?? "",
    workplaceGrade: company?.grade ?? "TYPE_1",

    stackName: stack?.name ?? "",
    semsNumber: stack?.semsNumber ?? "",
    height: stack?.height ?? "",
    horizontalLength: stack?.horizontalLength ?? "",
    verticalLength: stack?.verticalLength ?? "",
    shape: stack?.shape ?? "CIRCULAR",
    orientation: stack?.orientation ?? "VERTICAL",
    standardOxygen: stack?.standardOxygen ?? "",
    stackGrade: stack?.grade ?? "TYPE_1",
  };
};