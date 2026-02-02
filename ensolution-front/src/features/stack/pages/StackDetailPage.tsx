import { useState, useMemo } from 'react';

import {
  PreventionAddModal,
  PreventionEditModal,
  MeasurementAddModal,
  StackPreventionListCard,
  StackMeasurementListCard,
  StackSidebar,
} from '@stack/ui';

import { useStackDetailPage } from '@stack/hooks';

import { DetailPageHeader } from '@widgets/detail-page-header';
import { FullPageLoader, EmptyState } from '@shared/ui';
import type { PreventionDetailResponse } from '@stack/model';

export const StackDetailPage = () => {
  const {
    stack,
    fetchStack,

    handleEditChange,
    handleUpdateClick,
    handleDeleteClick,
    handleSaveEdit,
    handleCancelEdit,

    isEditMode,
    isDeleting,

    loading,
    editForm,
    backUrl,
  } = useStackDetailPage();

  const [showPreventionAddModal, setShowPreventionAddModal] = useState(false);
  const [showMeasurementAddModal, setShowMeasurementAddModal] = useState(false);
  const [selectedPrevention, setSelectedPrevention] = useState<PreventionDetailResponse | null>(null);

  const { preventionCount, facilityCount, targetCount, measurementCount } = useMemo(() => {
    if (!stack) {
      return { preventionCount: 0, facilityCount: 0, targetCount: 0, measurementCount: 0 };
    }

    return {
      preventionCount: stack.preventions.length,
      facilityCount: stack.preventions.reduce((sum, p) => sum + p.facilities.length, 0),
      targetCount: stack.preventions.reduce((sum, p) => sum + p.targets.length, 0),
      measurementCount: stack.stackMeasurements.length,
    };
  }, [stack]);

  const handlePreventionClick = (preventionDetail: PreventionDetailResponse) => {
    setSelectedPrevention(preventionDetail);
  };

  const handlePreventionEditClose = () => {
    setSelectedPrevention(null);
  };

  const handlePreventionEditSuccess = () => {
    if (stack?.stack.id) {
      fetchStack(Number(stack?.stack.id));
    }
    setSelectedPrevention(null);
  };

  const handleAddMeasurement = () => {
    setShowMeasurementAddModal(true);
  };

  const handleAddPrevention = () => {
    setShowPreventionAddModal(true);
  }

  const handleMeasurementAddSuccess = () => {
    if (stack?.stack.id) {
      fetchStack(Number(stack?.stack.id));
    }
  };

  const handlePreventionAddSuccess = () => {
    if (stack?.stack.id) {
      fetchStack(Number(stack?.stack.id));
    }
  }

  if (loading) {
    return <FullPageLoader />;
  }

  if (!stack) {
    return (
      <EmptyState
        title="측정시설 정보를 찾을 수 없습니다."
        actionLabel="목록으로 돌아가기"
        onAction={backUrl}
      />
    );
  }

  return (
    <div className="px-6 max-w-7xl mx-auto">
      <DetailPageHeader
        title={stack.stack.name}
        isEditMode={isEditMode}
        isDeleting={isDeleting}
        onDelete={handleDeleteClick}
        onUpdate={handleUpdateClick}
        onCancel={handleCancelEdit}
        onSave={handleSaveEdit}
        backUrl={backUrl}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content - Measurements Prominent */}
        <div className="lg:col-span-3 space-y-6">
          <StackMeasurementListCard
            measurements={stack.stackMeasurements}
            onAddMeasurement={handleAddMeasurement}
            onEditSuccess={() => fetchStack(Number(stack?.stack.id))}
          />

          <StackPreventionListCard
            preventions={stack.preventions}
            onAddPrevention={handleAddPrevention}
            onPreventionClick={handlePreventionClick}
          />
        </div>

        {/* Sidebar - Stack Info + Stats */}
        <div className="lg:col-span-1">
          <StackSidebar
            stack={stack.stack}
            preventionCount={preventionCount}
            facilityCount={facilityCount}
            targetCount={targetCount}
            measurementCount={measurementCount}
            isEditMode={isEditMode}
            editForm={editForm}
            onChange={handleEditChange}
          />
        </div>
      </div>

      {/* Prevention Add Modal */}
      {showPreventionAddModal && stack?.stack.id && (
        <PreventionAddModal
          stackId={Number(stack?.stack.id)}
          onClose={() => setShowPreventionAddModal(false)}
          onSuccess={handlePreventionAddSuccess}
        />
      )}

      {/* Prevention Edit Modal */}
      {selectedPrevention && (
        <PreventionEditModal
          preventionDetail={selectedPrevention}
          onClose={handlePreventionEditClose}
          onSuccess={handlePreventionEditSuccess}
        />
      )}

      {/* Measurement Add Modal */}
      {showMeasurementAddModal && stack?.stack.id && (
        <MeasurementAddModal
          stackId={Number(stack?.stack.id)}
          onClose={() => setShowMeasurementAddModal(false)}
          onSuccess={handleMeasurementAddSuccess}
        />
      )}
    </div>
  );
};
