import type {
  StackMeasurementCreateForm, StackMeasurementCreateRequest,
  StackMeasurementUpdateForm, StackMeasurementUpdateRequest
} from "@stack/model";

export const mapStackMeasurementCreateFormToRequest = (
  form: StackMeasurementCreateForm[]
): StackMeasurementCreateRequest[] => {
  return form;
};

export const mapStackMeasurementUpdateFormToRequest = (
  form: StackMeasurementUpdateForm
): StackMeasurementUpdateRequest => ({
  ...form,
});