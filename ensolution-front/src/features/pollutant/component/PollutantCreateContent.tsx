import { useToast } from "@app/providers/toast";

import { PHASE_LABELS_OPTIONS, METHOD_LABELS_OPTIONS } from "@pollutant/model";
import { usePollutantCreate, usePollutantActions } from "@pollutant/hooks";

import { usePreventSubmitOnEnter } from "@shared/hooks";
import { IconButton, Button, InputField, SelectField } from "@shared/ui";
import { X } from "lucide-react";

interface PollutantCreateFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const PollutantCreateContent = ({
  onClose,
  onSuccess
}: PollutantCreateFormProps) => {
  const { form, errors, onChange, validate } = usePollutantCreate();
  const { handleCreate, creating } = usePollutantActions();
  const { showToast } = useToast();

  const preventSubmitOnEnter = usePreventSubmitOnEnter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    const result = await handleCreate(form);

    if (result?.success) {
      showToast('측정물질이 등록되었습니다.','success');
      onSuccess();
      onClose();
    } else {
      showToast(result?.message,'error');
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

      <form onSubmit={handleSubmit} onKeyDown={preventSubmitOnEnter} className="space-y-4">
        <div className="grid lg:grid-cols-2 gap-4">
          <InputField
            label="측정물질(한글)"
            required={true}
            name="nameKr"
            value={form.nameKr}
            onChange={(v) => onChange("nameKr", v)}
            placeholder="예) 먼지"
            helperText={errors.nameKr}
            disabled={creating}
          />
          <InputField
            label="측정물질(영문)"
            name="nameEn"
            value={form.nameEn}
            onChange={(v) => onChange("nameEn", v)}
            placeholder="예) Dust"
            disabled={creating}
          />
          <SelectField
            label="측정방법"
            name="method"
            value={form.method}
            onChange={(v) => onChange("method", v)}
            required
            disabled={creating}
            options={METHOD_LABELS_OPTIONS}
            getOptionLabel={(v) => v.label}
            getOptionValue={(v) => v.value}
          />
          <SelectField
            label="형상"
            name="phase"
            value={form.phase}
            onChange={(v) => onChange("phase", v)}
            required
            disabled={creating}
            options={PHASE_LABELS_OPTIONS}
            getOptionLabel={(v) => v.label}
            getOptionValue={(v) => v.value}
          />
          <InputField
            label="시험기기"
            name="equipmentName"
            value={form.equipmentName}
            onChange={(v) => onChange("equipmentName", v)}
            disabled={creating}
          />
          <InputField
            label="공정시험법 코드"
            name="testMethodName"
            value={form.testMethodName}
            onChange={(v) => onChange("testMethodName", v)}
            disabled={creating}
          />
          <InputField
            label="채취시간 (분)"
            type="number"
            name="samplingTime"
            value={form.samplingTime}
            onChange={(v) => onChange("samplingTime", v)}
            disabled={creating}
            step={1}
            min={0}
          />
          <InputField
            label="요구 채취량"
            type="number"
            name="testMsamplingVolumeethodName"
            value={form.samplingVolume}
            onChange={(v) => onChange("samplingVolume", v)}
            disabled={creating}
            step={1}
            min={0}
          />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button
            label="취소"
            onClick={onClose}
            variant="secondary"
            size="md"
            width="full"
            type="button"
            disabled={creating}
          />
          <Button
            label="추가"
            variant="primary"
            size="md"
            width="full"
            type="submit"
            disabled={creating}
          />
        </div>
      </form>
    </>
  )
}