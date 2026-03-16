import type {
  PlanCreateForm, PlanRegisterRequest
} from '@plan/model';

export const mapPlanCreateFormToRequest = (
  form: PlanCreateForm
): PlanRegisterRequest => {
  if (form.stackId == null) {
    throw new Error("stackId is required");
  }

  if (form.teamId == null) {
    throw new Error("teamId is required");
  }

  const ids = form.measurementItemIds;

  return {
    plan: {
      stackId: form.stackId,
      teamId: form.teamId,
      measurementField: form.measurementField,
      measureDate: form.measureDate,
      measurementType: form.measurementType,
      measurementItemIds: ids,
    },

    referenceNumber: "KGAR-26-01-",
    vehicleNumber: form.vehicleNumber,
    mentor: form.mentor,
    mentee: form.mentee,
    
    particleSamplerId: form.particleSamplerId,
    gasSamplerId: form.gasSamplerId,
    pitotTubeId: form.pitotTubeId,
    nozzleId: form.nozzleId,
  };
};