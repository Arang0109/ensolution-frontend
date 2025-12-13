import { useState } from 'react';

import { useToast } from '@common/hooks';
import type { WorkplaceRegisterRequest, WorkplaceUpdateRequest } from '@workplace/model';
import { registerWorkplace, patchWorkplace, deleteWorkplace } from '@workplace/api/workplaceApi';

export const useWorkplaceActions = () => {
  const { showToast } = useToast();
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCreate = async (data: WorkplaceRegisterRequest) => {
    setIsCreating(true);

    try {
      const res = await registerWorkplace(data);
      if (res.status) {
        showToast('사업장이 등록되었습니다.', 'success');
      } else {
        showToast(res.message || '사업장 등록에 실패했습니다.', 'error');
      }
      return { success: res.status, message: res.message };
    } catch {
      const errorMsg = '사업장 등록 중 오류가 발생했습니다.';
      showToast(errorMsg, 'error');
      return { success: false, message: errorMsg };
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdate = async (workplaceId: number, data: WorkplaceUpdateRequest) => {
    setIsUpdating(true);

    try {
      const res = await patchWorkplace(workplaceId, data);
      if (res.status) {
        showToast('사업장이 수정되었습니다.', 'success');
      } else {
        showToast(res.message || '사업장 수정에 실패했습니다.', 'error');
      }
      return { success: res.status, message: res.message };
    } catch {
      const errorMsg = '사업장 수정 중 오류가 발생했습니다.';
      showToast(errorMsg, 'error');
      return { success: false, message: errorMsg };
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (workplaceId: number) => {
    setIsDeleting(true);

    try {
      const res = await deleteWorkplace(workplaceId);
      if (res.status) {
        showToast('사업장이 삭제되었습니다.', 'success');
      } else {
        showToast(res.message || '사업장 삭제에 실패했습니다.', 'error');
      }
      return { success: res.status, message: res.message };
    } catch {
      const errorMsg = '사업장 삭제 중 오류가 발생했습니다.';
      showToast(errorMsg, 'error');
      return { success: false, message: errorMsg };
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
