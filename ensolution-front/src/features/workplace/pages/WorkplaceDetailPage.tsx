import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useWorkplaceDetail, useWorkplaceActions } from '@workplace/hooks';
import { useSearch } from '@shared/lib';
import { DetailPageHeader } from '@widgets/detail-page-header';
import { FullPageLoader, EmptyState } from '@shared/ui';
import { useToast } from "@app/providers/toast";
import { formatBizNumber, stripBizNumber } from '@/shared/lib/formatter/formatters';
import type { WorkplaceUpdateRequest } from '@workplace/model';
import {
  WorkplaceInfoCard,
  WorkplaceStackListCard
} from '@workplace/components';
import { StackAddModal } from '@stack/components';

export const WorkplaceDetailPage = () => {
  const navigate = useNavigate();
  const backUrl = () => {navigate('/client/workplace')}

  const { showToast } = useToast();

  const { workplaceId } = useParams();
  const [isEditMode, setIsEditMode] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const { workplace, fetchWorkplace, loading } = useWorkplaceDetail();
  const { handleUpdate, handleDelete, isDeleting } = useWorkplaceActions();

  const [editForm, setEditForm] = useState<WorkplaceUpdateRequest>({
    name: '',
    address: '',
    bizNumber: '',
    businessCategory: '',
    grade: 'TYPE_1',
    remark: '',
  });

  const { searchTerm, setSearchTerm, filtered: filteredStacks } = useSearch(
    workplace?.stacks || [],
    ['name', 'semsNumber']
  );

  useEffect(() => {
    if (workplaceId) {
      fetchWorkplace(Number(workplaceId));
    }
  }, [workplaceId, fetchWorkplace]);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'bizNumber') {
      setEditForm(prev => ({ ...prev, bizNumber: formatBizNumber(value) }));
      return;
    }

    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateClick = async () => {
    if (!workplace) return;

    setEditForm({
      name: workplace.workplace.name,
      address: workplace.workplace.address,
      bizNumber: formatBizNumber(workplace.workplace.bizNumber),
      businessCategory: workplace.workplace.businessCategory,
      grade: workplace.workplace.grade,
      remark: workplace.workplace.remark || '',
    });

    setIsEditMode(true);
  };

  const handleDeleteClick = async () => {
    if (!workplaceId) return;

    if (window.confirm('정말 삭제하시겠습니까?')) {
      const result = await handleDelete(Number(workplaceId));
      if (result.success) {
        backUrl();
      } else {
        showToast(result.message, "error");
      }
    }
  };

  const handleSaveEdit = async () => {
    if (!workplaceId) return;

    const updateData: WorkplaceUpdateRequest = {
      ...editForm,
      bizNumber: stripBizNumber(editForm.bizNumber),
    };

    const result = await handleUpdate(Number(workplaceId), updateData);
    showToast(result.message);

    setIsEditMode(false);
    fetchWorkplace(Number(workplaceId));
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
  };

  const handleStackAddSuccess = () => {
    if (workplaceId) {
      fetchWorkplace(Number(workplaceId));
    }
  };

  if (loading) {
    return <FullPageLoader />;
  }

  if (!workplace) {
    return (
      <EmptyState
        title="사업장 정보를 불러올 수 없습니다."
        actionLabel="목록으로 돌아가기"
        onAction={backUrl}
      />
    );
  }

  return (
    <div className="px-6 max-w-7xl mx-auto">
      <DetailPageHeader
        title={workplace.workplace.name}
        isEditMode={isEditMode}
        isDeleting={isDeleting}
        onDelete={handleDeleteClick}
        onUpdate={handleUpdateClick}
        onSave={handleSaveEdit}
        onCancel={handleCancelEdit}
        backUrl={backUrl}
      />

      <div className="grid grid-cols-1 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <WorkplaceInfoCard
            workplace={workplace.workplace}
            isEditMode={isEditMode}
            editForm={editForm}
            onChange={handleEditChange}
          />

          <WorkplaceStackListCard
            stacks={filteredStacks}
            isEditMode={isEditMode}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onClick={() => setShowAddModal(true)}
          />
        </div>
      </div>

      {/* Stack Add Modal */}
      {showAddModal && workplaceId && (
        <StackAddModal
          workplaceId={Number(workplaceId)}
          onClose={() => setShowAddModal(false)}
          onSuccess={handleStackAddSuccess}
        />
      )}
    </div>
  );
};
