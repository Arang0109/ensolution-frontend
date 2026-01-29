import { useCompanyForm } from "@company/hooks";
import { useToast } from "@app/providers/toast";
import { Button } from "@shared/ui";

interface CompanyAddFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const CompanyAddForm = ({ onClose, onSuccess }:CompanyAddFormProps ) => {
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
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            업체명 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="업체명을 입력하세요"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            주소 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={form.address}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="주소를 입력하세요"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="ceoName" className="block text-sm font-medium text-gray-700 mb-1">
            대표자명 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="ceoName"
            name="ceoName"
            value={form.ceoName}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="대표자명을 입력하세요"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="bizNumber" className="block text-sm font-medium text-gray-700 mb-1">
            사업자번호 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="bizNumber"
            name="bizNumber"
            value={form.bizNumber}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="000-00-00000"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="remark" className="block text-sm font-medium text-gray-700 mb-1">
            비고
          </label>
          <textarea
            id="remark"
            name="remark"
            value={form.remark}
            onChange={onChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            placeholder="추가 정보를 입력하세요 (선택사항)"
            disabled={isSubmitting}
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            label="취소"
            onClick={onClose}
            variant="cancel"
            size="md"
            width="full"
            type="button"
            disabled={isSubmitting}
          />
          <Button
            label="추가"
            variant="add"
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
