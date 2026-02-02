import { useStackForm } from "@stack/hooks";
import { SHAPE_LABELS, ORIENTATION_LABELS } from "@stack/model";

import { GRADE_LABELS } from "@shared/model";
import { Button, InputField, SelectField, TextAreaField } from "@shared/ui";

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
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition-colors"
          disabled={isSubmitting}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
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
            options={Object.entries(GRADE_LABELS).map(([value, label]) => ({
              value,
              label,
            }))}
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
            options={Object.entries(SHAPE_LABELS).map(([value, label]) => ({
              value,
              label,
            }))}
          />
          <SelectField
            label="방향"
            name="orientation"
              value={form.orientation}
            onChange={(v) => onChange("orientation", v)}
            required
            disabled={isSubmitting}
            options={Object.entries(ORIENTATION_LABELS).map(([value, label]) => ({
              value,
              label,
            }))}
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