import { useNavigate } from "react-router-dom";

import { usePlanListQuery } from "@plan/hooks";
import { PlanTableSection } from "@plan/components";

import { Button, FullPageLoader, EmptyState, Breadcrumbs } from "@shared/ui";

export const PlanPage = () => {
  const navigate = useNavigate();
  const { plans, error, isLoading, reload } = usePlanListQuery();

  const isEmpty = !error && plans.length === 0;

  if (isLoading) {
    return (<FullPageLoader />);
  }

  const breadcrumbsContents = [
    {title: "대시보드", path: "/dashboard"},
    {title: "측정계획", path: "/plan"},
  ]

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Breadcrumbs
          contents={breadcrumbsContents}
        />
        <Button
           onClick={() => navigate("/plan/add")}
           label="일정 등록"
        />
      </div>

      {/* Plan Table */}
      {error ? (
        <EmptyState
          title="목록을 불러오지 못했습니다."
          actionLabel="다시 시도"
          onAction={reload}
        />
      ) : isEmpty ? (
        <EmptyState title='등록된 측정시설이 없습니다.'/>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          <PlanTableSection plans={plans}/>
        </div>
      )}
    </div>
  );
};
