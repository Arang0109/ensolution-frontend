import React from 'react';

import { GRADE_LABELS } from '@common/constants';
import { formatBizNumber, formatDate } from '@common/utils/formatters';
import type { WorkplaceResponse, WorkplaceUpdateRequest } from '@workplace/model';

interface WorkplaceInfoCardProps {
  workplace: WorkplaceResponse;
  isEditMode: boolean;
  editForm: WorkplaceUpdateRequest;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
}

interface InfoInputProps extends React.InputHTMLAttributes<HTMLInputElement> { label: string; }

interface InfoTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { label: string; }

interface InfoSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
}

interface ReadOnlyPairProps {
  label: string;
  value: string;
  multiLine?: boolean;
}

export const WorkplaceInfoCard = ({
  workplace,
  isEditMode,
  editForm,
  onChange,
}: WorkplaceInfoCardProps) => {
  const gradeOptions = Object.entries(GRADE_LABELS).map(([value, label]) => ({
    value,
    label,
  }));

  return (
    <div className="bg-white border border-sand-200 rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-brown-50 to-sand-50 px-6 py-4 border-b border-sand-200">
        <h2 className="text-xl font-semibold text-brown-900 flex items-center gap-2">
          <span className="w-1 h-6 bg-brown-600 rounded-full"></span>
          업체 정보
        </h2>
      </div>

      <div className="p-6">
        {isEditMode ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoInput label="사업장명 *" name="name" value={editForm.name} onChange={onChange} />
              <InfoInput label="주소 *" name="address" value={editForm.address} onChange={onChange} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InfoInput label="사업자번호 *" name="bizNumber" value={editForm.bizNumber} onChange={onChange} placeholder="000-00-00000" maxLength={12} />
              <InfoInput label="업종 *" name="businessCategory" value={editForm.businessCategory} onChange={onChange} />
              <InfoSelect label="사업장 규모 *" name="grade" value={editForm.grade} onChange={onChange} options={gradeOptions} />
            </div>

            {/* 비고 */}
            <InfoTextarea label="비고" name="remark" value={editForm.remark} onChange={onChange} />
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
                <ReadOnlyPair label="사업장명" value={workplace.name} />
                <ReadOnlyPair label="주소" value={workplace.address} />
                <ReadOnlyPair label="등록일" value={formatDate(workplace.createdAt)} />
              </div>
            </div>

            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
                <ReadOnlyPair label="사업자번호" value={formatBizNumber(workplace.bizNumber)} />
                <ReadOnlyPair label="업종" value={workplace.businessCategory} />
                <ReadOnlyPair
                  label="사업장 규모"
                  value={GRADE_LABELS[workplace.grade] ?? workplace.grade}
                />
              </div>
            </div>

            {/* 비고 */}
            {workplace.remark && (
              <ReadOnlyPair label="비고" value={workplace.remark} multiLine />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// 🔹 타입 적용된 서브 컴포넌트들
const InfoInput = ({ label, ...props }: InfoInputProps) => (
  <div>
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent"
      required
      {...props}
    />
  </div>
);

const InfoTextarea = ({ label, ...props }: InfoTextareaProps) => (
  <div>
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <textarea
      rows={3}
      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent resize-none"
      {...props}
    />
  </div>
);

const InfoSelect = ({ label, options, ...props }: InfoSelectProps) => (
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

const ReadOnlyPair = ({ label, value, multiLine = false }: ReadOnlyPairProps) => (
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