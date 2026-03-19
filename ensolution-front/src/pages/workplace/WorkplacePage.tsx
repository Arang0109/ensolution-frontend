import { useWorkplaces } from "@workplace/hooks";
import { WorkplaceTable } from "@workplace/ui";

import { EmptyState, FullPageLoader, Breadcrumbs } from "@shared/ui";

export const WorkplacePage = () => {
  const { workplaces, error, loading, reload } = useWorkplaces();

  const isEmpty = !error && workplaces.length === 0;
  
  if (loading) return <FullPageLoader />;

  const breadcrumbsContents = [
    {title: "대시보드", path: "/dashboard"},
    {title: "측정대상 사업장", path: "/workplace"},
  ]

  return (
    <div className="px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-2">
        <Breadcrumbs
          contents={breadcrumbsContents}
        />
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
        <WorkplaceTable workplaces={workplaces} />
      )}
    </div>
  );
};
