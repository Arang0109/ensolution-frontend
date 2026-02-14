import type { WorkplaceCreateForm, WorkplaceRegisterRequest } from "@workplace/model";
import { stripBizNumber } from '@shared/lib';

export const mapCreateFormToRequest = (
  form: WorkplaceCreateForm
): WorkplaceRegisterRequest => ({
  ...form,
  bizNumber: stripBizNumber(form.bizNumber),
});