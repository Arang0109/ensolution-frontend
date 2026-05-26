import { useEffect } from "react";

import { usePlanEditStore } from "@/features/plan/store";

import type { PlanDetailResponse } from "@/entities/plan/model";

export const usePlanEditForm = (plan: PlanDetailResponse | undefined) => {
  const initEditForm = usePlanEditStore((s) => s.initEditForm);
  const editForm = usePlanEditStore((s) => s.editForm);

  useEffect(() => {
    initEditForm(plan);
  }, [plan, initEditForm]);

  return { editForm }; // null 체크용으로만 반환
};