import type { WorkplaceResponse, WorkplaceUpdateRequest } from '@workplace/model';

import { GRADE_LABELS } from '@shared/model';
import { formatBizNumber, formatDate } from '@shared/lib';
import { SectionHeader, InputField, TextAreaField, SelectField } from '@shared/ui';

interface WorkplaceDetailCardProps {
  workplace: WorkplaceResponse;
  isEditMode: boolean;
  editForm: WorkplaceUpdateRequest;
  onChange: (
    name: keyof WorkplaceUpdateRequest,
    value: string
  ) => void;
}

export const WorkplaceDetailCard = ({
  workplace,
  isEditMode,
  editForm,
  onChange,
}: WorkplaceDetailCardProps) => {
  const gradeOptions = Object.entries(GRADE_LABELS).map(([value, label]) => ({
    value,
    label,
  }));

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-md overflow-hidden">
      <SectionHeader title="측정대상 사업장 정보" />

      <div className="p-6">
        {isEditMode ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="사업장"
                required={true}
                value={editForm.name}
                onChange={(v) => onChange("name", v)}
              />
              <InputField
                label="주소"
                name="address"
                value={editForm.address}
                onChange={(v) => onChange("address", v)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField
                label="사업자번호"
                required={true}
                name="bizNumber"
                value={editForm.bizNumber}
                onChange={(v) => onChange("bizNumber", v)}
                placeholder="000-00-00000"
                max={12}
              />
              <InputField
                label="업종"
                name="businessCategory"
                value={editForm.businessCategory}
                onChange={(v) => onChange("businessCategory", v)}
              />
              <SelectField
                label='사업장 규모'
                name='grade'
                value={editForm.grade}
                onChange={(v) => onChange("grade", v)}
                options={gradeOptions}
              />
            </div>

            {/* 비고 */}
            <TextAreaField
              label="비고"
              value={editForm.remark}
              onChange={(v) => onChange("remark", v)}
            />
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
                <InputField
                  label="업체명"
                  value={workplace.name}
                  readOnly
                />
                <InputField
                  label="주소"
                  value={workplace.address}
                  readOnly
                />
                <InputField
                  label="등록일"
                  value={formatDate(workplace.createdAt)}
                  readOnly
                />
              </div>
            </div>

            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
                <InputField
                  label="사업자번호"
                  value={formatBizNumber(workplace.bizNumber)}
                  readOnly
                />
                <InputField
                  label="업종"
                  value={workplace.businessCategory}
                  readOnly
                />
                <InputField
                  label="사업장 규모"
                  value={GRADE_LABELS[workplace.grade] ?? workplace.grade}
                  readOnly
                />
              </div>
            </div>

            {/* 비고 */}
            {workplace.remark && (
              <TextAreaField
                label="비고"
                value={workplace.remark}
                readOnly
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};