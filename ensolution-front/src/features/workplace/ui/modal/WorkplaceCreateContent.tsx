import { useToast } from "@app/providers/toast";

import { useWorkplaceActions, useWorkplaceCreate } from "@workplace/hooks";
import { mapCreateFormToRequest } from "@entities/workplace/model";

import { usePreventSubmitOnEnter } from "@shared/hooks";
import { GRADE_LABELS_OPTIONS } from "@shared/model";
import { IconButton, Button, InputField, SelectField, TextAreaField } from "@shared/ui";
import { X } from "lucide-react";
import type { FormEvent } from "react";

interface WorkplaceCreateContentProps {
  companyId: number;
  onClose: () => void;
  onSuccess: () => void;
}

export const WorkplaceCreateContent = ({ onClose, onSuccess, companyId }: WorkplaceCreateContentProps) => {
  const { form, errors, onChange, validate } = useWorkplaceCreate(companyId);
  const { handleCreate, creating } = useWorkplaceActions();
  const { showToast } = useToast();

  const preventSubmitOnEnter = usePreventSubmitOnEnter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = mapCreateFormToRequest(form);
    const result = await handleCreate(payload);

    if (result?.success) {
      showToast('사업장이 등록되었습니다.','success');
      onSuccess();
      onClose();
    } else {
      showToast(result?.message,'error');
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-base md:text-2xl font-bold text-gray-800">사업장 추가</h2>
        <IconButton
          icon={<X />}
          title="닫기"
          size="md"
          onClick={onClose}
        />
      </div>

      <form onSubmit={handleSubmit} onKeyDown={preventSubmitOnEnter} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <InputField
            label="사업장명"
            name="name"
            value={form.name}
            onChange={(v) => onChange("name", v)}
            placeholder="사업장명을 입력하세요"
            helperText={errors.name}
            disabled={creating}
          />
          <InputField
            label="사업자번호"
            name="bizNumber"
            value={form.bizNumber}
            onChange={(v) => onChange("bizNumber", v)}
            placeholder="000-00-00000"
            helperText={errors.bizNumber}
            disabled={creating}
          />
        </div>
        <InputField
          label="주소"
          name="address"
          value={form.address}
          onChange={(v) => onChange("address", v)}
          placeholder="주소를 입력하세요"
          disabled={creating}
        />
        <div className="grid md:grid-cols-2 gap-4">
          <InputField
            label="업종"
            name="businessCategory"
            value={form.businessCategory}
            onChange={(v) => onChange("businessCategory", v)}
            placeholder="업종을 입력하세요"
            disabled={creating}
          />
          <SelectField
            label="종별"
            name="grade"
            value={form.grade}
            onChange={(v) => onChange("grade", v)}
            placeholder="종별을 선택하세요"
            required
            disabled={creating}
            options={GRADE_LABELS_OPTIONS}
            getOptionLabel={(o) => o.label}
            getOptionValue={(o) => o.value}
          />
        </div>
        <TextAreaField
          label="비고"
          value={form.remark}
          onChange={(v) => onChange("remark", v)}
          placeholder="추가 정보를 입력하세요 (선택사항)"
          disabled={creating}
        />

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