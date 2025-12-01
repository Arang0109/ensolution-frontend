import { useState } from "react";
import type {
  PollutantRegisterRequest,
  PollutantUpdateRequest,
} from "@pollutant/model/pollutant.types";
import {
  registerPollutant,
  patchPollutant,
  deletePollutant,
} from "@pollutant/api/pollutantApi";

export const usePollutantActions = (onSuccess?: () => void) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCreate = async (
    data: PollutantRegisterRequest
  ): Promise<boolean> => {
    setIsSubmitting(true);
    try {
      const res = await registerPollutant(data);
      if (res.status) {
        onSuccess?.();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to create pollutant:", error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (
    pollutantId: number,
    data: PollutantUpdateRequest
  ): Promise<boolean> => {
    setIsSubmitting(true);
    try {
      const res = await patchPollutant(pollutantId, data);
      if (res.status) {
        onSuccess?.();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to update pollutant:", error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (pollutantId: number): Promise<boolean> => {
    setIsDeleting(true);
    try {
      const res = await deletePollutant(pollutantId);
      if (res.status) {
        onSuccess?.();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to delete pollutant:", error);
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    handleCreate,
    handleUpdate,
    handleDelete,
    isSubmitting,
    isDeleting,
  };
};
