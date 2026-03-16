import { useState, useCallback } from "react";

import { registerPollutant, patchPollutant, deletePollutant } from "@pollutant/api/pollutantApi";
import type { PollutantRegisterRequest, PollutantUpdateRequest } from "@pollutant/model";

import type { ActionResult } from "@shared/model";

export const usePollutantActions = () => {
  const [creating, setCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const handleCreate = useCallback(
    async (data: PollutantRegisterRequest) => {
    setCreating(true);
    try {
      const res = await registerPollutant(data);
      return {
          success: res.status,
          message: res.message,
        };

      } finally {
        setCreating(false);
      }
    },
    []
  );

  const handleDelete = useCallback(async (workplaceId: number) => {
    setDeletingId(workplaceId);

    try {
      const res = await deletePollutant(workplaceId);

      return {
          success: res.status,
          message: res.message,
        };

      } finally {
        setDeletingId(null);
      }
    },
    []
  );

  const handleUpdate = useCallback(
    async (workplaceId: number, data: PollutantUpdateRequest): Promise<ActionResult> => {
      setUpdatingId(workplaceId);

      try {
        const res = await patchPollutant(workplaceId, data);

        return {
          success: res.status,
          message: res.message,
        };

      } finally {
        setUpdatingId(null);
      }
    },
    []
  );

  return {
    creating,
    deletingId,
    updatingId,
    handleCreate,
    handleUpdate,
    handleDelete,
  };
};
