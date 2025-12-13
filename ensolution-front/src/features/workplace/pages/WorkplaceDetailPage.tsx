import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useWorkplaceDetail, useWorkplaceActions } from '@workplace/hooks';
import { useSearch } from '@common/hooks';
import { DetailPageHeader, FullPageLoader, EmptyState } from '@common/components';
import { formatBizNumber, stripBizNumber } from '@common/utils/formatters';
import type { WorkplaceUpdateRequest } from '@workplace/model';
import {
  WorkplaceInfoCard,
  WorkplaceStackListCard,
  WorkplaceSidebar,
} from '@workplace/components';
import { StackAddModal } from '@stack/components';

export const WorkplaceDetailPage = () => {
  const { workplaceId } = useParams();
  const { workplace, fetchWorkplace, loading } = useWorkplaceDetail();
  const { handleUpdate, handleDelete, isUpdating, isDeleting } = useWorkplaceActions();
  const [isEditMode, setIsEditMode] = useState(false);
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

  const [showStackAddModal, setShowStackAddModal] = useState(false);

  useEffect(() => {
    if (workplaceId) {
      fetchWorkplace(Number(workplaceId));
    }
  }, [workplaceId, fetchWorkplace]);

  useEffect(() => {
    if (workplace) {
      setEditForm({
        name: workplace.workplace.name,
        address: workplace.workplace.address,
        bizNumber: formatBizNumber(workplace.workplace.bizNumber),
        businessCategory: workplace.workplace.businessCategory,
        grade: workplace.workplace.grade,
        remark: workplace.workplace.remark || '',
      });
    }
  }, [workplace]);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'bizNumber') {
      setEditForm(prev => ({ ...prev, bizNumber: formatBizNumber(value) }));
      return;
    }

    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    if (workplace) {
      setEditForm({
        name: workplace.workplace.name,
        address: workplace.workplace.address,
        bizNumber: formatBizNumber(workplace.workplace.bizNumber),
        businessCategory: workplace.workplace.businessCategory,
        grade: workplace.workplace.grade,
        remark: workplace.workplace.remark || '',
      });
    }
  };

  const handleSave = async () => {
    if (!workplaceId) return;

    const updateData: WorkplaceUpdateRequest = {
      ...editForm,
      bizNumber: stripBizNumber(editForm.bizNumber),
    };

    const result = await handleUpdate(Number(workplaceId), updateData);

    if (result.success) {
      setIsEditMode(false);
      fetchWorkplace(Number(workplaceId));
    } else {
      alert(result.message);
    }
  };

  const handleDeleteClick = async () => {
    if (!workplaceId) return;

    if (window.confirm('정말 삭제하시겠습니까?')) {
      const result = await handleDelete(Number(workplaceId));
      if (result.success) {
        window.location.href = '/workplace';
      } else {
        alert(result.message);
      }
    }
  };

  const handleAddStack = () => {
    setShowStackAddModal(true);
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
    return <EmptyState title="사업장 정보를 불러올 수 없습니다." />;
  }

  return (
    <>
      <DetailPageHeader
        title={workplace.workplace.name}
        isEditMode={isEditMode}
        isUpdating={isUpdating}
        isDeleting={isDeleting}
        onEdit={handleEdit}
        onCancel={handleCancel}
        onSave={handleSave}
        onDelete={handleDeleteClick}
        backUrl="/workplace"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onAddStack={handleAddStack}
          />
        </div>

        {/* Sidebar */}
        <WorkplaceSidebar
          stackCount={workplace.stacks.length}
          modifiedAt={workplace.workplace.modifiedAt}
        />
      </div>

      {/* Stack Add Modal */}
      {showStackAddModal && workplaceId && (
        <StackAddModal
          workplaceId={Number(workplaceId)}
          onClose={() => setShowStackAddModal(false)}
          onSuccess={handleStackAddSuccess}
        />
      )}
    </>
  );
};
