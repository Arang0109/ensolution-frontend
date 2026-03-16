import { useStackListQuery } from '@stack/hooks';

import { StackTableSection } from '@stack/component';

import { EmptyState, FullPageLoader } from "@shared/ui";

export const StackListPage = () => {
  const { stacks, error, loading, reload } = useStackListQuery();

  const isEmpty = !error && stacks.length === 0;

  if (loading) return <FullPageLoader />;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">측정시설</h1>
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
          <StackTableSection stacks={stacks}/>
        </div>
      )}
    </div>
  );
};