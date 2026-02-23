import { useState } from "react";

import type { PlanDetailResponse, PlanDraftEditForm, PreInfoEditForm, EquipmentEditForm } from "@plan/model";
import { getDefaultPlanDraftEditForm } from "@plan/model";

export const usePlanEditForm = (plan: PlanDetailResponse | null) => {
  const [prevPlan, setPrevPlan] = useState<PlanDetailResponse | null>(null);
  const [editForm, setEditForm] =
    useState<PlanDraftEditForm>(getDefaultPlanDraftEditForm(plan));

  // React 권장 패턴
  // Render 중 plan 변경 감지 -> editForm 동기화
  if (plan !== prevPlan) {
    setPrevPlan(plan);
    if (plan) {
      setEditForm(getDefaultPlanDraftEditForm(plan));
    }
  }
    
  const updatePreInfoField = (
    name: keyof PreInfoEditForm,
    value: string
  ) => {
    setEditForm(prev => ({
      ...prev,
      preInfo: {
        ...prev.preInfo,
        [name]: value,
      },
    }));
  };

  const updateEquipmentField = (
    name: keyof EquipmentEditForm,
    value: string | null
  ) => {
    setEditForm(prev => ({
      ...prev,
      equipment: {
        ...prev.equipment,
        [name]: value,
      },
    }));
  };

  const updateMeasurementItems = (ids: number[]) => {
    setEditForm(prev => ({
      ...prev,
      measurementItems: { pollutantIdList: ids },
    }));
  };

  const resetForm = () => {
    if (plan) {
      setEditForm(getDefaultPlanDraftEditForm(plan));
    }
  };

  return {
    editForm,
    updatePreInfoField,
    updateEquipmentField,
    updateMeasurementItems,
    resetForm,
  };
};