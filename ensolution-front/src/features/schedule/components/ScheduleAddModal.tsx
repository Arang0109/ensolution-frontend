import { useScheduleForm } from "@schedule/hooks";
import { SearchableSelect } from "./SearchableSelect";

interface ScheduleAddModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const ScheduleAddModal = ({ onClose, onSuccess }: ScheduleAddModalProps) => {
  const {
    form,
    isSubmitting,
    onChange,
    onSubmit,
    filteredWorkplaces,
    filteredTeams,
    filteredStacks,
    selectedWorkplaceId,
    handleWorkplaceChange,
    loading,
    loadingStacks,
  } = useScheduleForm();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const result = await onSubmit(e);

    if (result?.success) {
      onSuccess();
      onClose();
    } else {
      alert(result?.message ?? "등록 실패");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">측정일정 등록</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            disabled={isSubmitting}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <SearchableSelect
            id="workplace"
            label="사업장"
            placeholder="사업장을 선택하세요"
            value={selectedWorkplaceId}
            options={filteredWorkplaces}
            getOptionLabel={(workplace) => workplace.name}
            getOptionValue={(workplace) => workplace.id}
            onChange={handleWorkplaceChange}
            disabled={isSubmitting || loading}
            loading={loading}
            emptyMessage="사업장이 없습니다"
            required
          />

          <SearchableSelect
            id="stackId"
            label="배출구"
            placeholder={
              !selectedWorkplaceId
                ? "먼저 사업장을 선택하세요"
                : "배출구를 선택하세요"
            }
            value={form.stackId}
            options={filteredStacks}
            getOptionLabel={(stack) => `${stack.name} (${stack.semsNumber})`}
            getOptionValue={(stack) => stack.id}
            onChange={(value) => onChange({ target: { name: "stackId", value: String(value) } } as any)}
            disabled={isSubmitting || !selectedWorkplaceId || loadingStacks}
            loading={loadingStacks}
            emptyMessage="배출구가 없습니다"
            required
          />

          <SearchableSelect
            id="teamId"
            label="측정팀"
            placeholder="측정팀을 선택하세요"
            value={form.teamId}
            options={filteredTeams}
            getOptionLabel={(team) => team.name}
            getOptionValue={(team) => team.id}
            onChange={(value) => onChange({ target: { name: "teamId", value: String(value) } } as any)}
            disabled={isSubmitting || loading}
            loading={loading}
            emptyMessage="측정팀이 없습니다"
            required
          />

          <div>
            <label htmlFor="measureDate" className="block text-sm font-medium text-gray-700 mb-1">
              측정일 <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="measureDate"
              name="measureDate"
              value={form.measureDate ? new Date(form.measureDate).toISOString().split('T')[0] : ""}
              onChange={onChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-transparent"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="measurementType" className="block text-sm font-medium text-gray-700 mb-1">
              측정 종류 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="measurementType"
              name="measurementType"
              value={form.measurementType}
              onChange={onChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-transparent"
              placeholder="측정 종류를 입력하세요 (예: 정기검사, 수시검사)"
              disabled={isSubmitting}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              disabled={isSubmitting}
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-brown-500 to-brown-600 text-white rounded-lg hover:from-brown-600 hover:to-brown-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? '등록 중...' : '등록'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
