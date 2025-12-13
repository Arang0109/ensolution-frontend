// 📌 React & Hooks
import { useState } from 'react';

// 📌 Types
import type { Grade } from '@common/model';
import type { WorkplaceRegisterRequest } from '@workplace/model';

// 📌 Utils
import { formatBizNumber, stripBizNumber } from '@common/utils/formatters';

interface AddWorkplaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyId: number;
  onSuccess: () => void;
  onSubmit: (data: WorkplaceRegisterRequest) => Promise<{ success: boolean; message: string }>;
}

const getInitialForm = (companyId: number): WorkplaceRegisterRequest => ({
  name: '',
  companyId: companyId,
  address: '',
  bizNumber: '',
  businessCategory: '',
  grade: '' as Grade,
  remark: '',
});

export const AddWorkplaceModal = ({
  isOpen,
  onClose,
  companyId,
  onSuccess,
  onSubmit,
}: AddWorkplaceModalProps) => {
  const [form, setForm] = useState<WorkplaceRegisterRequest>(() => getInitialForm(companyId));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'bizNumber') {
      setForm(prev => ({ ...prev, bizNumber: formatBizNumber(value) }));
      return;
    }

    setForm(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm(getInitialForm(companyId));
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      ...form,
      bizNumber: stripBizNumber(form.bizNumber),
    };

    const result = await onSubmit(payload);

    setIsSubmitting(false);

    if (result.success) {
      alert(result.message);
      resetForm();
      onSuccess();
      onClose();
    } else {
      alert(result.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">사업장 추가</h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              disabled={isSubmitting}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                사업장명 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="사업장명을 입력하세요"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                주소 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="주소를 입력하세요"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                사업자등록번호 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="bizNumber"
                value={form.bizNumber}
                onChange={handleChange}
                required
                maxLength={12}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="000-00-00000"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                업종 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="businessCategory"
                value={form.businessCategory}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="업종을 입력하세요"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                종별 <span className="text-red-500">*</span>
              </label>
              <select
                name="grade"
                value={form.grade}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isSubmitting}
              >
                <option value="">선택하세요</option>
                <option value="TYPE_1">1종</option>
                <option value="TYPE_2">2종</option>
                <option value="TYPE_3">3종</option>
                <option value="TYPE_4">4종</option>
                <option value="TYPE_5">5종</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                비고
              </label>
              <textarea
                name="remark"
                value={form.remark}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="비고를 입력하세요"
                disabled={isSubmitting}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? '등록 중...' : '등록'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
