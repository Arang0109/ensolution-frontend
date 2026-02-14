import type { PollutantCreateForm, PollutantRegisterRequest } from "@pollutant/model";

export const mapCreateFormToRequest = (
  form: PollutantCreateForm
): PollutantRegisterRequest => ({
  ...form
})