import { useToast } from "@app/providers/toast";

import { useMeasurementActions, useMeasurementEditForm } from "@stack/hooks";
import type { StackMeasurementResponse } from "@stack/model";
import { CYCLE_LABELS_OPTIONS, mapStackMeasurementUpdateFormToRequest } from "@stack/model";

import { IconButton, Button, InputField, SelectField } from "@shared/ui";
import { X } from "lucide-react";

interface MeasurementEditContentProps {
  measurement: StackMeasurementResponse;
  onClose: () => void;
  onSuccess: () => void;
}

export const MeasurementEditContent = ({
  measurement,
  onClose,
  onSuccess,
}: MeasurementEditContentProps) => {

  const {
    editForm,
    handleChange,
  } = useMeasurementEditForm(measurement);

  const {
    updatingId,
    deletingId,
    handleDelete,
    handleUpdate,
  } = useMeasurementActions();

  const { showToast } = useToast();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const payload =
      mapStackMeasurementUpdateFormToRequest(editForm);

    const result = await handleUpdate(
      measurement.id,
      payload
    );

    if (result?.success) {
      showToast('측정물질이 수정되었습니다.', 'success');
      onSuccess();
      onClose();
    } else {
      showToast(result?.message, 'error');
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          측정물질 수정
        </h2>
        <IconButton
          icon={<X />}
          title="닫기"
          variant="ghost"
          onClick={onClose}
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* 측정물질 (읽기 전용) */}
        <InputField<string>
          label="측정물질"
          value={`${measurement.pollutant.nameKr}${
            measurement.pollutant.nameEn
              ? ` (${measurement.pollutant.nameEn})`
              : ""
          }`}
          readOnly
          helperText="측정물질 이름은 수정할 수 없습니다."
        />

        {/* 측정 주기 */}
        <SelectField
          label="측정 주기"
          required
          value={editForm.cycle}   // ✅ editForm 사용
          placeholder="측정주기를 선택하세요"
          disabled={updatingId === measurement.id}
          options={CYCLE_LABELS_OPTIONS}
          getOptionLabel={(c) => c.label}
          getOptionValue={(c) => c.value}
          onChange={(value) =>
            handleChange("cycle", value)
          }
        />

        {/* 허용기준 */}
        <InputField<string>
          label="허용기준"
          type="number"
          value={editForm.allowance}  // ✅ editForm 사용
          step={0.1}
          min={0}
          onChange={(value) =>
            handleChange("allowance", value)
          }
          disabled={updatingId === measurement.id}
        />

        {/* 버튼 */}
        <div className="flex gap-3 pt-4">

          <Button
            type="button"
            label="삭제"
            onClick={async () => {
              if (!confirm('삭제 시 복구할 수 없습니다. 계속하시겠습니까?')) {
                return;
              }

              const result =
                await handleDelete(measurement.id);

              if (result?.success) {
                showToast('측정물질이 삭제되었습니다.', 'success');
                onSuccess();
                onClose();
              } else {
                showToast(result?.message, 'error');
              }
            }}
            variant="danger"
            disabled={deletingId === measurement.id}
            width="full"
          />

          <Button
            type="submit"
            label="수정"
            variant="primary"
            disabled={updatingId === measurement.id}
            width="full"
          />

        </div>
      </form>
    </>
  );
};