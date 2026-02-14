import { DetailPageHeader } from "@widgets/detail-page-header";

import { CompanyProfileSection, CompanyWorkplaceTableSection } from "@company/component";
import { useCompanyDetailViewModel } from "@company/hooks";
import { WorkplaceCreateModal } from "@workplace/component";

import { FullPageLoader, EmptyState } from "@shared/ui";

export const CompanyDetailPage = () => {
  const {
    company,
    loading,
    deletingId,
    isEditMode,
    showAddModal,
    errors,

    editForm,

    goBack,
    startEdit,
    cancelEdit,
    handleSave,
    handleDelete,
    handleChange,

    setShowAddModal,
    refreshCompany,
  } = useCompanyDetailViewModel();

  if (loading) {
    return <FullPageLoader message="업체 정보를 불러오는 중입니다..." />;
  }

  if (!company) {
    return (
      <EmptyState
        title="업체 정보를 찾을 수 없습니다."
        actionLabel="목록으로 돌아가기"
        onAction={goBack}
      />
    );
  }

  return (
    <div className="px-6 max-w-7xl mx-auto">
      <DetailPageHeader
        title={company.company.name}
        isEditMode={isEditMode}
        isDeleting={deletingId === company.company.id}
        onSave={handleSave}
        onDelete={handleDelete}
        onUpdate={startEdit}
        onCancel={cancelEdit}
        backUrl={goBack}
      />

      <div className="grid grid-cols-1 gap-6">
        <CompanyProfileSection
          company={company.company}
          isEditMode={isEditMode}
          editForm={editForm}
          onChange={handleChange}
          errors={errors}
        />

        <CompanyWorkplaceTableSection
          workplaces={company.workplaces}
          isEditMode={isEditMode}
          onClick={() => setShowAddModal(true)}
        />
      </div>

      {showAddModal && (
        <WorkplaceCreateModal
          companyId={company.company.id}
          onClose={() => setShowAddModal(false)}
          onSuccess={() => refreshCompany(company.company.id)}
        />
      )}
    </div>
  );
};