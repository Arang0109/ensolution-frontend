import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useToast } from "@app/providers/toast";

import { useStackDetail } from '@stack/hooks';

import { mapDraftFormToRequest } from '@plan/model';
import { usePlanDetailQuery, usePlanActions, usePlanEditForm } from '@plan/hooks';

export const usePlanDraftViewModel = () => {
  const navigate = useNavigate();
  const goBack = () => {navigate("/plan")};

  const { planId } = useParams();
  const { showToast } = useToast();
  
  const { plan, isLoading } = usePlanDetailQuery(Number(planId));
  const stackId = plan?.plan.stackId;
  const { stack, fetchStack } = useStackDetail();
  const { editForm, updatePreInfoField, updateEquipmentField, updateMeasurementItems, resetForm } = usePlanEditForm(plan);
  const { saveDraft, deleteDraft, deletingId } = usePlanActions();

  useEffect(() => {
  if (stackId) {
    fetchStack(stackId);
  }
}, [stackId, fetchStack]);

  const handleSaveDraft = async () => {

    const payload = mapDraftFormToRequest(editForm);
    const result = await saveDraft(Number(planId), payload);

    if (result.success) {
      showToast("측정계획이 수정되었습니다.");
    } else {
      showToast(result?.message, "error");
    }
  }

  const handleDeleteDraft = async () => {
    const result = await deleteDraft(Number(planId));
    if (result.success) {
      showToast("측정계획이 삭제되었습니다.");
      goBack();
    } else {
      showToast(result?.message, "error");
    }
  }

  return {
    plan,
    stack,
    editForm,
    isLoading,
    deletingId,

    goBack,

    handleSaveDraft,
    handleDeleteDraft,
    updatePreInfoField,
    updateEquipmentField,
    updateMeasurementItems,

    resetForm,
  }
}