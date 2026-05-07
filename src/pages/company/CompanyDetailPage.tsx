import { useState } from "react";

import { CompanyProfileForm } from "@/features/company/ui";
import { useCompanyDetailViewModel } from "@/features/company/hooks";
import { WorkplaceTable, WorkplaceCreateModal } from "@/features/workplace/ui";

import { FullPageLoader, EmptyState, Breadcrumbs, Button, Accordion } from "@shared/ui";

import { EditButtonGroup } from "@widgets/buttonGroup";

export const CompanyDetailPage = () => {
  const [openProfileSection, setOpenProfileSection] = useState(false);
  const [openWorkplaceListSection, setOpenWorkplaceListSection] = useState(false);

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

  const breadcrumbsContents = [
    {title: "대시보드", path: "/dashboard"},
    {title: "측정대행 의뢰업체", path: "/company"},
    {title: company.company.name, path: `/company/${company.company.id}`},
  ]

  return (
    <div className="px-6 max-w-7xl mx-auto">
      <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-2">
        <Breadcrumbs
          contents={breadcrumbsContents}
        />

        <EditButtonGroup
          isEditMode={isEditMode}
          isDeleting={deletingId === company.company.id}
          onSave={handleSave}
          onDelete={handleDelete}
          onUpdate={startEdit}
          onCancel={cancelEdit}
        />
      </div>
      
      <div className="grid grid-cols-1 gap-6 pt-4">
        <Accordion
          title="측정대행 의뢰기관 정보"
          open={openProfileSection}
          onToggle={() => setOpenProfileSection(!openProfileSection)}
        >
          <CompanyProfileForm
            company={company.company}
            isEditMode={isEditMode}
            editForm={editForm}
            onChange={handleChange}
            errors={errors}
          />
        </Accordion>

        <Accordion
          title="사업장 목록"
          open={openWorkplaceListSection}
          onToggle={() => setOpenWorkplaceListSection(!openWorkplaceListSection)}
        >
          {!isEditMode && (
          <div className="mb-3">
            <Button
            label="사업장추가"
            onClick={() => setShowAddModal(true)}
            variant="primary"
            size="md"
            type="button" />
          </div>
          )}
          {company.workplaces.length === 0 ? (
            <EmptyState title="등록된 사업장이 없습니다." />
          ) : (
            <WorkplaceTable workplaces={company.workplaces} />
          )}
        </Accordion>
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