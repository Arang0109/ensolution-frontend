import type { CompanyResponse, CompanyUpdateRequest } from "@entities/company/model";
import type { ValidationErrors } from "@shared/model";

import { InputField, TextAreaField } from "@shared/ui";
import { formatBizNumber, formatDate } from "@shared/lib";

interface CompanyProfileFormProps {
  company: CompanyResponse;
  isEditMode: boolean;
  editForm: CompanyUpdateRequest;
  onChange: (
    name: keyof CompanyUpdateRequest,
    value: string
  ) => void;
  errors: ValidationErrors;
}

export const CompanyProfileForm = ({
  company,
  isEditMode,
  editForm,
  onChange,
  errors,
}: CompanyProfileFormProps) => {

  return (
    <>
      {/* Content */}
      <div>
        {isEditMode ? (
          <div className="space-y-6">
            {/* 기본 정보 섹션 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <InputField
                label="업체명"
                value={editForm.name}
                onChange={(v) => onChange("name", v)}
                helperText={errors.name}
              />
              <InputField
                label="대표자명"
                name="ceoName"
                value={editForm.ceoName}
                onChange={(v) => onChange("ceoName", v)}
                helperText={errors.ceoName}
              />
              <InputField
                label="사업자번호"
                name="bizNumber"
                value={editForm.bizNumber}
                onChange={(v) => onChange("bizNumber", v)}
                helperText={errors.bizNumber}
                placeholder="000-00-00000"
                max={12}
              />
            </div>

            {/* 주소 섹션 */}
            <div>
              <InputField
                label="주소"
                name="address"
                value={editForm.address}
                onChange={(v) => onChange("address", v)}
              />
            </div>

            {/* 추가 정보 섹션 */}
            <div>
              <h3 className="md:text-sm font-semibold text-gray-700 mb-3 pb-2 border-b border-gray-200">
                추가 정보
              </h3>
              <TextAreaField
                label="비고"
                value={editForm.remark}
                onChange={(v) => onChange("remark", v)}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* 기본 정보 섹션 */}
            <div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-4">
                <InputField
                  label="업체명"
                  value={company.name}
                  onChange={() => {}}
                />
                <InputField
                  label="대표자명"
                  value={company.ceoName}
                  onChange={() => {}}
                />
                <InputField
                  label="사업자번호"
                  value={formatBizNumber(company.bizNumber)}
                  onChange={() => {}}
                />
                <InputField
                  label="등록일"
                  value={formatDate(company.createdAt)}
                  onChange={() => {}}
                />
              </div>
            </div>

            {/* 위치 및 등록 정보 섹션 */}
            <div>
              <div className="grid grid-cols-1 gap-x-6 gap-y-4">
                <InputField
                  label="주소"
                  value={company.address}
                  onChange={() => {}}
                />
              </div>
            </div>

            {/* 추가 정보 섹션 */}
            {company.remark && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3 pb-2 border-b border-gray-200">
                  추가 정보
                </h3>
                <TextAreaField
                  label="비고"
                  value={company.remark}
                  onChange={() => {}}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};