import { useState, useEffect } from "react";
import { registerStackMeasurement } from "@stack/api/stackMeasurementApi";
import { getPollutants } from "@pollutant/api/pollutantApi";
import type { PollutantResponse } from "@pollutant/model/pollutant.types";
import type { Cycle } from "@/common/model";
import { CYCLE_LABELS } from "@/common/constants/labels";

interface MeasurementAddModalProps {
  stackId: number;
  onClose: () => void;
  onSuccess: () => void;
}

export const MeasurementAddModal = ({
  stackId,
  onClose,
  onSuccess,
}: MeasurementAddModalProps) => {
  const [pollutants, setPollutants] = useState<PollutantResponse[]>([]);
  const [loadingPollutants, setLoadingPollutants] = useState(true);
  const [selectedPollutantId, setSelectedPollutantId] = useState<number | null>(null);
  const [cycle, setCycle] = useState<Cycle>("MONTHLY_1");
  const [allowance, setAllowance] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load pollutants on mount
  useEffect(() => {
    const fetchPollutants = async () => {
      try {
        const response = await getPollutants();
        if (response.status && response.data) {
          setPollutants(response.data);
        }
      } catch (error) {
        console.error("Failed to load pollutants:", error);
        alert("측정물질 목록을 불러오는데 실패했습니다.");
      } finally {
        setLoadingPollutants(false);
      }
    };

    fetchPollutants();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedPollutantId) {
      alert("측정물질을 선택해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      const requestData = {
        stackId,
        pollutantId: selectedPollutantId,
        cycle,
        allowance: allowance === "" ? null : Number(allowance),
      };

      const response = await registerStackMeasurement(requestData);

      if (!response.status) {
        alert(response.message ?? "측정물질 등록 실패");
        setIsSubmitting(false);
        return;
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error("등록 중 오류:", error);
      alert("등록 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const cycleOptions: Cycle[] = [
    "MONTHLY_1",
    "MONTHLY_2",
    "BIMONTHLY",
    "QUARTERLY",
    "SEMI_ANNUAL",
    "ANNUAL",
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 my-8 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">측정물질 추가</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            disabled={isSubmitting}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 측정물질 선택 */}
          <div>
            <label
              htmlFor="pollutant"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              측정물질 <span className="text-red-500">*</span>
            </label>
            {loadingPollutants ? (
              <div className="text-gray-500">측정물질 목록을 불러오는 중...</div>
            ) : (
              <select
                id="pollutant"
                value={selectedPollutantId ?? ""}
                onChange={(e) => setSelectedPollutantId(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-transparent"
                required
                disabled={isSubmitting}
              >
                <option value="">측정물질을 선택하세요</option>
                {pollutants.map((pollutant) => (
                  <option key={pollutant.id} value={pollutant.id}>
                    {pollutant.nameKr}
                    {pollutant.nameEn ? ` (${pollutant.nameEn})` : ""}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* 측정 주기 선택 */}
          <div>
            <label
              htmlFor="cycle"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              측정 주기 <span className="text-red-500">*</span>
            </label>
            <select
              id="cycle"
              value={cycle}
              onChange={(e) => setCycle(e.target.value as Cycle)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-transparent"
              required
              disabled={isSubmitting}
            >
              {cycleOptions.map((cycleOption) => (
                <option key={cycleOption} value={cycleOption}>
                  {CYCLE_LABELS[cycleOption]}
                </option>
              ))}
            </select>
          </div>

          {/* 허용기준 입력 */}
          <div>
            <label
              htmlFor="allowance"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              허용기준
            </label>
            <input
              type="number"
              id="allowance"
              value={allowance}
              onChange={(e) => setAllowance(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-transparent"
              placeholder="허용기준을 입력하세요 (선택사항)"
              min="0"
              step="0.01"
              disabled={isSubmitting}
            />
          </div>

          {/* 버튼 */}
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
              disabled={isSubmitting || loadingPollutants}
            >
              {isSubmitting ? "등록 중..." : "등록"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
