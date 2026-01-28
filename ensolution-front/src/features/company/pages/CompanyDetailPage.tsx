// 📌 React & Router
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// 📌 Hooks
import { useCompanyDetail, useCompanyActions } from '@company/hooks';
import { useWorkplaceActions } from '@workplace/hooks';

// 📌 Types
import type { CompanyUpdateRequest } from '@company/model';

// 📌 Utils
import { formatBizNumber } from '@common/utils/formatters';

// 📌 Shared UI Components
import { useToast } from "@common/hooks"
import { DetailPageHeader, FullPageLoader, EmptyState } from '@common/components';

// 📌 Company Domain Components
import { WorkplaceListCard, CompanyInfoCard } from '@company/components';

// 📌 Workplace Domain Components
import { AddWorkplaceModal } from '@workplace/components';

export const CompanyDetailPage = () => {
  const navigate = useNavigate();
  const backUrl = () => {navigate('/company')};

  const { showToast } = useToast();

  const { companyId } = useParams();
  const [isEditMode, setIsEditMode] = useState(false);

  const { company, fetchCompany, loading } = useCompanyDetail();
  const { isDeleting, handleDelete, handleUpdate } = useCompanyActions();
  const { handleCreate } = useWorkplaceActions();

  const [showAddModal, setShowAddModal] = useState(false);
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

  const handleUpdateClick = async () => {
    if (!company) return;

    setEditForm({
      name: company.company.name,
      address: company.company.address,
      ceoName: company.company.ceoName,
      bizNumber: company.company.bizNumber,
      remark: company.company.remark ?? '',
    });

    setIsEditMode(true);
  }

  const handleDeleteClick = async () => {
    if (!companyId) return;

    const result = await handleDelete(Number(companyId));

    if (result.success) {
      showToast("삭제에 성공했습니다.", "success");
      backUrl();
    } else {
      showToast("삭제에 실패했습니다.", "error");
    }
  };

  const handleSaveEdit = async () => {
    if (!companyId) return;

    const result = await handleUpdate(Number(companyId), editForm);
    showToast(result.message);

    setIsEditMode(false);
    fetchCompany(Number(companyId));
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
  };

  if (loading) {
    return <FullPageLoader message="업체 정보를 불러오는 중입니다..." />;
  }

  if (!company) {
    return (
      <EmptyState
        title="업체 정보를 찾을 수 없습니다."
        actionLabel="목록으로 돌아가기"
        onAction={backUrl}
      />
    );
  }

  return (
    <div className="px-6 max-w-7xl mx-auto">
      {/* Header */}
      <DetailPageHeader
        title={company.company.name}
        isEditMode={isEditMode}
        isDeleting={isDeleting}
        onDelete={handleDeleteClick}
        onUpdate={handleUpdateClick}
        onSave={handleSaveEdit}
        onCancel={handleCancelEdit}
        backUrl={backUrl}
      />

      <div className="grid grid-cols-1 gap-6">
        {/* Company Profile Card */}
        <div className="lg:col-span-2 space-y-6">
          <CompanyInfoCard
            company={company.company}
            isEditMode={isEditMode}
            editForm={editForm}
            onChange={handleEditChange}
          />

          {/* Workplaces Section */}
          <WorkplaceListCard
            workplaces={company.workplaces}
            isEditMode={isEditMode}
            onClick={() => setShowAddModal(true)}
          />
        </div>
      </div>

      {/* Add Workplace Modal */}
      <AddWorkplaceModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        companyId={Number(companyId)}
        onSuccess={() => fetchCompany(Number(companyId))}
        onSubmit={handleCreate}
      />
    </div>
  );
};
