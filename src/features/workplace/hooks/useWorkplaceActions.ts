import { useCallback, useState } from 'react';

import { registerWorkplace, patchWorkplace, deleteWorkplace } from '@/entities/workplace/api/workplaceApi';
import type { WorkplaceRegisterRequest, WorkplaceUpdateRequest } from '@entities/workplace/model';

import type { ActionResult } from "@shared/model";

export const useWorkplaceActions = () => {
  const [creating, setCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const handleCreate = useCallback(
    async (data: WorkplaceRegisterRequest) => {
    setCreating(true);
    try {
      const res = await registerWorkplace(data);
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
      const res = await deleteWorkplace(workplaceId);

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
    async (workplaceId: number, data: WorkplaceUpdateRequest): Promise<ActionResult> => {
      setUpdatingId(workplaceId);

      try {
        const res = await patchWorkplace(workplaceId, data);

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
