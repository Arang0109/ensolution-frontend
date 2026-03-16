import { useWorkplaces } from "@workplace/hooks";
import { WorkplaceTableSection } from "@workplace/component";

import { EmptyState, FullPageLoader } from "@shared/ui";

export const WorkplaceListPage = () => {
  const { workplaces, error, loading, reload } = useWorkplaces();

  const isEmpty = !error && workplaces.length === 0;
  
  if (loading) return <FullPageLoader />;

  return (
    <div className="px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">측정대상 사업장</h1>
      </div>

      <hr className="border-gray-200 mb-6" />

      {error ? (
      <EmptyState
        title="목록을 불러오지 못했습니다."
        actionLabel="다시 시도"
        onAction={reload}
      />
      ) : isEmpty ? (
        <EmptyState title="등록된 사업장이 없습니다." />
      ) : (
        <WorkplaceTableSection workplaces={workplaces} />
      )}
    </div>
  );
};
