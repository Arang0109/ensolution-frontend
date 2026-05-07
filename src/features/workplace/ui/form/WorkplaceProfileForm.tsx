import type { WorkplaceResponse, WorkplaceUpdateRequest } from '@entities/workplace/model';

import { GRADE_LABELS_OPTIONS, GRADE_LABELS } from '@shared/model';
import type { ValidationErrors } from "@shared/model";
import { formatBizNumber, formatDate } from '@shared/lib';
import { InputField, TextAreaField, SelectField } from '@shared/ui';

interface WorkplaceProfileFormProps {
  workplace: WorkplaceResponse;
  isEditMode: boolean;
  editForm: WorkplaceUpdateRequest;
  onChange: (
    name: keyof WorkplaceUpdateRequest,
    value: string
  ) => void;
  errors: ValidationErrors;
}

export const WorkplaceProfileForm = ({
  workplace,
  isEditMode,
  errors,
  editForm,
  onChange,
}: WorkplaceProfileFormProps) => {

  return (
    <>
    <div>
      {isEditMode ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="사업장"
              value={editForm.name}
              onChange={(v) => onChange("name", v)}
              helperText={errors.name}
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
              name="bizNumber"
              value={editForm.bizNumber}
              onChange={(v) => onChange("bizNumber", v)}
              placeholder="000-00-00000"
              helperText={errors.bizNumber}
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
              options={GRADE_LABELS_OPTIONS}
              getOptionValue={(g) => g.value}
              getOptionLabel={(g) => g.label}
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
                  onChange={() => {}}
              />
              <InputField
                label="주소"
                value={workplace.address}
                  onChange={() => {}}
              />
              <InputField
                label="등록일"
                value={formatDate(workplace.createdAt)}
                  onChange={() => {}}
              />
            </div>
          </div>

          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
              <InputField
                label="사업자번호"
                value={formatBizNumber(workplace.bizNumber)}
                  onChange={() => {}}
              />
              <InputField
                label="업종"
                value={workplace.businessCategory}
                  onChange={() => {}}
              />
              <InputField
                label="사업장 규모"
                value={GRADE_LABELS[workplace.grade] ?? workplace.grade}
                  onChange={() => {}}
              />
            </div>
          </div>

          {/* 비고 */}
          {workplace.remark && (
            <TextAreaField
              label="비고"
              value={workplace.remark}
              onChange={() => {}}
            />
          )}
        </div>
      )}
    </div>
    </>
  );
};