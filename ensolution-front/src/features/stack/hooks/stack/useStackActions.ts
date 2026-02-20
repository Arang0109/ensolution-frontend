import { useCallback, useState } from 'react';

import { registerStack, patchStack, deleteStack } from '@stack/api/stackApi';
import type { StackRegisterRequest, StackUpdateRequest } from '@stack/model';

import type { ActionResult } from "@shared/model";

export const useStackActions = () => {
  const [creating, setCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const handleCreate = useCallback(
    async (data: StackRegisterRequest) => {
    setCreating(true);
    try {
      const res = await registerStack(data);
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
    async (stackId: number, data: StackUpdateRequest): Promise<ActionResult> => {
    setUpdatingId(stackId);
    try {
      const res = await patchStack(stackId, data);
      return {
        success: res.status,
        message: res.message,
      };

    } finally {
      setUpdatingId(null);
    }
  }, []);

  const handleDelete = useCallback(
    async (stackId: number) => {
    setDeletingId(stackId);

    try {
      const res = await deleteStack(stackId);

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
};
