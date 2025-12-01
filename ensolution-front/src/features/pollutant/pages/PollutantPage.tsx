import { useState } from "react";
import { usePollutants, usePollutantActions } from "@pollutant/hooks";
import { PollutantTable, PollutantFormModal } from "@pollutant/components";
import { FullPageLoader } from "@/common/components";
import type { PollutantResponse } from "@pollutant/model/pollutant.types";

export const PollutantPage = () => {
  const { pollutants, loading, refetch } = usePollutants();
  const { handleCreate, handleUpdate, handleDelete, isSubmitting, isDeleting } =
    usePollutantActions(refetch);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPollutant, setEditingPollutant] =
    useState<PollutantResponse | null>(null);

  const handleAddClick = () => {
    setEditingPollutant(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (pollutant: PollutantResponse) => {
    setEditingPollutant(pollutant);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (pollutant: PollutantResponse) => {
    const success = await handleDelete(pollutant.id);
    if (success) {
      alert("측정물질이 삭제되었습니다.");
    } else {
      alert("측정물질 삭제에 실패했습니다.");
    }
  };

  const handleModalSubmit = async (data: any) => {
    let success = false;

    if (editingPollutant) {
      success = await handleUpdate(editingPollutant.id, data);
    } else {
      success = await handleCreate(data);
    }

    if (success) {
      setIsModalOpen(false);
      setEditingPollutant(null);
      alert(
        editingPollutant
          ? "측정물질이 수정되었습니다."
          : "측정물질이 추가되었습니다."
      );
    } else {
      alert(
        editingPollutant
          ? "측정물질 수정에 실패했습니다."
          : "측정물질 추가에 실패했습니다."
      );
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingPollutant(null);
  };

  if (loading) return <FullPageLoader />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">측정물질 관리</h1>
        <button
          onClick={handleAddClick}
          className="px-6 py-2.5 bg-gradient-to-r from-brown-500 to-brown-600 text-white rounded-lg hover:from-brown-600 hover:to-brown-700 transition-colors shadow-md"
        >
          + 측정물질 추가
        </button>
      </div>

      <PollutantTable
        pollutants={pollutants}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
        isDeleting={isDeleting}
      />

      <PollutantFormModal
        pollutant={editingPollutant}
        isOpen={isModalOpen}
        isSubmitting={isSubmitting}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};
