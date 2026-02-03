import { useToast } from "@app/providers/toast";

import { useWorkplaceForm } from "@workplace/hooks";

import { GRADE_LABELS } from "@shared/model";
import { IconButton, Button, InputField, SelectField, TextAreaField } from "@shared/ui";
import { X } from "lucide-react";

interface WorkplaceCreateFormProps {
  companyId: number;
  onClose: () => void;
  onSuccess: () => void;
}

export const WorkplaceCreateForm = ({ onClose, onSuccess, companyId }: WorkplaceCreateFormProps) => {
  const { form, isSubmitting, onChange, onSubmit } = useWorkplaceForm(companyId);
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const result = await onSubmit(e);

    if (result?.success) {
      showToast('사업장이 등록되었습니다.','success');
      onSuccess();
      onClose();
    } else {
      showToast(result?.message ?? '사업장 등록 중 오류가 발생했습니다.','error');
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">사업장 추가</h2>
        <IconButton
          icon={<X />}
          title="닫기"
          size="md"
          onClick={onClose}
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="사업장명"
          required={true}
          name="name"
          value={form.name}
          onChange={(v) => onChange("name", v)}
          placeholder="사업장명을 입력하세요"
          disabled={isSubmitting}
        />
        <InputField
          label="주소"
          name="address"
          value={form.address}
          onChange={(v) => onChange("address", v)}
          placeholder="주소를 입력하세요"
          disabled={isSubmitting}
        />
        <InputField
          label="사업자번호"
          required={true}
          name="bizNumber"
          value={form.bizNumber}
          onChange={(v) => onChange("bizNumber", v)}
          placeholder="000-00-00000"
          disabled={isSubmitting}
        />
        <InputField
          label="업종"
          name="businessCategory"
          value={form.businessCategory}
          onChange={(v) => onChange("businessCategory", v)}
          placeholder="업종을 입력하세요"
          disabled={isSubmitting}
        />
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
        <TextAreaField
          label="비고"
          value={form.remark}
          onChange={(v) => onChange("remark", v)}
          placeholder="추가 정보를 입력하세요 (선택사항)"
          disabled={isSubmitting}
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