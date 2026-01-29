import { useWorkplaces } from "@workplace/hooks/useWorkplaces";

import { WorkplaceCardItem } from "@workplace/ui";

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
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">등록된 사업장이 없습니다.</p>
          <p className="text-gray-400 text-sm mt-2">
            새로운 사업장을 등록하세요.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workplaces.map((workplace) => (
            <WorkplaceCardItem workplace={workplace} />
          ))}
        </div>
      )}
    </div>
  );
};
