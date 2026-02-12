import { useNavigate } from "react-router-dom";

import { usePlans } from "@plan/hooks";
import { PlanListTable } from "@plan/ui";

import { Button, FullPageLoader } from "@shared/ui";

export const PlanListPage = () => {
  const navigate = useNavigate();
  const { plans, loading } = usePlans();

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
      <PlanListTable plans={plans} />
    </div>
  );
};
