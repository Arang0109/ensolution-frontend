import { useState, useCallback } from "react";

import { registerStackMeasurement, patchStackMeasurement, deleteStackMeasurement } from "@stack/api";
import type { StackMeasurementCreateRequest, StackMeasurementUpdateRequest } from "@stack/model";

import type { ActionResult } from "@shared/model";

export const useMeasurementActions = () => {
  const [creating, setCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const handleCreate = useCallback(
    async (data: StackMeasurementCreateRequest[]) => {
    setCreating(true);

    try {
      const res = await registerStackMeasurement(data);
      return {
        success: res.status,
        message: res.message,
        data: res.data,
      };

    } finally {
      setCreating(false);
    }
  }, []);

  const handleUpdate = useCallback(
      async (stackMeasurementId: number, data: StackMeasurementUpdateRequest): Promise<ActionResult> => {
      setUpdatingId(stackMeasurementId);
  
      try {
        const res = await patchStackMeasurement(stackMeasurementId, data);
  
        return {
          success: res.status,
          message: res.message,
        };
  
      } finally {
        setUpdatingId(null);
      }
    }, []);
  
    const handleDelete = useCallback(
      async (stackMeasurementId: number) => {
      setDeletingId(stackMeasurementId);
  
      try {
        const res = await deleteStackMeasurement(stackMeasurementId);
  
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
    handleUpdate,
    handleDelete,
  };
}