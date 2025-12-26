import React from "react";

import type { CompanyResponse, CompanyUpdateRequest } from "@company/model";

import { formatBizNumber } from "@common/utils/formatters";

interface CompanyInfoCardProps {
  company: CompanyResponse;
  isEditMode: boolean;
  editForm: CompanyUpdateRequest;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

interface InfoInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

interface InfoTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

interface ReadOnlyPairProps {
  label: string;
  value: string;
  multiLine?: boolean;
}

export const CompanyInfoCard = ({
  company,
  isEditMode,
  editForm,
  onChange,
}: CompanyInfoCardProps) => {
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-neutral-50 to-slate-50 px-6 py-4 border-b border-slate-200">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center gap-2">
          <span className="w-1 h-6 bg-neutral-600 rounded-full"></span>
          업체 정보
        </h2>
      </div>

      {/* Content */}
      <div className="p-6">
        {isEditMode ? (
          <div className="space-y-6">
            {/* 기본 정보 섹션 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <InfoInput label="업체명 *" name="name" value={editForm.name} onChange={onChange} />
              <InfoInput label="대표자명 *" name="ceoName" value={editForm.ceoName} onChange={onChange} />
              <InfoInput label="사업자번호 *" name="bizNumber" value={editForm.bizNumber} onChange={onChange}
                placeholder="000-00-00000" maxLength={12} />
            </div>

            {/* 주소 섹션 */}
            <div>
              <InfoInput label="주소 *" name="address" value={editForm.address} onChange={onChange}/>
            </div>

            {/* 추가 정보 섹션 */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 pb-2 border-b border-gray-200">
                추가 정보
              </h3>
              <InfoTextarea
                label="비고"
                name="remark"
                value={editForm.remark}
                onChange={onChange}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* 기본 정보 섹션 */}
            <div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-4">
                <ReadOnlyPair label="업체명" value={company.name} />
                <ReadOnlyPair label="대표자명" value={company.ceoName} />
                <ReadOnlyPair label="사업자번호" value={formatBizNumber(company.bizNumber)} />
                <ReadOnlyPair label="등록일" value={formatDate(company.createdAt)} />
              </div>
            </div>

            {/* 위치 및 등록 정보 섹션 */}
            <div>
              <div className="grid grid-cols-1 gap-x-6 gap-y-4">
                <ReadOnlyPair label="주소" value={company.address} />
              </div>
            </div>

            {/* 추가 정보 섹션 */}
            {company.remark && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3 pb-2 border-b border-gray-200">
                  추가 정보
                </h3>
                <ReadOnlyPair label="비고" value={company.remark} multiLine />
              </div>
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
      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
      {...props}
    />
  </div>
);

const ReadOnlyPair = ({ label, value, multiLine = false }: ReadOnlyPairProps) => (
  <div className="group">
    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
      {label}
    </label>
    <p
      className={`text-base text-gray-900 mt-1.5 font-medium ${
        multiLine ? "whitespace-pre-wrap bg-gray-50 p-3 rounded-md border border-gray-200" : ""
      }`}
    >
      {value}
    </p>
  </div>
);

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("ko-KR");