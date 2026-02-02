import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from "@app/providers/toast";

import { useWorkplaceDetail, useWorkplaceActions } from '@workplace/hooks';
import type { WorkplaceUpdateRequest } from '@workplace/model';

import { formatBizNumber, stripBizNumber, useSearch } from '@shared/lib';

export const useWorkplaceDetailPage = () => {
  const navigate = useNavigate();
  const backUrl = () => {navigate("/workplace")};

  const { showToast } = useToast();
  const { workplaceId } = useParams();
  const [isEditMode, setIsEditMode] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const { workplace, fetchWorkplace, loading } = useWorkplaceDetail();
  const { handleUpdate, handleDelete, isDeleting } = useWorkplaceActions();

  const [editForm, setEditForm] = useState<WorkplaceUpdateRequest>({
      name: '',
      address: '',
      bizNumber: '',
      businessCategory: '',
      grade: 'TYPE_1',
      remark: '',
    });

  const { searchTerm, setSearchTerm, filtered: filteredStacks } = useSearch(
    workplace?.stacks || [],
    ['name', 'semsNumber']
  );

  const handleEditChange = (
    name: keyof WorkplaceUpdateRequest,
    value: string
  ) => {
    setEditForm(prev => ({
      ...prev,
      [name]:
        name === "bizNumber"
          ? formatBizNumber(value)
          : value,
    }));
  };

  const handleUpdateClick = async () => {
    if (!workplace) return;

    setEditForm({
      name: workplace.workplace.name,
      address: workplace.workplace.address,
      bizNumber: formatBizNumber(workplace.workplace.bizNumber),
      businessCategory: workplace.workplace.businessCategory,
      grade: workplace.workplace.grade,
      remark: workplace.workplace.remark || '',
    });

    setIsEditMode(true);
  };

  const handleDeleteClick = async () => {
    if (!workplaceId) return;

    if (window.confirm('정말 삭제하시겠습니까?')) {
      const result = await handleDelete(Number(workplaceId));
      if (result.success) {
        backUrl();
      } else {
        showToast(result.message, "error");
      }
    }
  };

  const handleSaveEdit = async () => {
    if (!workplaceId) return;

    const updateData: WorkplaceUpdateRequest = {
      ...editForm,
      bizNumber: stripBizNumber(editForm.bizNumber),
    };

    const result = await handleUpdate(Number(workplaceId), updateData);
    showToast(result.message);

    setIsEditMode(false);
    fetchWorkplace(Number(workplaceId));
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
  };

  const handleStackAddSuccess = () => {
    if (workplaceId) {
      fetchWorkplace(Number(workplaceId));
    }
  };

  useEffect(() => {
    if (workplaceId) {
      fetchWorkplace(Number(workplaceId));
    }
  }, [workplaceId, fetchWorkplace]);
  

  return {
    workplace,
    showAddModal,
    setShowAddModal,

    handleEditChange,
    handleUpdateClick,
    handleDeleteClick,
    handleSaveEdit,
    handleCancelEdit,
    handleStackAddSuccess,

    isEditMode,
    isDeleting,

    searchTerm,
    setSearchTerm,
    filtered: filteredStacks,

    loading,
    editForm,
    backUrl,
  }
}