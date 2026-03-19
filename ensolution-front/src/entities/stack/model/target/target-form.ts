export interface TargetCreateForm {
  targetSubstance: string;
  removalEfficiency: string;
}

export const getDefaultTargetCreateForm = (): TargetCreateForm => ({
  targetSubstance: "",
  removalEfficiency: "",
});

export interface TargetUpdateForm {
  id: number | null;
  targetSubstance: string;
  removalEfficiency: string;
}

export const getDefaultTargetUpdateForm = (targetId: number | null): TargetUpdateForm => ({
  id: targetId,
  targetSubstance: "",
  removalEfficiency: "",
});