import type { StackCreateForm, StackRegisterRequest } from "@stack/model";

export const mapCreateFormToRequest = (
  form: StackCreateForm
): StackRegisterRequest => ({
  ...form,
})