import type {
  StackCreateForm, StackRegisterRequest,
  StackUpdateForm, StackUpdateRequest
} from "@stack/model";

export const mapCreateFormToRequest = (
  form: StackCreateForm
): StackRegisterRequest => ({
  ...form,
})

export const mapUpdateFormToRequest = (
  form: StackUpdateForm
): StackUpdateRequest => ({
  ...form,
})