import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useToast } from "@app/providers/toast";

import { useStackDetail, useStackActions, useStackEdit } from '@stack/hooks';
import { mapUpdateFormToRequest } from '@stack/model';

export const useStackDetailViewModel = () => {
  const navigate = useNavigate();
  const goBack = () => {navigate("/stack")};

  const { stackId } = useParams();
  const { showToast } = useToast();

  const { stack, fetchStack, loading } = useStackDetail();
  const { deletingId, handleUpdate, handleDelete: deleteStackAction } = useStackActions();
  const { handleCreate } = useStackActions();

  const {
      isEditMode,
      editForm,
      errors,
  
      startEdit,
      cancelEdit,
      handleChange,
      setIsEditMode,
  
      validate,
    } = useStackEdit(stack);

  useEffect(() => {
    if (stackId) {
      fetchStack(Number(stackId));
    }
  }, [stackId, fetchStack]);

  const handleSave = async () => {
    if (!stackId) return;

    if (!validate()) return;

    const payload = mapUpdateFormToRequest(editForm)
    const result = await handleUpdate(Number(stackId), payload);
    
    if (result.success) {
      showToast("수정에 성공했습니다.");
      setIsEditMode(false);
      fetchStack(Number(stackId));
    } else {
      showToast(result?.message, "error");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    
    if (!stackId) return;

    const result = await deleteStackAction(Number(stackId));
    
    if (result.success) {
      showToast("삭제에 성공했습니다.");
      goBack();
    } else {
      showToast(result?.message, "error");
    }
  };

  return {
    stack,
    loading,
    deletingId,

    editForm,
    errors,
    isEditMode,

    startEdit,
    cancelEdit,
    handleChange,

    goBack,
    handleSave,
    handleDelete,

    handleCreate,
    refreshStack: fetchStack,
  }
}