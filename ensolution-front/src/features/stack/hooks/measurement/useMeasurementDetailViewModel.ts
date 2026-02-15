import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useToast } from "@app/providers/toast";

import { useMeasurementActions, useMeasurementEdit, useMeasurementDetail } from '@stack/hooks';
import { mapStackMeasurementUpdateFormToRequest } from '@stack/model';

export const useMeasurementDetailViewModel = () => {
  const { stackMeasurementId } = useParams();
  const { showToast } = useToast();

  const { stackMeasurement, fetchStackMeasurement, loading } = useMeasurementDetail();
  const { handleCreate, deletingId, handleUpdate, handleDelete: deleteStackMeasurementAction } = useMeasurementActions();

  const {
      isEditMode,
      editForm,
  
      startEdit,
      cancelEdit,
      handleChange,
      setIsEditMode,

    } = useMeasurementEdit(stackMeasurement);

  useEffect(() => {
    if (stackMeasurementId) {
      fetchStackMeasurement(Number(stackMeasurementId));
    }
  }, [stackMeasurementId, fetchStackMeasurement]);

  const handleSave = async () => {
    if (!stackMeasurementId) return;

    const payload = mapStackMeasurementUpdateFormToRequest(editForm)
    const result = await handleUpdate(Number(stackMeasurementId), payload);
    
    if (result.success) {
      showToast("수정에 성공했습니다.");
      setIsEditMode(false);
      fetchStackMeasurement(Number(stackMeasurementId));
    } else {
      showToast(result?.message, "error");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    
    if (!stackMeasurementId) return;

    const result = await deleteStackMeasurementAction(Number(stackMeasurementId));
    
    if (result.success) {
      showToast("삭제에 성공했습니다.");
    } else {
      showToast(result?.message, "error");
    }
  };

  return {
    stackMeasurement,
    loading,
    deletingId,

    editForm,
    isEditMode,

    startEdit,
    cancelEdit,
    handleChange,
    handleSave,
    handleDelete,

    handleCreate,
    refreshStackMeasurement: fetchStackMeasurement,
  }
}