import { useState } from 'react';
import type { WorkplaceRegisterRequest, WorkplaceUpdateRequest } from '@workplace/model';
import { registerWorkplace, patchWorkplace, deleteWorkplace } from '@workplace/api/workplaceApi';

export const useWorkplaceActions = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCreate = async (data: WorkplaceRegisterRequest) => {
    setIsCreating(true);

    try {
      const res = await registerWorkplace(data);
      return { success: res.status, message: res.message };
    } catch {
      return { success: false, message: '사업장 등록 중 오류가 발생했습니다.' };
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdate = async (workplaceId: number, data: WorkplaceUpdateRequest) => {
    setIsUpdating(true);

    try {
      const res = await patchWorkplace(workplaceId, data);
      return { success: res.status, message: res.message };
    } catch {
      return { success: false, message: '사업장 수정 중 오류가 발생했습니다.' };
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (workplaceId: number) => {
    setIsDeleting(true);

    try {
      const res = await deleteWorkplace(workplaceId);
      return { success: res.status, message: res.message };
    } catch {
      return { success: false, message: '사업장 삭제 중 오류가 발생했습니다.' };
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    isCreating,
    isUpdating,
    isDeleting,
    handleCreate,
    handleUpdate,
    handleDelete,
  };
};
