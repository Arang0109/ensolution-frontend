import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useToast } from "@app/providers/toast";

import { mapDraftFormToRequest, type PlanDraftEditForm } from '@/entities/plan/model';
import { usePlanDetailQuery, usePlanActions, usePlanDraftData } from '@/features/plan/hooks';

export const usePlanDraftViewModel = () => {
  const navigate = useNavigate();
  const goBack = () => {navigate("/plan")};
  const { showToast } = useToast();

  const { planId } = useParams();
  const { plan, isLoading } = usePlanDetailQuery(Number(planId));

  const { stack, fetchStack, stackLoading } = usePlanDraftData();
  const { saveDraft, deleteDraft, deletingId, downloadReport} = usePlanActions();

  useEffect(() => {
    if (plan?.plan.stackId) {
      fetchStack(plan.plan.stackId);
    }
  }, [plan?.plan.stackId, fetchStack]);

  const handleReportDownload = async (planId: number) => {
    await downloadReport(Number(planId));
  }

  const handleSaveDraft = async (editForm: PlanDraftEditForm) => {
    console.log("editForm: ", editForm)
    const payload = mapDraftFormToRequest(editForm);
    console.log("payload: ", payload)
    const result = await saveDraft(Number(planId), payload);

    if (result.success) {
      showToast("측정계획이 수정되었습니다.");
    } else {
      showToast(result?.message, "error");
    }
  }

  const handleDeleteDraft = async () => {
    confirm("삭제하시겠습니까? 삭제된 데이터는 복구가 불가능합니다.")
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
    isLoading: isLoading || stackLoading,
    deletingId,

    goBack,

    handleSaveDraft,
    handleDeleteDraft,
    handleReportDownload,
  }
}