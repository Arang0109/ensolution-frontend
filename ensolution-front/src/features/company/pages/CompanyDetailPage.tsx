import { DetailPageHeader } from "@widgets/detail-page-header";

import { CompanyDetailCard, WorkplaceListCard } from "@company/ui";
import { useCompanyDetailPage } from "@company/hooks";
import { WorkplaceCreateModal } from "@workplace/ui";

import { FullPageLoader, EmptyState } from "@shared/ui";

export const CompanyDetailPage = () => {
  const {
    company,
    loading,
    isDeleting,
    isEditMode,
    showAddModal,

    editForm,

    backUrl,
    startEdit,
    cancelEdit,
    saveEdit,
    deleteCompany,
    handleEditChange,

    setShowAddModal,
    handleCreate,
    fetchCompany,
  } = useCompanyDetailPage();

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
      <DetailPageHeader
        title={company.company.name}
        isEditMode={isEditMode}
        isDeleting={isDeleting}
        onDelete={deleteCompany}
        onUpdate={startEdit}
        onSave={saveEdit}
        onCancel={cancelEdit}
        backUrl={backUrl}
      />

      <div className="grid grid-cols-1 gap-6">
        <CompanyDetailCard
          company={company.company}
          isEditMode={isEditMode}
          editForm={editForm}
          onChange={handleEditChange}
        />

        <WorkplaceListCard
          workplaces={company.workplaces}
          isEditMode={isEditMode}
          onClick={() => setShowAddModal(true)}
        />
      </div>

      <WorkplaceCreateModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        companyId={company.company.id}
        onSuccess={() => fetchCompany(company.company.id)}
        onSubmit={handleCreate}
      />
    </div>
  );
};