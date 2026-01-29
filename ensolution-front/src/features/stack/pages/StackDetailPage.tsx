import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useToast } from "@app/providers/toast";
import { useStackDetail, useStackActions } from '@stack/hooks';
import {
  PreventionAddModal,
  PreventionEditModal,
  MeasurementAddModal,
  StackPreventionListCard,
  StackMeasurementListCard,
  StackSidebar,
} from '@stack/components';

import { DetailPageHeader } from '@widgets/detail-page-header';
import { FullPageLoader, EmptyState } from '@shared/ui';
import type { PreventionDetailResponse, StackUpdateRequest } from '@stack/model';

export const StackDetailPage = () => {
  const navigate = useNavigate();
  const backUrl = () => {navigate('/client/stack')}

  const { showToast } = useToast();
  
  const { stackId } = useParams();
  const [isEditMode, setIsEditMode] = useState(false);

  const { stack, fetchStack, loading } = useStackDetail();
  const { handleUpdate, handleDelete, isDeleting } = useStackActions();

  const getInitialEditForm = (): StackUpdateRequest => {
    if (!stack) {
      return {
        name: '',
        semsNumber: '',
        grade: 'TYPE_1',
        height: '',
        horizontalLength: '',
        verticalLength: '',
        shape: 'CIRCULAR',
        orientation: 'VERTICAL',
        remark: '',
      };
    }

    return {
      name: stack.stack.name || '',
      semsNumber: stack.stack.semsNumber || '',
      grade: stack.stack.grade || 'TYPE_1',
      height: stack.stack.height || '',
      horizontalLength: stack.stack.horizontalLength || '',
      verticalLength: stack.stack.verticalLength || '',
      shape: stack.stack.shape || 'CIRCULAR',
      orientation: stack.stack.orientation || 'VERTICAL',
      remark: stack.stack.remark || '',
    };
  };

  const [editForm, setEditForm] = useState<StackUpdateRequest>(getInitialEditForm());

  const [showPreventionAddModal, setShowPreventionAddModal] = useState(false);
  const [showMeasurementAddModal, setShowMeasurementAddModal] = useState(false);
  const [selectedPrevention, setSelectedPrevention] = useState<PreventionDetailResponse | null>(null);

  useEffect(() => {
    if (stackId) {
      fetchStack(Number(stackId));
    }
  }, [stackId, fetchStack]);

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

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateClick = () => {
    // Refresh form data when entering edit mode
    setEditForm(getInitialEditForm());
    setIsEditMode(true);
  };

  const handleDeleteClick = async () => {
    if (!stackId) return;

    if (window.confirm('정말 삭제하시겠습니까?')) {
      const result = await handleDelete(Number(stackId));
      if (result.success) {
        backUrl();
      } else {
        showToast(result.message, "error");
      }
    }
  };

  const handleSaveEdit = async () => {
    if (!stackId) return;

    const result = await handleUpdate(Number(stackId), editForm);
    showToast(result.message);

    setIsEditMode(false);
    fetchStack(Number(stackId));
  };

  const handleCancelEdit = () => {
    // Reset form data when canceling
    setEditForm(getInitialEditForm());
    setIsEditMode(false);
  };

  const handleAddPrevention = () => {
    setShowPreventionAddModal(true);
  };

  const handlePreventionAddSuccess = () => {
    if (stackId) {
      fetchStack(Number(stackId));
    }
  };

  const handlePreventionClick = (preventionDetail: PreventionDetailResponse) => {
    setSelectedPrevention(preventionDetail);
  };

  const handlePreventionEditClose = () => {
    setSelectedPrevention(null);
  };

  const handlePreventionEditSuccess = () => {
    if (stackId) {
      fetchStack(Number(stackId));
    }
    setSelectedPrevention(null);
  };

  const handleAddMeasurement = () => {
    setShowMeasurementAddModal(true);
  };

  const handleMeasurementAddSuccess = () => {
    if (stackId) {
      fetchStack(Number(stackId));
    }
  };

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
            onEditSuccess={() => fetchStack(Number(stackId))}
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
      {showPreventionAddModal && stackId && (
        <PreventionAddModal
          stackId={Number(stackId)}
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
      {showMeasurementAddModal && stackId && (
        <MeasurementAddModal
          stackId={Number(stackId)}
          onClose={() => setShowMeasurementAddModal(false)}
          onSuccess={handleMeasurementAddSuccess}
        />
      )}
    </div>
  );
};
