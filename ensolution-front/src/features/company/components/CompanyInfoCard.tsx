import React from "react";

import { formatBizNumber } from "@common/utils/formatters";

interface CompanyInfoCardProps {
  company: {
    name: string;
    ceoName: string;
    bizNumber: string;
    address: string;
    remark?: string | null;
    createdAt: string;
  };
  isEditMode: boolean;
  editForm: {
    name: string;
    ceoName: string;
    bizNumber: string;
    address: string;
    remark: string;
  };
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

interface StaticFieldProps {
  label: string;
  value: string;
}

export const CompanyInfoCard: React.FC<CompanyInfoCardProps> = ({
  company,
  isEditMode,
  editForm,
  onChange,
}) => {
  return (
    <div className="bg-white border border-sand-200 rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-brown-900">기본 정보</h2>

      <div className="space-y-4">
        {isEditMode ? (
          <>
            {/* 이름 / 대표자명 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoInput label="업체명 *" name="name" value={editForm.name} onChange={onChange} />
              <InfoInput label="대표자명 *" name="ceoName" value={editForm.ceoName} onChange={onChange} />
            </div>

            {/* 사업자번호 / 등록일 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoInput
                label="사업자번호 *"
                name="bizNumber"
                value={editForm.bizNumber}
                onChange={onChange}
                placeholder="000-00-00000"
                maxLength={12}
              />
              <StaticField label="등록일" value={formatDate(company.createdAt)} />
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
            {/* 이름 / 대표자명 */}
            <ReadOnlyPair label="업체명" value={company.name} />
            <ReadOnlyPair label="대표자명" value={company.ceoName} />

            {/* 사업자번호 / 등록일 */}
            <ReadOnlyPair label="사업자번호" value={formatBizNumber(company.bizNumber)} />
            <ReadOnlyPair label="등록일" value={formatDate(company.createdAt)} />

            {/* 주소 */}
            <ReadOnlyPair label="주소" value={company.address} />

            {/* 비고 */}
            {company.remark && (
              <ReadOnlyPair label="비고" value={company.remark} multiLine />
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

const StaticField: React.FC<StaticFieldProps> = ({ label, value }) => (
  <div>
    <label className="text-sm font-medium text-gray-500">{label}</label>
    <p className="text-base text-gray-800 mt-1">{value}</p>
  </div>
);

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("ko-KR");