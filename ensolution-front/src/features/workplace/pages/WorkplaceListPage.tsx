import { useWorkplaces } from "@workplace/hooks";
import { WorkplaceListTable } from "@workplace/ui";

import { EmptyState } from "@shared/ui";

export const WorkplaceListPage = () => {
  const { workplaces, loading } = useWorkplaces();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">측정대상 사업장</h1>
      </div>

      <hr className="border-gray-200 mb-6" />

      {/* Workplace List */}
      {workplaces.length === 0 ? (
        <EmptyState title="등록된 사업장이 없습니다." />
      ) : (
        <WorkplaceListTable workplaces={workplaces} />
      )}
    </div>
  );
};
