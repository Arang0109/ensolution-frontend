import { useState } from 'react';

import { useCompanies } from '@/features/company/hooks';
import { CompanyTable, CompanyCreateModal } from '@/features/company/ui';

import { Button, EmptyState, FullPageLoader, Breadcrumbs } from '@shared/ui';

export const CompanyPage = () => {
  const { companies, error, loading, reload } = useCompanies();
  const [showAddModal, setShowAddModal] = useState(false);

  const isEmpty = !error && companies.length === 0;
  
  if (loading) return <FullPageLoader />;

  const breadcrumbsContents = [
    {title: "대시보드", path: "/dashboard"},
    {title: "측정대행 의뢰업체", path: "/company"},
  ]

  return (
    <div className="px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-2">
        <Breadcrumbs
          contents={breadcrumbsContents}
        />

        <Button
          label="업체추가"
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
        <EmptyState
          title="등록된 업체가 없습니다."
        />
      ) : (
        <CompanyTable companies={companies} />
      )}

      {showAddModal && (
        <CompanyCreateModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => reload()}
        />
      )}
    </div>
  );
};