import type {
  PlanDraftEditForm, DraftUpdateRequest
} from "@plan/model";

export const mapDraftFormToRequest = (
  form: PlanDraftEditForm
): DraftUpdateRequest => ({
  preInfo: {
    referenceNumber: form.preInfo.referenceNumber,
    measureDate: form.preInfo.measureDate,
    measurementField: form.preInfo.measurementField,
    measurementType: form.preInfo.measurementType,
    teamName: form.preInfo.teamName,
    vehicleNumber: form.preInfo.vehicleNumber,
    mentor: form.preInfo.mentor,
    mentee: form.preInfo.mentee,
  },

  client: {
    company: {
      companyName: form.preInfo.companyName,
      workplaceName: form.preInfo.workplaceName,
      ceoName: form.preInfo.ceoName,
      address: form.preInfo.address,
      bizNumber: form.preInfo.bizNumber,
      manager: form.preInfo.manager,
      businessCategory: form.preInfo.businessCategory,
      grade: form.preInfo.workplaceGrade,
    },
    stack: {
      name: form.preInfo.stackName,
      semsNumber: form.preInfo.semsNumber,
      height: form.preInfo.height,
      horizontalLength: form.preInfo.horizontalLength,
      verticalLength: form.preInfo.verticalLength,
      shape: form.preInfo.shape,
      orientation: form.preInfo.orientation,
      standardOxygen: form.preInfo.standardOxygen,
      grade: form.preInfo.stackGrade,
    },
  },

  pollutantIdList: form.measurementItems.pollutantIdList,

  particleSamplerId: form.equipment.particleSamplerId,
  gasSamplerId: form.equipment.gasSamplerId,
  pitotTubeId: form.equipment.pitotTubeId,
  nozzleId: form.equipment.nozzleId,
});