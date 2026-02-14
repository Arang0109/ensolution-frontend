import { useState } from "react";
import { useToast } from "@app/providers/toast";

import { patchStackMeasurement, deleteStackMeasurement } from "@stack/api/stackMeasurementApi";
import type { StackMeasurementResponse } from "@stack/model";
import type { Cycle } from "@/shared/model";
import { CYCLE_LABELS } from "@stack/model";

import { X } from "lucide-react";

import { IconButton, Button, InputField, SelectField } from "@shared/ui";

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
  const { showToast } = useToast();

  const [cycle, setCycle] = useState<Cycle>(measurement.cycle);
  const [allowance, setAllowance] = useState<string>(
    measurement.allowance != null ? String(measurement.allowance) : ""
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDelete = async (stackMeasurementId: number) => {
    
    try {
      if (!window.confirm("삭제하시겠습니까?")) return;

      const res = await deleteStackMeasurement(stackMeasurementId);
      if (res.status) {
        showToast('측정물질이 삭제되었습니다.', 'success');
      } else {
        showToast(res.message || '측정물질 삭제에 실패했습니다.', 'error');
      }

      onSuccess();
      onClose();

      return { success: res.status, message: res.message };
    } catch {
      const errorMsg = '측정물질 삭제 중 오류가 발생했습니다.';
      showToast(errorMsg, 'error');
      return { success: false, message: errorMsg };
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!window.confirm("수정하시겠습니까?")) return;
    e.preventDefault();
    setIsSubmitting(true);

    try {      
      const requestData = {
        cycle,
        allowance: allowance === "" ? "" : allowance,
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
         <InputField<string>
            label="측정물질"
            value={`${measurement.pollutant.nameKr}${
              measurement.pollutant.nameEn ? ` (${measurement.pollutant.nameEn})` : ""
            }`}
            readOnly
            helperText="측정물질 이름은 수정할 수 없습니다."
          />

          {/* 측정 주기 */}
          <SelectField
            id={`cycle-${measurement.id}`}
            label="측정 주기"
            required
            value={measurement.cycle}
            placeholder="측정주기를 선택하세요"
            disabled={isSubmitting}
            options={cycleOptions}
            getOptionLabel={(c) => CYCLE_LABELS[c]}
            getOptionValue={(c) => c}
            onChange={(value) => setCycle(value)}
          />

          {/* 허용기준 입력 */}
          <InputField<string>
            label="허용기준"
            type="number"
            value={allowance}
            step={0.1}
            min={0}
            onChange={(value) => setAllowance(value)}
            disabled={isSubmitting}
          />

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
              type="button"
              label="삭제"
              onClick={() => handleDelete(measurement.id)}
              variant="danger"
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
