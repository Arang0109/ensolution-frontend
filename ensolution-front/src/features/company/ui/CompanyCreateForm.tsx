import { useToast } from "@app/providers/toast";

import { useCompanyForm } from "@company/hooks";

import { Button, InputField, TextAreaField } from "@shared/ui";

interface CompanyCreateFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const CompanyCreateForm = ({ onClose, onSuccess }:CompanyCreateFormProps ) => {
  const { form, isSubmitting, onChange, onSubmit } = useCompanyForm();
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const result = await onSubmit(e);

    if (result?.success) {
      showToast("업체가 등록되었습니다.", "success");
      onSuccess();
      onClose();
    } else {
      showToast(result?.message ?? "업체 등록 중 오류가 발생했습니다.", "error");
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">업체 추가</h2>
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
        <InputField
          label="업체명"
          required={true}
          name="name"
          value={form.name}
          onChange={(v) => onChange("name", v)}
          placeholder="업체명을 입력하세요"
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
          label="대표자명"
          name="ceoName"
          value={form.ceoName}
          onChange={(v) => onChange("ceoName", v)}
          placeholder="대표자명을 입력하세요"
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
  );
};
