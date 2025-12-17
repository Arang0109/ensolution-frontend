import { SearchableSelect } from "@schedule/components/SearchableSelect";
import type { ScheduleRegisterRequest } from "@schedule/model";
import type { WorkplaceResponse } from "@workplace/model";

interface SampleInfoCardProps {
  form: ScheduleRegisterRequest;
  isSubmitting: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  filteredWorkplaces: WorkplaceResponse[];
  handleWorkplaceChange: (workplaceId: number) => void;
  loading: boolean;
}

export const SampleInfoCard = ({
  form,
  isSubmitting,
  onChange,
  filteredWorkplaces,
  handleWorkplaceChange,
  loading,
}: SampleInfoCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">시료채취정보</h2>
      <div className="space-y-4">
        {/* 측정분야 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            측정분야 <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="measurementField"
                value="대기"
                checked={form.measurementField === "대기"}
                onChange={onChange}
                disabled={isSubmitting}
                className="w-4 h-4 text-brown-600 border-gray-300 focus:ring-brown-500"
              />
              <span className="ml-2 text-gray-700">대기</span>
            </label>
          </div>
        </div>

        {/* 측정일 */}
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
            required
          />
        </div>

        {/* 측정용도 */}
        <div>
          <label htmlFor="measurementType" className="block text-sm font-medium text-gray-700 mb-1">
            측정용도 <span className="text-red-500">*</span>
          </label>
          <select
            id="measurementType"
            name="measurementType"
            value={form.measurementType}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-transparent"
            disabled={isSubmitting}
            required
          >
            <option value="자가측정용">자가측정용</option>
            <option value="환경영향평가">환경영향평가</option>
            <option value="인허가용">인허가용</option>
            <option value="참고용">참고용</option>
          </select>
        </div>

        {/* 측정대상 사업장 */}
        <SearchableSelect
          id="workplace"
          label="측정대상 사업장"
          placeholder="사업장을 선택하세요"
          value={form.workplaceId}
          options={filteredWorkplaces}
          getOptionLabel={(workplace) => workplace.name}
          getOptionValue={(workplace) => workplace.id}
          onChange={handleWorkplaceChange}
          disabled={isSubmitting || loading}
          loading={loading}
          emptyMessage="사업장이 없습니다"
          required
        />
      </div>
    </div>
  );
};
