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

  return {
    plan: {
      stackId: form.stackId,
      teamId: form.teamId,
      measureDate: form.measureDate,
      measurementField: form.measurementField,
      measurementType: form.measurementType,
      measurementIds: form.measurementIds,
    },

    referenceNumber: "KGAR-26-01-",
    simplifiedMeasurement: form.simplifiedMeasurement,
    vehicleNumber: form.vehicleNumber,
    mentor: form.mentor,
    mentee: form.mentee,
    particleSamplerId: form.particleSamplerId,
    gasSamplerId: form.gasSamplerId,
    pitotTubeId: form.pitotTubeId,
    nozzleId: form.nozzleId,
  };
};