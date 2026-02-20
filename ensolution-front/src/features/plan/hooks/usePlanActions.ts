import { useState, useCallback } from "react";

import { registerPlan, deletePlan, patchPlanStatus } from "@plan/api/planApi";
import type { PlanRegisterRequest, PlanStatusUpdateRequest } from "@plan/model";

export const usePlanActions = () => {
  const [creating, setCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const handleCreate = useCallback(
    async (data: PlanRegisterRequest) => {
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
  }, []);

  const handleStatusUpdate = useCallback(async (planId: number, data: PlanStatusUpdateRequest) => {
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

  const handleDelete = useCallback(async (planId: number) => {
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
    updatingId,
    deletingId,
    handleCreate,
    handleDelete,
    handleStatusUpdate,
  };
};
