import { useToast } from "@app/providers/toast";

import { mapStackMeasurementCreateFormToRequest } from "@/entities/stack/model";
import { useMeasurementCreateForm, useMeasurementActions } from "@stack/hooks";
import { usePollutants } from "@pollutant/hooks";

import { CYCLE_LABELS_OPTIONS } from "@/entities/stack/model";

import { usePreventSubmitOnEnter } from "@shared/hooks";
import { X, Trash2 } from "lucide-react";
import { SelectField, InputField, IconButton, Button, InlineAddButton } from "@shared/ui";

interface MeasurementCreateContentProps {
  stackId: number;
  onClose: () => void;
  onSuccess: () => void;
}

export const MeasurementCreateContent = ({
  stackId,
  onClose,
  onSuccess,
}: MeasurementCreateContentProps) => {
  const { form, addMeasurement, removeMeasurement, onChange } = useMeasurementCreateForm(stackId);
  const {
    creating,
    handleCreate,
  } = useMeasurementActions();
  const { showToast } = useToast();
  const { pollutants } = usePollutants();

  const preventSubmitOnEnter = usePreventSubmitOnEnter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = mapStackMeasurementCreateFormToRequest(form);
    const result = await handleCreate(payload);

    if (result?.success) {
      showToast('측정물질이 등록되었습니다.', 'success');
      onSuccess();
      onClose();
    } else {
      showToast(result?.message,'error');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-base md:text-2xl font-bold text-gray-800">측정물질 추가</h2>
          <IconButton
            icon={<X />}
            title="닫기"
            variant="ghost"
            size="md"
            onClick={onClose}
          />
        </div>

        <form onSubmit={handleSubmit} onKeyDown={preventSubmitOnEnter} className="space-y-4">
          {form.map((measurement, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-700">
                  측정물질 #{index + 1}
                </h3>
                {form.length > 1 && (
                  <IconButton
                    icon={<Trash2 />}
                    title="삭제"
                    variant="danger"
                    size="sm"
                    onClick={() => removeMeasurement(index)}
                  />
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 측정물질 선택 */}
                <SelectField
                  label="측정물질"
                  required
                  value={measurement.pollutantId}
                  placeholder="측정물질을 선택하세요"
                  options={pollutants}
                  disabled={creating}
                  getOptionLabel={(p) =>
                    `${p.nameKr}${p.nameEn ? ` (${p.nameEn})` : ""}`
                  }
                  getOptionValue={(p) => p.id}
                  onChange={(value) =>
                    onChange(index, "pollutantId", value)
                  }
                />

                {/* 측정 주기 */}
                <SelectField
                  label="측정주기"
                  required
                  value={measurement.cycle}
                  onChange={(value) => onChange(index, "cycle", value)}
                  placeholder="측정주기를 선택하세요"
                  disabled={creating}
                  options={CYCLE_LABELS_OPTIONS}
                  getOptionLabel={(c) => c.label}
                  getOptionValue={(c) => c.value}
                />

                {/* 허용기준 */}
                <InputField
                  label="허용기준"
                  type="number"
                  value={measurement.allowance}
                  step={0.1}
                  min={0}
                  onChange={(value) => onChange(index, "allowance", value)}
                />
              </div>
            </div>
          ))}

          <InlineAddButton
            label="측정물질 추가"
            onClick={addMeasurement}
            disabled={creating}
          />

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              label="취소"
              variant="secondary"
              width="full"
              onClick={onClose}
              disabled={creating}
            />
            <Button
              type="submit"
              label="등록"
              variant="primary"
              width="full"
              disabled={creating}
            />
          </div>
        </form>
      </div>
    </div>
  );
};