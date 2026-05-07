import type {
  StackCreateForm, StackRegisterRequest,
  StackUpdateForm, StackUpdateRequest
} from "@/entities/stack/model";

export const mapStackCreateFormToRequest = (
  form: StackCreateForm
): StackRegisterRequest => ({
  ...form,
})

export const mapStackUpdateFormToRequest = (
  form: StackUpdateForm
): StackUpdateRequest => ({
  ...form,
})