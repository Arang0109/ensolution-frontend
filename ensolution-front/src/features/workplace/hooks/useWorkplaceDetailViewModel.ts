import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useToast } from "@app/providers/toast";

import { useWorkplaceDetail, useWorkplaceActions, useWorkplaceEdit } from '@workplace/hooks';
import { mapUpdateFormToRequest } from '@workplace/model';

import { useStackActions } from '@stack/hooks';

import { useSearch } from '@shared/lib';

export const useWorkplaceDetailViewModel = () => {
  const navigate = useNavigate();
  const goBack = () => {navigate("/workplace")};

  const { workplaceId } = useParams();
  const { showToast } = useToast();

  const { workplace, fetchWorkplace, loading } = useWorkplaceDetail();
  const { deletingId, handleDelete: deleteWorkplaceAction, handleUpdate } = useWorkplaceActions();
  const [showAddModal, setShowAddModal] = useState(false);
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
  } = useWorkplaceEdit(workplace);

  const { searchTerm, setSearchTerm, filtered: filteredStacks } = useSearch(
    workplace?.stacks || [],
    ['name', 'semsNumber']
  );
  
  useEffect(() => {
    if (workplaceId) {
      fetchWorkplace(Number(workplaceId));
    }
  }, [workplaceId, fetchWorkplace]);

  const handleSave = async () => {
    if (!workplaceId) return;

    if (!validate()) return;

    const payload = mapUpdateFormToRequest(editForm);
    const result = await handleUpdate(Number(workplaceId), payload);
    
    if (result.success) {
      showToast("수정에 성공했습니다.");
      setIsEditMode(false);
      fetchWorkplace(Number(workplaceId));
    } else {
      showToast(result?.message, "error");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    
    if (!workplaceId) return;

    const result = await deleteWorkplaceAction(Number(workplaceId));
    
    if (result.success) {
      showToast("삭제에 성공했습니다.");
      goBack();
    } else {
      showToast(result?.message, "error");
    }
  };
  

  return {
    workplace,
    loading,
    deletingId,

    showAddModal,
    setShowAddModal,

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
    refreshWorkplace: fetchWorkplace,

    searchTerm, setSearchTerm, filtered: filteredStacks
  };
}