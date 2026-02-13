import { useToast } from "@app/providers/toast";

import { useCompanyCreate, useCompanyActions } from "@company/hooks";
import { mapCreateFormToRequest } from "@company/model";

import { usePreventSubmitOnEnter } from "@shared/hooks";
import { IconButton, Button, InputField, TextAreaField } from "@shared/ui";
import { X } from "lucide-react";

interface CompanyCreateFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const CompanyCreateContent = ({ onClose, onSuccess }: CompanyCreateFormProps) => {

  const { form, errors, onChange, validate } = useCompanyCreate();
  const { handleCreate, creating } = useCompanyActions();
  const { showToast } = useToast();

  const preventSubmitOnEnter = usePreventSubmitOnEnter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const payload = mapCreateFormToRequest(form);
    const result = await handleCreate(payload);

    if (result.success) {
      showToast("업체가 등록되었습니다.", "success");
      onSuccess();
      onClose();
    } else {
      showToast(result.message, "error");
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">업체 추가</h2>
        <IconButton
          icon={<X />}
          title="닫기"
          size="md"
          onClick={onClose}
        />
      </div>

      <form onSubmit={handleSubmit} onKeyDown={preventSubmitOnEnter} className="space-y-4">
        <InputField
          label="업체명"
          required={true}
          name="name"
          value={form.name}
          onChange={(v) => onChange("name", v)}
          placeholder="업체명을 입력하세요"
          helperText={errors.name}
          disabled={creating}
        />
        <InputField
          label="주소"
          name="address"
          value={form.address}
          onChange={(v) => onChange("address", v)}
          placeholder="주소를 입력하세요"
          disabled={creating}
        />
        <InputField
          label="대표자명"
          name="ceoName"
          value={form.ceoName}
          onChange={(v) => onChange("ceoName", v)}
          placeholder="대표자명을 입력하세요"
          helperText={errors.ceoName}
          disabled={creating}
        />
        <InputField
          label="사업자번호"
          required={true}
          name="bizNumber"
          value={form.bizNumber}
          onChange={(v) => onChange("bizNumber", v)}
          placeholder="000-00-00000"
          helperText={errors.bizNumber}
          disabled={creating}
        />
        <TextAreaField
          label="비고"
          value={form.remark}
          onChange={(v) => onChange("remark", v)}
          placeholder="추가 정보를 입력하세요 (선택사항)"
          disabled={creating}
        />

        <div className="flex gap-3 pt-4">
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
  );
};
