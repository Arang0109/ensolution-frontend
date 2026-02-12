import { useToast } from "@app/providers/toast";

import { PHASE_LABELS } from "@pollutant/model";
import { usePollutantForm } from "@pollutant/hooks";

import { IconButton, Button, InputField, SelectField } from "@shared/ui";
import { X } from "lucide-react";

interface PollutantCreateFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const PollutantCreateForm = ({
  onClose,
  onSuccess
}: PollutantCreateFormProps) => {
  const { form, isSubmitting, onChange, onSubmit } = usePollutantForm();
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const result = await onSubmit(e);

    if (result?.success) {
      showToast('측정물질이 등록되었습니다.','success');
      onSuccess();
      onClose();
    } else {
      showToast(result?.message ?? '측정물질 등록 중 오류가 발생했습니다.','error');
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">측정물질 추가</h2>
        <IconButton
          icon={<X />}
          title="닫기"
          size="md"
          onClick={onClose}
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="측정물질(한글)"
          required={true}
          name="nameKr"
          value={form.nameKr}
          onChange={(v) => onChange("nameKr", v)}
          placeholder="예) 먼지"
          disabled={isSubmitting}
        />
        <InputField
          label="측정물질(영문)"
          name="nameEn"
          value={form.nameEn}
          onChange={(v) => onChange("nameEn", v)}
          placeholder="예) Dust"
          disabled={isSubmitting}
        />
        <InputField
          label="측정방법"
          required={true}
          name="method"
          value={form.method}
          onChange={(v) => onChange("method", v)}
          placeholder="예) 현장측정"
          disabled={isSubmitting}
        />
        <SelectField
          label="상"
          name="phase"
          value={form.phase}
          onChange={(v) => onChange("phase", v)}
          required
          disabled={isSubmitting}
          options={Object.entries(PHASE_LABELS).map(([value, label]) => ({
            value,
            label,
          }))}
          getOptionLabel={(v) => v.label}
          getOptionValue={(v) => v.value}
        />
        <InputField
          label="시험기기"
          name="equipmentName"
          value={form.equipmentName}
          onChange={(v) => onChange("equipmentName", v)}
          disabled={isSubmitting}
        />
        <InputField
          label="공정시험법 코드"
          name="testMethodName"
          value={form.testMethodName}
          onChange={(v) => onChange("testMethodName", v)}
          disabled={isSubmitting}
        />
        <InputField
          label="채취시간 (분)"
          type="number"
          name="samplingTime"
          value={form.samplingTime}
          onChange={(v) => onChange("samplingTime", v)}
          disabled={isSubmitting}
          step={1}
          min={0}
        />
        <InputField
          label="요구 채취량"
          type="number"
          name="testMsamplingVolumeethodName"
          value={form.samplingVolume}
          onChange={(v) => onChange("samplingVolume", v)}
          disabled={isSubmitting}
          step={1}
          min={0}
        />

        <div className="flex justify-end gap-3 pt-4">
          <Button
            label="취소"
            onClick={onClose}
            variant="secondary"
            size="md"
            width="full"
            type="button"
            disabled={isSubmitting}
          />
          <Button
            label="추가"
            variant="primary"
            size="md"
            width="full"
            type="submit"
            disabled={isSubmitting}
          />
        </div>
      </form>
    </>
  )
}