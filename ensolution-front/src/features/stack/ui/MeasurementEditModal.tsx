import { useState } from "react";
import { patchStackMeasurement } from "@stack/api/stackMeasurementApi";
import type { StackMeasurementResponse } from "@stack/model";
import type { Cycle } from "@/shared/model";
import { CYCLE_LABELS } from "@stack/model";

import { X } from "lucide-react";

import { IconButton, Button } from "@shared/ui/buttons";

interface MeasurementEditModalProps {
  measurement: StackMeasurementResponse;
  onClose: () => void;
  onSuccess: () => void;
}

export const MeasurementEditModal = ({
  measurement,
  onClose,
  onSuccess,
}: MeasurementEditModalProps) => {
  const [cycle, setCycle] = useState<Cycle>(measurement.cycle);
  const [allowance, setAllowance] = useState<string>(
    measurement.allowance != null ? String(measurement.allowance) : ""
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const requestData = {
        cycle,
        allowance: allowance === "" ? null : Number(allowance),
      };

      const response = await patchStackMeasurement(measurement.id, requestData);

      if (!response.status) {
        alert(response.message ?? "측정물질 수정 실패");
        setIsSubmitting(false);
        return;
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error("수정 중 오류:", error);
      alert("수정 중 오류가 발생했습니다.");
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
          <h2 className="text-2xl font-bold text-gray-800">측정물질 수정</h2>
          <IconButton 
            icon={<X/>}
            title="닫기"
            variant="ghost"
            onClick={onClose}
            size="md"
            className="text-gray-500 hover:text-gray-700 transition-colors"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 측정물질 (읽기 전용) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              측정물질
            </label>
            <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700">
              {measurement.pollutant.nameKr}
              {measurement.pollutant.nameEn && ` (${measurement.pollutant.nameEn})`}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              측정물질은 수정할 수 없습니다.
            </p>
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="허용기준을 입력하세요 (선택사항)"
              min="0"
              step="0.01"
              disabled={isSubmitting}
            />
          </div>

          {/* 버튼 */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              label="취소"
              onClick={onClose}
              variant="secondary"
              disabled={isSubmitting}
              width="full"
            />
            <Button
              type="submit"
              label="수정"
              variant="primary"
              disabled={isSubmitting}
              width="full"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
