import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useToast } from "@app/providers/toast";

import { useStackDetailQuery, useStackActions, useStackEditForm } from '@stack/hooks';
import { mapStackUpdateFormToRequest } from '@/entities/stack/model';

export const useStackDetailViewModel = () => {
  const navigate = useNavigate();
  const goBack = () => {navigate("/stack")};

  const { stackId } = useParams();
  const { showToast } = useToast();

  const { stack, fetchStack, loading } = useStackDetailQuery();
  const { deletingId, updateStackProfile, deleteStackProfile } = useStackActions();

  const {
      isEditMode,
      editForm,
      errors,
  
      startEdit,
      cancelEdit,
      updateField,
      setIsEditMode,
  
      validateForm,
    } = useStackEditForm(stack);

  useEffect(() => {
    if (stackId) {
      fetchStack(Number(stackId));
    }
  }, [stackId, fetchStack]);

  const handleSave = async () => {
    if (!stackId) return;

    if (!validateForm()) return;

    const payload = mapStackUpdateFormToRequest(editForm);
    const result = await updateStackProfile(Number(stackId), payload);
    
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

    const result = await deleteStackProfile(Number(stackId));
    
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
    updateField,

    goBack,
    handleSave,
    handleDelete,
    refreshStack: fetchStack,
  }
}