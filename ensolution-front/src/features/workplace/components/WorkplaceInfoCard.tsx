import { GRADE_LABELS } from '@/common/constants';
import { formatBizNumber, formatDate } from '@/common/utils/formatters';
import type { Grade } from '@model/common.types';
import React from 'react';

interface WorkplaceInfoCardProps {
  workplace: {
    name: string;
    bizNumber: string;
    businessCategory: string;
    grade: Grade;
    address: string;
    remark?: string | null;
    createdAt: Date;
  };
  isEditMode: boolean;
  editForm: {
    name: string;
    bizNumber: string;
    businessCategory: string;
    grade: Grade;
    address: string;
    remark: string;
  };
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
}

interface InfoInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

interface InfoTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

interface InfoSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
}

interface ReadOnlyPairProps {
  label: string;
  value: string;
  multiLine?: boolean;
}

export const WorkplaceInfoCard: React.FC<WorkplaceInfoCardProps> = ({
  workplace,
  isEditMode,
  editForm,
  onChange,
}) => {
  const gradeOptions = Object.entries(GRADE_LABELS).map(([value, label]) => ({
    value,
    label,
  }));

  return (
    <div className="bg-white border border-sand-200 rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-brown-900">기본 정보</h2>

      <div className="space-y-4">
        {isEditMode ? (
          <>
            {/* 사업장명 / 사업자번호 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoInput
                label="사업장명 *"
                name="name"
                value={editForm.name}
                onChange={onChange}
              />
              <InfoInput
                label="사업자번호 *"
                name="bizNumber"
                value={editForm.bizNumber}
                onChange={onChange}
                placeholder="000-00-00000"
                maxLength={12}
              />
            </div>

            {/* 업종 / 사업장 규모 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoInput
                label="업종 *"
                name="businessCategory"
                value={editForm.businessCategory}
                onChange={onChange}
              />
              <InfoSelect
                label="사업장 규모 *"
                name="grade"
                value={editForm.grade}
                onChange={onChange}
                options={gradeOptions}
              />
            </div>

            {/* 주소 */}
            <InfoInput
              label="주소 *"
              name="address"
              value={editForm.address}
              onChange={onChange}
            />

            {/* 비고 */}
            <InfoTextarea
              label="비고"
              name="remark"
              value={editForm.remark}
              onChange={onChange}
            />
          </>
        ) : (
          <>
            {/* 사업장명 / 사업자번호 */}
            <ReadOnlyPair label="사업장명" value={workplace.name} />
            <ReadOnlyPair label="사업자번호" value={formatBizNumber(workplace.bizNumber)} />

            {/* 업종 / 사업장 규모 */}
            <ReadOnlyPair label="업종" value={workplace.businessCategory} />
            <ReadOnlyPair
              label="사업장 규모"
              value={GRADE_LABELS[workplace.grade] ?? workplace.grade}
            />

            {/* 주소 */}
            <ReadOnlyPair label="주소" value={workplace.address} />

            {/* 등록일 */}
            <ReadOnlyPair label="등록일" value={formatDate(workplace.createdAt)} />

            {/* 비고 */}
            {workplace.remark && (
              <ReadOnlyPair label="비고" value={workplace.remark} multiLine />
            )}
          </>
        )}
      </div>
    </div>
  );
};

// 🔹 타입 적용된 서브 컴포넌트들
const InfoInput: React.FC<InfoInputProps> = ({ label, ...props }) => (
  <div>
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent"
      required
      {...props}
    />
  </div>
);

const InfoTextarea: React.FC<InfoTextareaProps> = ({ label, ...props }) => (
  <div>
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <textarea
      rows={3}
      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent resize-none"
      {...props}
    />
  </div>
);

const InfoSelect: React.FC<InfoSelectProps> = ({ label, options, ...props }) => (
  <div>
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <select
      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent"
      required
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const ReadOnlyPair: React.FC<ReadOnlyPairProps> = ({ label, value, multiLine = false }) => (
  <div>
    <label className="text-sm font-medium text-gray-500">{label}</label>
    <p
      className={`text-base text-gray-800 mt-1 ${
        multiLine ? "whitespace-pre-wrap" : ""
      }`}
    >
      {value}
    </p>
  </div>
);
