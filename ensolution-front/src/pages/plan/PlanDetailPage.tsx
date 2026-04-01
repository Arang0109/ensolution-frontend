import { usePlanDraftViewModel } from "@plan/hooks"
import { PlanDetailContent } from "@/features/plan/ui";

import { FullPageLoader } from "@shared/ui";

export const PlanDetailPage = () => {
  const viewModel = usePlanDraftViewModel();

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