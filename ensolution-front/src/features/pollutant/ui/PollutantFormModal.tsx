import { useState } from "react";

import type {
  PollutantResponse,
  PollutantRegisterRequest,
  PollutantUpdateRequest,
} from "@/features/pollutant/model/pollutant-types";

interface PollutantFormModalProps {
  pollutant?: PollutantResponse | null;
  isOpen: boolean;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (
    data: PollutantRegisterRequest | PollutantUpdateRequest
  ) => Promise<void>;
}

export const PollutantFormModal = ({
  pollutant,
  isOpen,
  isSubmitting,
  onClose,
  onSubmit,
}: PollutantFormModalProps) => {
  // 초기값을 함수로 추출하여 재사용
  const getInitialFormData = (): PollutantRegisterRequest | PollutantUpdateRequest => ({
    nameKr: pollutant?.nameKr ?? "",
    nameEn: pollutant?.nameEn ?? "",
    method: pollutant?.method ?? "",
    equipmentName: pollutant?.equipmentName ?? "",
    testMethodName: pollutant?.testMethodName ?? "",
    samplingTime: pollutant?.samplingTime ?? 0,
    samplingVolume: pollutant?.samplingVolume ?? "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const [formData, setFormData] = useState<
    PollutantRegisterRequest | PollutantUpdateRequest
  >(getInitialFormData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "samplingTime" ? Number(value) : value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {pollutant ? "측정물질 수정" : "측정물질 추가"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="nameKr"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                한글명 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="nameKr"
                name="nameKr"
                value={formData.nameKr}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="예: 먼지"
              />
            </div>

            <div>
              <label
                htmlFor="nameEn"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                영문명
              </label>
              <input
                type="text"
                id="nameEn"
                name="nameEn"
                value={formData.nameEn}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="예: Dust"
              />
            </div>

            <div>
              <label
                htmlFor="method"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                측정방법
              </label>
              <input
                type="text"
                id="method"
                name="method"
                value={formData.method}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="예: Dust"
              />
            </div>

            <div>
              <label
                htmlFor="equipmentName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                시험기기
              </label>
              <input
                type="text"
                id="equipmentName"
                name="equipmentName"
                value={formData.equipmentName}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="예: 30"
              />
            </div>

            <div>
              <label
                htmlFor="testMethodName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                공정시험법 코드
              </label>
              <input
                type="text"
                id="testMethodName"
                name="testMethodName"
                value={formData.testMethodName}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="예: 30"
              />
            </div>

            <div>
              <label
                htmlFor="samplingTime"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                채취시간 (분)
              </label>
              <input
                type="number"
                id="samplingTime"
                name="samplingTime"
                value={formData.samplingTime}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="예: 30"
              />
            </div>

            <div>
              <label
                htmlFor="samplingVolume"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                채취량
              </label>
              <input
                type="text"
                id="samplingVolume"
                name="samplingVolume"
                value={formData.samplingVolume}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="예: 1000L"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-neutral-800 to-neutral-900 text-white rounded-lg hover:from-neutral-900 hover:to-neutral-950 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? "처리 중..."
                  : pollutant
                  ? "수정"
                  : "추가"}
              </button>
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                취소
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
