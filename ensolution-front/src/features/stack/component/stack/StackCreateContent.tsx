import { useToast } from "@app/providers/toast";

import { useStackActions, useStackCreateForm } from "@/features/stack/hooks";
import { SHAPE_LABELS_OPTIONS, ORIENTATION_LABELS_OPTIONS } from "@/entities/stack/model";
import { mapStackCreateFormToRequest } from "@/entities/stack/model";

import { usePreventSubmitOnEnter } from "@shared/hooks";
import { GRADE_LABELS_OPTIONS } from "@shared/model";
import { IconButton, Button, InputField, SelectField, TextAreaField } from "@shared/ui";
import { X } from "lucide-react";


interface StackCreateFormProps {
  workplaceId: number;
  onClose: () => void;
  onSuccess: () => void;
}

export const StackCreateContent = ({ workplaceId, onClose, onSuccess }: StackCreateFormProps) => {
  const { form, errors, updateField, validateForm } = useStackCreateForm(workplaceId);
  const { createStackProfile, creating } = useStackActions();
  const { showToast } = useToast();

  const preventSubmitOnEnter = usePreventSubmitOnEnter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = mapStackCreateFormToRequest(form);
    const result = await createStackProfile(payload);

    if (result?.success) {
      showToast('측정시설이 등록되었습니다.', 'success');
      onSuccess();
      onClose();
    } else {
      showToast(result?.message,'error');
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-base md:text-2xl font-bold text-gray-800">측정시설 추가</h2>
        <IconButton
          icon={<X />}
          title="닫기"
          size="md"
          onClick={onClose}
        />
      </div>

      <form onSubmit={handleSubmit} onKeyDown={preventSubmitOnEnter} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="측정시설명"
            name="name"
            value={form.name}
            onChange={(v) => updateField("name", v)}
            placeholder="측정시설명을 입력하세요"
            helperText={errors.name}
            disabled={creating}
          />
          <InputField
            label="SEMS번호"
            name="semsNumber"
            value={form.semsNumber}
            onChange={(v) => updateField("semsNumber", v)}
            placeholder="SEMS 번호를 입력하세요"
            disabled={creating}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            label="종별"
            name="grade"
            value={form.grade}
            placeholder="종별을 선택하세요"
            onChange={(v) => updateField("grade", v)}
            disabled={creating}
            options={GRADE_LABELS_OPTIONS}
            getOptionLabel={(g) => g.label}
            getOptionValue={(g) => g.value}
          />
          <InputField
            label="높이"
            type="number"
            name="height"
            value={form.height}
            onChange={(v) => updateField("height", v)}
            placeholder="높이를 입력하세요"
            disabled={creating}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            label="형태"
            name="shape"
            value={form.shape}
            placeholder="형태를 선택하세요"
            onChange={(v) => updateField("shape", v)}
            disabled={creating}
            options={SHAPE_LABELS_OPTIONS}
            getOptionLabel={(g) => g.label}
            getOptionValue={(g) => g.value}
          />
          <SelectField
            label="방향"
            name="orientation"
            value={form.orientation}
            onChange={(v) => updateField("orientation", v)}
            placeholder="방향을 선택하세요"
            disabled={creating}
            options={ORIENTATION_LABELS_OPTIONS}
            getOptionLabel={(g) => g.label}
            getOptionValue={(g) => g.value}
          />
        </div>

        {/* 원형일 경우 지름만, 사각형일 경우 가로/세로 길이 */}
        {form.shape === "CIRCULAR" ? (
          <InputField
            label="지름 (cm)"
            type="number"
            name="diameter"
            value={form.horizontalLength}
            onChange={(v) => updateField("horizontalLength", v)}
            placeholder="지름을 입력하세요"
            disabled={creating}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="가로 (cm)"
              type="number"
              name="horizontalLength"
              value={form.horizontalLength}
              onChange={(v) => updateField("horizontalLength", v)}
              placeholder="가로길이를 입력하세요"
              disabled={creating}
            />

            <InputField
              label="세로 (cm)"
              type="number"
              name="verticalLength"
              value={form.verticalLength}
              onChange={(v) => updateField("verticalLength", v)}
              placeholder="세로길이를 입력하세요"
              disabled={creating}
            />

          </div>
        )}

        <TextAreaField
          label="비고"
          value={form.remark}
          onChange={(v) => updateField("remark", v)}
          placeholder="추가 정보를 입력하세요 (선택사항)"
          disabled={creating}
        />

        <div className="flex gap-3 pt-4">
          <Button
            label="취소"
            onClick={onClose}
            variant="danger"
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