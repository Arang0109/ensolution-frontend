import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import { useStackDetail, useStackActions } from '@stack/hooks';
import {
  PreventionAddModal,
  PreventionEditModal,
  StackInfoCard,
  StackPreventionListCard,
  StackSidebar,
} from '@stack/components';
import { DetailPageHeader, FullPageLoader, EmptyState } from '@/common/components';
import type { PreventionDetailResponse, StackUpdateRequest } from '@stack/model';

export const StackDetailPage = () => {
  const { stackId } = useParams();
  const navigate = useNavigate();
  const { stack, fetchStack, loading } = useStackDetail();
  const { handleUpdate, handleDelete, isUpdating, isDeleting } = useStackActions();
  const [isEditMode, setIsEditMode] = useState(false);

  // Get initial form data from stack
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
  const [selectedPrevention, setSelectedPrevention] = useState<PreventionDetailResponse | null>(null);

  useEffect(() => {
    if (stackId) {
      fetchStack(Number(stackId));
    }
  }, [stackId, fetchStack]);

  // Calculate counts using useMemo for performance
  const { preventionCount, facilityCount, targetCount } = useMemo(() => {
    if (!stack) {
      return { preventionCount: 0, facilityCount: 0, targetCount: 0 };
    }

    return {
      preventionCount: stack.preventions.length,
      facilityCount: stack.preventions.reduce((sum, p) => sum + p.facilities.length, 0),
      targetCount: stack.preventions.reduce((sum, p) => sum + p.targets.length, 0),
    };
  }, [stack]);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    // Refresh form data when entering edit mode
    setEditForm(getInitialEditForm());
    setIsEditMode(true);
  };

  const handleCancel = () => {
    // Reset form data when canceling
    setEditForm(getInitialEditForm());
    setIsEditMode(false);
  };

  const handleSave = async () => {
    if (!stackId) return;

    const result = await handleUpdate(Number(stackId), editForm);

    if (result.success) {
      setIsEditMode(false);
      fetchStack(Number(stackId));
    }
  };

  const handleDeleteClick = async () => {
    if (!stackId) return;

    if (window.confirm('정말 삭제하시겠습니까?')) {
      const result = await handleDelete(Number(stackId));
      if (result.success) {
        navigate('/stack');
      }
    }
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

  if (loading) {
    return <FullPageLoader />;
  }

  if (!stack) {
    return (
      <EmptyState
        title="측정시설 정보를 찾을 수 없습니다."
        actionLabel="목록으로 돌아가기"
        onAction={() => navigate('/stack')}
      />
    );
  }

  return (
    <>
      <DetailPageHeader
        title={stack.stack.name}
        isEditMode={isEditMode}
        isUpdating={isUpdating}
        isDeleting={isDeleting}
        onEdit={handleEdit}
        onCancel={handleCancel}
        onSave={handleSave}
        onDelete={handleDeleteClick}
        backUrl="/stack"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <StackInfoCard
            stack={stack.stack}
            isEditMode={isEditMode}
            editForm={editForm}
            onChange={handleEditChange}
          />

          <StackPreventionListCard
            preventions={stack.preventions}
            onAddPrevention={handleAddPrevention}
            onPreventionClick={handlePreventionClick}
          />
        </div>

        {/* Sidebar */}
        <StackSidebar
          preventionCount={preventionCount}
          facilityCount={facilityCount}
          targetCount={targetCount}
          modifiedAt={stack.stack.modifiedAt}
          workplaceId={stack.stack.workplaceId}
        />
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
    </>
  );
};
