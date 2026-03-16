import { useCallback, useState } from 'react';

import { registerPrevention, patchPrevention, deletePrevention } from '@stack/api';
import type { PreventionRegisterRequest, PreventionUpdateRequest } from '@stack/model';

export const usePreventionActions = () => {
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleCreate = useCallback(
    async (data: PreventionRegisterRequest) => {
    setCreating(true);
    try {
      const res = await registerPrevention(data);
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
    async (preventionId: number, data: PreventionUpdateRequest) => {
    setUpdating(true);
    try {
      const res = await patchPrevention(preventionId, data);
      return {
        success: res.status,
        message: res.message,
        data: res.data,
      };
    } finally {
      setUpdating(false);
    }
  }, []);

  const handleDelete = useCallback(
    async (preventionId: number) => {
    setDeleting(true);
    try {
      const res = await deletePrevention(preventionId);
      return {
        success: res.status,
        message: res.message,
      };
    } finally {
      setDeleting(false);
    }
  }, []);

  return {
    creating,
    updating,
    deleting,

    handleCreate,
    handleUpdate,
    handleDelete,
  };
};