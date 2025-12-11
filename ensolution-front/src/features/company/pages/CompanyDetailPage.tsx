// 📌 React & Router
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// 📌 Hooks
import { useCompanyDetail, useCompanyActions } from '@company/hooks';
import { useWorkplaceActions } from '@workplace/hooks';

// 📌 Types
import type { CompanyUpdateRequest } from '@company/model';

// 📌 Utils
import { formatBizNumber } from '@/common/utils/formatters';

// 📌 Shared UI Components
import { DetailPageHeader, FullPageLoader, EmptyState } from '@/common/components';

// 📌 Company Domain Components
import { CompanySidebar, WorkplaceListCard, CompanyInfoCard } from '@company/components';

// 📌 Workplace Domain Components
import { AddWorkplaceModal } from '@workplace/components';

export const CompanyDetailPage = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const { company, fetchCompany, loading } = useCompanyDetail();
  const { isDeleting, handleDelete } = useCompanyActions();
  const { handleCreate } = useWorkplaceActions();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editForm, setEditForm] = useState<CompanyUpdateRequest>({
    name: '',
    address: '',
    ceoName: '',
    bizNumber: '',
    remark: '',
  });

  useEffect(() => {
    if (companyId) {
      fetchCompany(Number(companyId));
    }
  }, [companyId, fetchCompany]);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'bizNumber') {
      setEditForm(prev => ({ ...prev, bizNumber: formatBizNumber(value) }));
      return;
    }

    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleDeleteClick = async () => {
    if (!companyId) return;

    const result = await handleDelete(Number(companyId));

    if (result.success) {
      alert(result.message);
      navigate('/company');
    } else {
      alert(result.message);
    }
  };

  if (loading) {
    return <FullPageLoader message="업체 정보를 불러오는 중입니다..." />;
  }

  if (!company) {
    return (
      <EmptyState
        title="업체 정보를 찾을 수 없습니다."
        actionLabel="목록으로 돌아가기"
        onAction={() => navigate('/company')}
      />
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <DetailPageHeader
        title={company.company.name}
        isDeleting={isDeleting}
        onDelete={handleDeleteClick}
        backUrl="/client/company"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Company Profile Card */}
        <div className="lg:col-span-2 space-y-6">
          <CompanyInfoCard
            company={{
              ...company.company,
              createdAt: company.company.createdAt.toString()
            }}
            isEditMode={isDeleting}
            editForm={editForm}
            onChange={handleEditChange}
          />

          {/* Workplaces Section */}
          <WorkplaceListCard
            workplaces={company.workplaces}
            onAdd={() => setIsModalOpen(true)}
          />
        </div>

        {/* Sidebar */}
        <CompanySidebar
          workplaceNum={company.workplaces.length}
          modifiedAt={new Date(company.company.modifiedAt).toLocaleString('ko-KR')}
        />
      </div>

      {/* Add Workplace Modal */}
      <AddWorkplaceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        companyId={Number(companyId)}
        onSuccess={() => fetchCompany(Number(companyId))}
        onSubmit={handleCreate}
      />
    </div>
  );
};
