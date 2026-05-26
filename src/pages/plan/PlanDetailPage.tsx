import { useEffect } from "react";

import { usePlanDraftViewModel } from "@/features/plan/hooks"
import { usePlanEditStore } from "@/features/plan/store"
import { PlanDetailContent } from "@/features/plan/ui";

import { FullPageLoader } from "@shared/ui";

export const PlanDetailPage = () => {
  const viewModel = usePlanDraftViewModel();

  const initEditForm = usePlanEditStore((s) => s.initEditForm);
  const plan = viewModel.plan;

  useEffect(() => {
    initEditForm(plan);
  }, [plan, initEditForm]);

  if (viewModel.isLoading || !viewModel.plan) {
    return <FullPageLoader />;
  }

  return (
    <PlanDetailContent
      key={viewModel.plan.plan.id}
      viewModel={viewModel}
    />
  );
};