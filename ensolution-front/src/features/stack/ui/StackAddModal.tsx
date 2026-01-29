import { useState } from "react";
import { useToast } from "@app/providers/toast";
import type { Grade, Orientation, Shape } from "@/shared/model";
import type { StackRegisterRequest } from "@stack/model";
import { registerStack } from "@stack/api/stackApi";
import { SHAPE_LABELS, ORIENTATION_LABELS } from "@stack/model";
import { GRADE_LABELS } from "@shared/model";

import { Button } from "@shared/ui";

interface StackAddModalProps {
  workplaceId: number;
  onClose: () => void;
  onSuccess: () => void;
}

export const StackAddModal = ({ workplaceId, onClose, onSuccess }: StackAddModalProps) => {
  const { showToast } = useToast();
  const [form, setForm] = useState<StackRegisterRequest>({
    name: "",
    workplaceId,
    semsNumber: "",
    grade: "TYPE_1" as Grade,
    height: "",
    horizontalLength: "",
    verticalLength: "",
    shape: "CIRCULAR" as Shape,
    orientation: "VERTICAL" as Orientation,
    remark: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // 원형일 경우 true
  const isCircular = form.shape === 'CIRCULAR';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "horizontalLength" || name === "verticalLength"
        ? Number(value)
        : value,
    }));
  };

  // 원형일 때 지름 입력 시 horizontalLength와 verticalLength 모두 업데이트
  const handleDiameterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setForm((prev) => ({
      ...prev,
      horizontalLength: value,
      verticalLength: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await registerStack(form);
      if (res.status) {
        showToast('배출구가 등록되었습니다.', 'success');
        onSuccess();
        onClose();
      } else {
        showToast(res.message ?? '배출구 등록에 실패했습니다.', 'error');
      }
    } catch {
      showToast('등록 중 오류가 발생했습니다.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">시설 추가</h2>
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
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                측정시설명 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="시설명을 입력하세요"
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="semsNumber" className="block text-sm font-medium text-gray-700 mb-1">
                SEMS 번호 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="semsNumber"
                name="semsNumber"
                value={form.semsNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="SEMS 번호를 입력하세요"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
                종별 <span className="text-red-500">*</span>
              </label>
              <select
                id="grade"
                name="grade"
                value={form.grade}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
                disabled={isSubmitting}
              >
                {Object.entries(GRADE_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
                높이 (m) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="height"
                name="height"
                value={form.height}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="높이를 입력하세요"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="shape" className="block text-sm font-medium text-gray-700 mb-1">
                형태 <span className="text-red-500">*</span>
              </label>
              <select
                id="shape"
                name="shape"
                value={form.shape}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
                disabled={isSubmitting}
              >
                {Object.entries(SHAPE_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="orientation" className="block text-sm font-medium text-gray-700 mb-1">
                방향 <span className="text-red-500">*</span>
              </label>
              <select
                id="orientation"
                name="orientation"
                value={form.orientation}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
                disabled={isSubmitting}
              >
                {Object.entries(ORIENTATION_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 원형일 경우 지름만, 사각형일 경우 가로/세로 길이 */}
          {isCircular ? (
            <div>
              <label htmlFor="diameter" className="block text-sm font-medium text-gray-700 mb-1">
                지름 (m) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="diameter"
                name="diameter"
                value={form.horizontalLength}
                onChange={handleDiameterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="지름을 입력하세요"
                required
                disabled={isSubmitting}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="horizontalLength" className="block text-sm font-medium text-gray-700 mb-1">
                  가로 길이 (m) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="horizontalLength"
                  name="horizontalLength"
                  value={form.horizontalLength}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="가로 길이를 입력하세요"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="verticalLength" className="block text-sm font-medium text-gray-700 mb-1">
                  세로 길이 (m) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="verticalLength"
                  name="verticalLength"
                  value={form.verticalLength}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="세로 길이를 입력하세요"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="remark" className="block text-sm font-medium text-gray-700 mb-1">
              비고
            </label>
            <textarea
              id="remark"
              name="remark"
              value={form.remark}
              onChange={handleChange}
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
      </div>
    </div>
  );
};
