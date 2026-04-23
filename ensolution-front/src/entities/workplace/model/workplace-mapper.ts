import type {
  WorkplaceCreateForm, WorkplaceRegisterRequest,
  WorkplaceUpdateForm, WorkplaceUpdateRequest
} from "@entities/workplace/model";
import { stripBizNumber } from '@shared/lib';

export const mapCreateFormToRequest = (
  form: WorkplaceCreateForm
): WorkplaceRegisterRequest => ({
  ...form,
  bizNumber: stripBizNumber(form.bizNumber),
});

export const mapUpdateFormToRequest = (
  form: WorkplaceUpdateForm
): WorkplaceUpdateRequest => ({
  ...form,
  bizNumber: stripBizNumber(form.bizNumber),
});