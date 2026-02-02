import { DetailPageHeader } from '@widgets/detail-page-header';
import { FullPageLoader, EmptyState } from '@shared/ui';
import {
  WorkplaceDetailCard,
  StackListCard
} from '@workplace/ui';
import { StackCreateModal } from '@stack/ui';

import { useWorkplaceDetailPage } from '@workplace/hooks';

export const WorkplaceDetailPage = () => {
  const {
    workplace,
    showAddModal,
    setShowAddModal,

    handleEditChange,
    handleUpdateClick,
    handleDeleteClick,
    handleSaveEdit,
    handleCancelEdit,
    handleStackAddSuccess,

    isEditMode,
    isDeleting,
    
    filtered: filteredStacks,

    loading,
    editForm,
    backUrl,
  } = useWorkplaceDetailPage();
  

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
          <WorkplaceDetailCard
            workplace={workplace.workplace}
            isEditMode={isEditMode}
            editForm={editForm}
            onChange={handleEditChange}
          />

          <StackListCard
            stacks={filteredStacks}
            isEditMode={isEditMode}
            onClick={() => setShowAddModal(true)}
          />
        </div>
      </div>

      {/* Stack Add Modal */}
      {showAddModal && (
        <StackCreateModal
          workplaceId={(workplace.workplace.id)}
          onClose={() => setShowAddModal(false)}
          onSuccess={handleStackAddSuccess}
        />
      )}
    </div>
  );
};
