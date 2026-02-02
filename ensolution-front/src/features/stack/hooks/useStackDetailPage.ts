import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from "@app/providers/toast";

import { useStackDetail, useStackActions } from '@stack/hooks';
import type { StackUpdateRequest } from '@stack/model';

export const useStackDetailPage = () => {
  const navigate = useNavigate();
  const backUrl = () => {navigate("/stack")};

  const { showToast } = useToast();
  const { stackId } = useParams();
  const [isEditMode, setIsEditMode] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const { stack, fetchStack, loading } = useStackDetail();
  const { handleUpdate, handleDelete, isDeleting } = useStackActions();

  const [editForm, setEditForm] = useState<StackUpdateRequest>({
    name: '',
    semsNumber: '',
    grade: 'TYPE_1',
    height: '',
    horizontalLength: '',
    verticalLength: '',
    shape: 'CIRCULAR',
    orientation: 'VERTICAL',
    remark: '',
  });

  const handleEditChange = (
    name: keyof StackUpdateRequest,
    value: string
  ) => {
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateClick = () => {
    if (!stack) return;

    // Refresh form data when entering edit mode
    setEditForm({
      name: stack.stack.name,
      semsNumber: stack.stack.semsNumber || '',
      grade: stack.stack.grade || 'TYPE_1',
      height: stack.stack.height || '',
      horizontalLength: stack.stack.horizontalLength || '',
      verticalLength: stack.stack.verticalLength || '',
      shape: stack.stack.shape || 'CIRCULAR',
      orientation: stack.stack.orientation || 'VERTICAL',
      remark: stack.stack.remark || '',
    });
    setIsEditMode(true);
  };

  const handleDeleteClick = async () => {
    if (!stackId) return;

    if (window.confirm('정말 삭제하시겠습니까?')) {
      const result = await handleDelete(Number(stackId));
      if (result.success) {
        backUrl();
      } else {
        showToast(result.message, "error");
      }
    }
  };

  const handleSaveEdit = async () => {
    if (!stackId) return;

    const result = await handleUpdate(Number(stackId), editForm);
    showToast(result.message);

    setIsEditMode(false);
    fetchStack(Number(stackId));
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
  };

  useEffect(() => {
    if (stackId) {
      fetchStack(Number(stackId));
    }
  }, [stackId, fetchStack]);

  return {
    stack,
    showAddModal,
    setShowAddModal,
    fetchStack,

    handleEditChange,
    handleUpdateClick,
    handleDeleteClick,
    handleSaveEdit,
    handleCancelEdit,

    isEditMode,
    isDeleting,

    loading,
    editForm,
    backUrl,
  }
}