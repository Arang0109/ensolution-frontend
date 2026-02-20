import { useNavigate } from "react-router-dom";

import { usePlans } from "@plan/hooks";
import { PlanTableSection } from "@plan/components";

import { Button, FullPageLoader, EmptyState } from "@shared/ui";

export const PlanListPage = () => {
  const navigate = useNavigate();
  const { plans, error, loading, reload } = usePlans();

  const isEmpty = !error && plans.length === 0;

  if (loading) {
    return (<FullPageLoader />);
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">측정일정 관리</h1>
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
