import { useStackForm } from "@stack/hooks";
import { SHAPE_LABELS_OPTIONS, ORIENTATION_LABELS_OPTIONS } from "@stack/model";

import { GRADE_LABELS_OPTIONS } from "@shared/model";
import { IconButton, Button, InputField, SelectField, TextAreaField } from "@shared/ui";
import { X } from "lucide-react";


interface StackCreateFormProps {
  workplaceId: number;
  onClose: () => void;
  onSuccess: () => void;
}

export const StackCreateForm = ({ workplaceId, onClose, onSuccess }: StackCreateFormProps) => {
  const { form, isSubmitting, onChange, onSubmit } = useStackForm(workplaceId);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const result = await onSubmit(e);

    if (result?.success) {
      onSuccess();
      onClose();
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">측정시설 추가</h2>
        <IconButton
          icon={<X />}
          title="닫기"
          size="md"
          onClick={onClose}
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="측정시설명"
            required={true}
            name="name"
            value={form.name}
            onChange={(v) => onChange("name", v)}
            placeholder="측정시설명을 입력하세요"
            disabled={isSubmitting}
          />
          <InputField
            label="SEMS번호"
            required={true}
            name="semsNumber"
            value={form.semsNumber}
            onChange={(v) => onChange("semsNumber", v)}
            placeholder="SEMS 번호를 입력하세요"
            disabled={isSubmitting}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            label="종별"
            name="grade"
            value={form.grade}
            onChange={(v) => onChange("grade", v)}
            required
            disabled={isSubmitting}
            options={GRADE_LABELS_OPTIONS}
            getOptionLabel={(g) => g.label}
            getOptionValue={(g) => g.value}
          />
          <InputField
            label="높이"
            type="number"
            name="height"
            value={form.height}
            onChange={(v) => onChange("height", v)}
            placeholder="높이를 입력하세요"
            disabled={isSubmitting}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            label="형태"
            name="shape"
            value={form.shape}
            onChange={(v) => onChange("shape", v)}
            required
            disabled={isSubmitting}
            options={SHAPE_LABELS_OPTIONS}
            getOptionLabel={(g) => g.label}
            getOptionValue={(g) => g.value}
          />
          <SelectField
            label="방향"
            name="orientation"
              value={form.orientation}
            onChange={(v) => onChange("orientation", v)}
            required
            disabled={isSubmitting}
            options={ORIENTATION_LABELS_OPTIONS}
            getOptionLabel={(g) => g.label}
            getOptionValue={(g) => g.value}
          />
        </div>

        {/* 원형일 경우 지름만, 사각형일 경우 가로/세로 길이 */}
        {form.shape === "CIRCULAR" ? (
          <InputField
            label="지름 (cm)"
            name="diameter"
            value={form.horizontalLength}
            onChange={(v) => onChange("horizontalLength", v)}
            placeholder="지름을 입력하세요"
            required
            disabled={isSubmitting}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="가로 (cm)"
              type="number"
              name="horizontalLength"
              value={form.horizontalLength}
              onChange={(v) => onChange("horizontalLength", v)}
              placeholder="가로길이를 입력하세요"
              required
              disabled={isSubmitting}
            />

            <InputField
              label="세로 (cm)"
              type="number"
              name="verticalLength"
              value={form.verticalLength}
              onChange={(v) => onChange("verticalLength", v)}
              placeholder="세로길이를 입력하세요"
              required
              disabled={isSubmitting}
            />

          </div>
        )}

        <TextAreaField
          label="비고"
          value={form.remark}
          onChange={(v) => onChange("remark", v)}
          placeholder="추가 정보를 입력하세요 (선택사항)"
          disabled={isSubmitting}
        />

        <div className="flex gap-3 pt-4">
          <Button
            label="취소"
            onClick={onClose}
            variant="danger"
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