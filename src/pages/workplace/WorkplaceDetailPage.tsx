import { useState } from 'react';

import { WorkplaceProfileForm } from '@/features/workplace/ui';
import { useWorkplaceDetailViewModel } from '@/features/workplace/hooks';

import { StackCreateModal } from '@/features/stack/component';
import { StackTable } from '@/features/stack/ui';

import { EditButtonGroup } from "@widgets/buttonGroup";
import { FullPageLoader, EmptyState, Breadcrumbs, Accordion, Button } from "@shared/ui";

export const WorkplaceDetailPage = () => {
  const [openProfileSection, setOpenProfileSection] = useState(false);
  const [openStackListSection, setOpenStackListSection] = useState(false);

  const {
    workplace,
    loading,
    deletingId,

    showAddModal,
    setShowAddModal,

    editForm,
    errors,
    isEditMode,

    startEdit,
    cancelEdit,
    handleChange,

    goBack,
    handleSave,
    handleDelete,

    refreshWorkplace,

    filtered: filteredStacks
  } = useWorkplaceDetailViewModel();
  

  if (loading) {
    return <FullPageLoader />;
  }

  if (!workplace) {
    return (
      <EmptyState
        title="사업장 정보를 불러올 수 없습니다."
        actionLabel="목록으로 돌아가기"
        onAction={goBack}
      />
    );
  }

  const breadcrumbsContents = [
    {title: "대시보드", path: "/dashboard"},
    {title: "측정대상 사업장", path: "/workplace"},
    {title: workplace.workplace.name, path: `/workplace/${workplace.workplace.id}`},
  ]

  return (
    <div className="px-6 max-w-7xl mx-auto">
      <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-2">
        <Breadcrumbs
          contents={breadcrumbsContents}
        />

        <EditButtonGroup
          isEditMode={isEditMode}
          isDeleting={deletingId === workplace.workplace.id}
          onSave={handleSave}
          onDelete={handleDelete}
          onUpdate={startEdit}
          onCancel={cancelEdit}
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Accordion
            title='측정대상 사업장 정보'
            open={openProfileSection}
            onToggle={() => {setOpenProfileSection(!openProfileSection)}}
          >
            <WorkplaceProfileForm
              workplace={workplace.workplace}
              isEditMode={isEditMode}
              editForm={editForm}
              onChange={handleChange}
              errors={errors}
            />
          </Accordion>

          <Accordion
            title='측정시설 정보'
            open={openStackListSection}
            onToggle={() => {setOpenStackListSection(!openStackListSection)}}
          >
            {!isEditMode && (
            <div className="mb-3">
              <Button
              label="측정시설추가"
              onClick={() => setShowAddModal(true)}
              variant="primary"
              size="md"
              type="button"/>
            </div>
            )}
            {filteredStacks.length === 0 ? (
              <EmptyState title='등록된 측정시설이 없습니다.' />
            ) : (
              <StackTable stacks={filteredStacks} />
            )}
          </Accordion>
        </div>
      </div>

      {/* Stack Add Modal */}
      {showAddModal && (
        <StackCreateModal
          workplaceId={(workplace.workplace.id)}
          onClose={() => setShowAddModal(false)}
          onSuccess={() => refreshWorkplace(workplace.workplace.id)}
        />
      )}
    </div>
  );
};