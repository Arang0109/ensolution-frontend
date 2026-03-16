import type { Shape, Orientation, Cycle } from '@stack/model';
import type { MeasurementField, MeasurementType, PlanDetailResponse } from '@plan/model';

import type { Grade } from '@shared/model';

export interface MeasurementItemEditForm {
  stackMeasurementId: number;
  pollutantId: number;

  pollutantNameKr: string;
  pollutantNameEn: string;
  method: string;
  testEquipment: string;
  testMethod: string;
  samplingTime: string;
  samplingVolume: string;
  cycle: Cycle;
  allowance: string;

  startTime: string;
  endTime: string;
}

export const getDefaultMeasurementItemsEditForm = (
  plan: PlanDetailResponse | undefined
): MeasurementItemEditForm[] => {
  const measurementItems = plan?.measurementInfo?.measurementItems ?? [];

  return measurementItems.map((m) => ({
    stackMeasurementId: m.stackMeasurementId,
    pollutantId: m.pollutantId,
    pollutantNameKr: m.pollutantNameKr,
    pollutantNameEn: m.pollutantNameEn,
    method: m.method,
    testEquipment: m.testEquipment,
    testMethod: m.testMethod,
    samplingTime: m.samplingTime,
    samplingVolume: m.samplingVolume,
    cycle: m.cycle,
    allowance: m.allowance,

    startTime: m.startTime,
    endTime: m.endTime,
  }));
};

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

export interface PlanInfoEditForm {
  referenceNumber: string;
  measureDate: string;
  receivedDate: string;
  analysisDate: string;
  measurementField: MeasurementField;
  measurementType: MeasurementType;
  teamName: string;
  vehicleNumber: string;
  mentor: string;
  mentee: string;

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
): PlanInfoEditForm => {
  const measurementInfo = plan?.measurementInfo;
  const company = plan?.measurementInfo.client.company;
  const stack = plan?.measurementInfo.client.stack;

  return {
    referenceNumber: measurementInfo?.referenceNumber ?? "",
    measureDate: measurementInfo?.measureDate ?? "",
    receivedDate: measurementInfo?.receivedDate ?? "",
    analysisDate: measurementInfo?.analysisDate ?? "",
    measurementField: measurementInfo?.measurementField ?? "AIR",
    measurementType: measurementInfo?.measurementType ?? "SELF",
    teamName: measurementInfo?.teamName ?? "",
    mentor: measurementInfo?.mentor ?? "",
    mentee: measurementInfo?.mentee ?? "",
    vehicleNumber: measurementInfo?.vehicleNumber ?? "",

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