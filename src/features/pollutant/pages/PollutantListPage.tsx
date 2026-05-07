import { useState } from 'react';
import { Button, FullPageLoader, EmptyState } from "@shared/ui";

import { usePollutants } from "@/features/pollutant/hooks";
import { PollutantTableSection, PollutantCreateModal } from "@/features/pollutant/component";

export const PollutantListPage = () => {
  const { pollutants, error, loading, reload } = usePollutants();
  const [showAddModal, setShowAddModal] = useState(false);

  const isEmpty = !error && pollutants.length === 0;

  if (loading) return <FullPageLoader />;

  return (
    <div className="px-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">측정물질 관리</h1>
         <Button
          label="측정물질 추가"
          onClick={() => setShowAddModal(true)}
          variant="primary"
          size="md"
          type="button"
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
          <EmptyState title='등록된 측정물질이 없습니다.' />
        ) : (
          <PollutantTableSection pollutants={pollutants}/> 
        )}

        {showAddModal && (
          <PollutantCreateModal
            onClose={() => setShowAddModal(false)}
            onSuccess={() => reload()}
          />
        )}
    </div>
  );
};
