import { useState } from 'react';

import { useCompanies } from '@company/hooks';
import { CompanyCreateModal, CompanyListTable } from '@company/ui';

import { Button, EmptyState, FullPageLoader } from '@shared/ui';

export const CompanyListPage = () => {
  const { companies, loading, refetch } = useCompanies();
  const [showAddModal, setShowAddModal] = useState(false);
  
  if (loading) return <FullPageLoader />;

  return (
    <div className="px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">측정대행 의뢰업체</h1>
        <Button
          label="업체추가"
          onClick={() => setShowAddModal(true)}
          variant="primary"
          size="md"
          type="button"
        />
      </div>

      <hr className="border-gray-200 mb-6" />

      {/* Company List */}
      {companies.length === 0 ? (
        <EmptyState
          title='등록된 업체가 없습니다.'
        />
      ) : (
        <CompanyListTable companies={companies} />
      )}

      {/* Add Company Modal */}
      {showAddModal && (
        <CompanyCreateModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => refetch()}
        />
      )}
    </div>
  );
};
