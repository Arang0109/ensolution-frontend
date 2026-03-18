import { useState } from 'react';

import {
  PreventionCreateModal,
  PreventionEditModal,
  MeasurementCreateModal,
} from '@stack/component';

import { StackProfileForm, StackMeasurementCard, StackPreventionCard } from '@stack/ui';

import { useStackDetailViewModel, useStackDetailHandlers } from '@stack/hooks';

import { EditButtonGroup } from "@widgets/buttonGroup";

import { FullPageLoader, EmptyState, Breadcrumbs, Accordion } from '@shared/ui';

export const StackDetailPage = () => {
  const [openProfileSection, setOpenProfileSection] = useState(false);
  const [openStackMeasurementSection, setOpenStackMeasurementSection] = useState(false);
  const [openPreventionSection, setOpenPreventionSection] = useState(false);

  const {
    stack,
    loading,
    deletingId,

    editForm,
    errors,
    isEditMode,

    startEdit,
    cancelEdit,
    updateField,

    goBack,
    handleSave,
    handleDelete,

    refreshStack,
  } = useStackDetailViewModel();

  const {
    selectedPrevention,
    showPreventionAddModal,
    showMeasurementAddModal,

    openPrevention,
    closePrevention,
    closeMeasurementCreateModal,

    onPreventionEditSuccess,
    onMeasurementAddSuccess,
    onPreventionAddSuccess,
    onAddMeasurement,
    onAddPrevention,
  } = useStackDetailHandlers({
    stackId: stack?.stack.id ?? 1,
    refresh: refreshStack,
  });


  if (loading) {
    return <FullPageLoader />;
  }

  if (!stack) {
    return (
      <EmptyState
        title="측정시설 정보를 찾을 수 없습니다."
        actionLabel="목록으로 돌아가기"
        onAction={goBack}
      />
    );
  }

  const breadcrumbsContents = [
    {title: "측정시설", path: "/stack"},
    {title: "사업장으로", path: `/workplace/${stack.stack.workplaceId}`},
    {title: stack.stack.name, path: `/stack/${stack.stack.id}`},
  ]

  return (
    <div className="px-6 max-w-7xl mx-auto">
      <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-2">
        <Breadcrumbs
          contents={breadcrumbsContents}
        />

        <EditButtonGroup
          isEditMode={isEditMode}
          isDeleting={deletingId === stack.stack.id}
          onSave={handleSave}
          onDelete={handleDelete}
          onUpdate={startEdit}
          onCancel={cancelEdit}
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Accordion
          title='측정시설 정보'
          open={openProfileSection}
          onToggle={() => {setOpenProfileSection(!openProfileSection)}}
        >
          <StackProfileForm
            stack={stack.stack}
            isEditMode={isEditMode}
            editForm={editForm}
            onChange={updateField}
            errors={errors}
          />
        </Accordion>
        
        <Accordion
          title='측정항목 정보'
          open={openStackMeasurementSection}
          onToggle={() => {setOpenStackMeasurementSection(!openStackMeasurementSection)}}
        >
          <StackMeasurementCard
            measurements={stack.stackMeasurements}
            onAddMeasurement={onAddMeasurement}
            onEditSuccess={() => refreshStack(stack.stack.id)}
          />
        </Accordion>

        <Accordion
          title='방지시설 정보'
          open={openPreventionSection}
          onToggle={() => {setOpenPreventionSection(!openPreventionSection)}}
        >
          <StackPreventionCard
            preventions={stack.preventions}
            onAddPrevention={onAddPrevention}
            onPreventionClick={openPrevention}
          />
        </Accordion>
      </div>

      {/* Prevention Add Modal */}
      {showPreventionAddModal && stack?.stack.id && (
        <PreventionCreateModal
          stackId={Number(stack?.stack.id)}
          onClose={closePrevention}
          onSuccess={onPreventionAddSuccess}
        />
      )}

      {/* Prevention Edit Modal */}
      {selectedPrevention && (
        <PreventionEditModal
          preventionDetail={selectedPrevention}
          onClose={closePrevention}
          onSuccess={onPreventionEditSuccess}
        />
      )}

      {/* Measurement Add Modal */}
      {showMeasurementAddModal && stack?.stack.id && (
        <MeasurementCreateModal
          stackId={Number(stack?.stack.id)}
          onClose={closeMeasurementCreateModal}
          onSuccess={onMeasurementAddSuccess}
        />
      )}
    </div>
  );
};