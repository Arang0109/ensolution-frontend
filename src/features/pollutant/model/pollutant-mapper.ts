import type { PollutantCreateForm, PollutantRegisterRequest } from "@/features/pollutant/model";

export const mapCreateFormToRequest = (
  form: PollutantCreateForm
): PollutantRegisterRequest => ({
  ...form
})