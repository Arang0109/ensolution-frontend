import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useToast } from "@app/providers/toast";

import { mapDraftFormToRequest, type PlanDraftEditForm } from '@plan/model';
import { usePlanDetailQuery, usePlanActions, usePlanDraftData } from '@plan/hooks';

export const usePlanDraftViewModel = () => {
  const navigate = useNavigate();
  const goBack = () => {navigate("/plan")};
  const { showToast } = useToast();

  const { planId } = useParams();
  const { plan, isLoading } = usePlanDetailQuery(Number(planId));

  const { stack, fetchStack } = usePlanDraftData();
  const { saveDraft, deleteDraft, deletingId } = usePlanActions();

  useEffect(() => {
    if (plan?.plan.stackId) {
      fetchStack(plan.plan.stackId);
    }
  }, [plan?.plan.stackId, fetchStack]);

  const handleSaveDraft = async (editForm: PlanDraftEditForm) => {

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
    stack,
    plan,
    isLoading,
    deletingId,

    goBack,

    handleSaveDraft,
    handleDeleteDraft,
  }
}