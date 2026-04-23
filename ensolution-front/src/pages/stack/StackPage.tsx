import { useStackListQuery } from '@/features/stack/hooks';

import { StackTable } from '@/features/stack/ui';

import { EmptyState, FullPageLoader, Breadcrumbs } from "@shared/ui";

export const StackPage = () => {
  const { stacks, error, loading, reload } = useStackListQuery();

  const isEmpty = !error && stacks.length === 0;

  if (loading) return <FullPageLoader />;

  const breadcrumbsContents = [
    {title: "대시보드", path: "/dashboard"},
    {title: "측정시설", path: "/stack"},
  ]

  return (
    <div className="px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
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
        <EmptyState title='등록된 측정시설이 없습니다.'/>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          <StackTable stacks={stacks}/>
        </div>
      )}
    </div>
  );
};