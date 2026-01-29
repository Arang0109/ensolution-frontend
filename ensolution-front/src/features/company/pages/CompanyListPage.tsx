import { useState } from 'react';

import { Button } from '@/shared/ui';
import { useCompanies } from '@company/hooks/useCompanies';
import { CompanyAddModal } from '@/features/company/ui/CompanyAddModal';
import { CompanyCardItem } from '@company/ui';

export const CompanyListPage = () => {
  const { companies, loading, refetch } = useCompanies();
  const [showAddModal, setShowAddModal] = useState(false);
  
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
        <h1 className="text-2xl font-bold text-gray-800">측정대행 의뢰업체</h1>
        <Button
          label="업체추가"
          onClick={() => setShowAddModal(true)}
          variant="add"
          size="md"
          type="button"
        />
      </div>

      <hr className="border-gray-200 mb-6" />

      {/* Company List */}
      {companies.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">등록된 업체가 없습니다.</p>
          <p className="text-gray-400 text-sm mt-2">업체 추가 버튼을 눌러 새로운 업체를 등록하세요.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {companies.map((company) => (
            <CompanyCardItem key={company.id} company={company}/>
          ))}
        </div>
      )}

      {/* Add Company Modal */}
      {showAddModal && (
        <CompanyAddModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => refetch()}
        />
      )}
    </div>
  );
};
