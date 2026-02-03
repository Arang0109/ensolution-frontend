import { useState } from "react";

import { Button, FullPageLoader, EmptyState } from "@shared/ui";

import { usePollutants } from "@pollutant/hooks";
import { PollutantTable, PollutantCreateModal } from "@/features/pollutant/ui";

export const PollutantPage = () => {
  const { pollutants, loading, refetch } = usePollutants();
  const [showAddModal, setShowAddModal] = useState(false);

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

      {pollutants.length === 0 ? (
        <EmptyState
          title='등록된 측정물질이 없습니다.'
        />
      ) : (
        <PollutantTable
        pollutants={pollutants}
      />
      )}

      {showAddModal && (
        <PollutantCreateModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => refetch()}
        /> 
      )}
      
    </div>
  );
};
