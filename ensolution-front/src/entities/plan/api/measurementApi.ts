import { axiosPrivate } from "@shared/api";
import type { ApiResponseMessage } from "@shared/model";

import type { DraftUpdateRequest } from "@/entities/plan/model";

export const measurementDraftUpdateRequest = async (
  planId: number,
  data: Partial<DraftUpdateRequest>
): Promise<ApiResponseMessage<void>> => {
  const res = await axiosPrivate.patch(`/measurement/${planId}/draft`, data);
  return res.data;
}