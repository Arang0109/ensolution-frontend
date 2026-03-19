import type {
  PreventionBundleCreateForm, PreventionRegisterRequest,
  PreventionBundleUpdateForm, PreventionUpdateRequest
} from "@/entities/stack/model";

export const mapPreventionCreateBundleFormToRequest = (
  form: PreventionBundleCreateForm
): PreventionRegisterRequest => ({
  ...form,
});

export const mapPreventionUpdateBundleFormToRequest = (
  form: PreventionBundleUpdateForm
): PreventionUpdateRequest => ({
  ...form,
});