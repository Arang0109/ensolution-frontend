import { useState } from 'react';
import { useToast } from '@common/hooks';
import type { StackRegisterRequest, StackUpdateRequest } from '@stack/model';
import { registerStack, patchStack, deleteStack } from '@stack/api/stackApi';

export const useStackActions = () => {
  const { showToast } = useToast();
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCreate = async (data: StackRegisterRequest) => {
    setIsCreating(true);

    try {
      const res = await registerStack(data);
      if (res.status) {
        showToast('측정시설이 등록되었습니다.', 'success');
      } else {
        showToast(res.message || '측정시설 등록에 실패했습니다.', 'error');
      }
      return { success: res.status, message: res.message };
    } catch {
      const errorMsg = '측정시설 등록 중 오류가 발생했습니다.';
      showToast(errorMsg, 'error');
      return { success: false, message: errorMsg };
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdate = async (stackId: number, data: StackUpdateRequest) => {
    setIsUpdating(true);

    try {
      const res = await patchStack(stackId, data);
      if (res.status) {
        showToast('측정시설이 수정되었습니다.', 'success');
      } else {
        showToast(res.message || '측정시설 수정에 실패했습니다.', 'error');
      }
      return { success: res.status, message: res.message };
    } catch {
      const errorMsg = '측정시설 수정 중 오류가 발생했습니다.';
      showToast(errorMsg, 'error');
      return { success: false, message: errorMsg };
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (stackId: number) => {
    setIsDeleting(true);

    try {
      const res = await deleteStack(stackId);
      if (res.status) {
        showToast('측정시설이 삭제되었습니다.', 'success');
      } else {
        showToast(res.message || '측정시설 삭제에 실패했습니다.', 'error');
      }
      return { success: res.status, message: res.message };
    } catch {
      const errorMsg = '측정시설 삭제 중 오류가 발생했습니다.';
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
