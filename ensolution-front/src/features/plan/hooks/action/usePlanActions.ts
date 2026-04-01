import { useState, useCallback } from "react";

import { measurementDraftUpdateRequest } from "@/entities/plan/api/measurementApi";
import { registerPlan, deletePlan, patchPlanStatus } from "@/entities/plan/api/planApi";
import type { DraftUpdateRequest, PlanRegisterRequest, PlanStatusUpdateRequest } from "@/entities/plan/model";

export const usePlanActions = () => {
  const [creating, setCreating] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const createPlan = async (data: PlanRegisterRequest) => {
    setCreating(true);
    try {
      const res = await registerPlan(data);
      return {
        success: res.status,
        message: res.message,
        data: res.data,
      };

    } finally {
      setCreating(false);
    }
  };

  const saveDraft = useCallback(
    async (
      planId: number,
      data: Partial<DraftUpdateRequest>
    ) => {
      setSavingDraft(true);
      try {
        const res = await measurementDraftUpdateRequest(planId, data);
        return {
            success: res.status,
            message: res.message,
            data: res.data,
          };

      } finally {
        setSavingDraft(false);
      }
    }, []);

  const updateDraftStatus = useCallback(async (planId: number, data: PlanStatusUpdateRequest) => {
    setUpdatingId(planId);
    try {
      const res = await patchPlanStatus(planId, data);
      return {
        success: res.status,
        message: res.message,
      };

    } finally {
      setUpdatingId(null);
    }
  }, []);

  const deleteDraft = useCallback(async (planId: number) => {
    setDeletingId(planId);
    try {
      const res = await deletePlan(planId);
      return {
        success: res.status,
        message: res.message,
      };

    } finally {
      setDeletingId(null);
    }
  }, []);

  return {
    creating,
    savingDraft,
    updatingId,
    deletingId,

    createPlan,
    saveDraft,
    updateDraftStatus,
    deleteDraft,
  };
};
