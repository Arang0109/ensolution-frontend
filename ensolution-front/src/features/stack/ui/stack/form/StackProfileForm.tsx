import type { StackResponse, StackUpdateRequest } from '@/entities/stack/model';
import { SHAPE_LABELS, SHAPE_LABELS_OPTIONS, ORIENTATION_LABELS, ORIENTATION_LABELS_OPTIONS } from "@/entities/stack/model";

import { GRADE_LABELS, GRADE_LABELS_OPTIONS, type ValidationErrors } from "@shared/model";
import { InputField, TextAreaField, SelectField } from '@shared/ui';

interface StackProfileFormProps {
  stack: StackResponse;
  isEditMode: boolean;
  editForm: StackUpdateRequest;
  onChange: (
    name: keyof StackUpdateRequest,
    value: string
  ) => void;
  errors: ValidationErrors
}

export const StackProfileForm = ({
  stack,
  isEditMode,
  editForm,
  onChange,
  errors,
}: StackProfileFormProps) => {

  // 원형일 경우 true
  const isCircular = isEditMode ? editForm.shape === 'CIRCULAR' : stack.shape === 'CIRCULAR';

  return (
    <>
    <div>
      {isEditMode ? (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <InputField
              label="시설명"
              value={editForm.name ?? ""}
              onChange={(v) => onChange("name", v)}
              helperText={errors.name}
            />

            {/* Sems 번호 */}
            <InputField
              label="SEMS 번호"
              value={editForm.semsNumber ?? ""}
              onChange={(v) => onChange("name", v)}
            />

            {/* 배출시설 규모 */}
            <SelectField
              label='배출시설 규모'
              name='grade'
              value={editForm.grade ?? ""}
              onChange={(v) => onChange("grade", v)}
              options={GRADE_LABELS_OPTIONS}
              getOptionLabel={(g) => g.label}
              getOptionValue={(g) => g.value}
            />

            {/* 높이 */}
            <InputField
              label="높이 (m)"
              value={editForm.height ?? ""}
              onChange={(v) => onChange("height", v)}
            />

            {/* 형상 */}
            <SelectField
              label='형상'
              name='shape'
              value={editForm.shape ?? ""}
              onChange={(v) => onChange("shape", v)}
              options={SHAPE_LABELS_OPTIONS}
              getOptionLabel={(g) => g.label}
              getOptionValue={(g) => g.value}
            />

            {/* 지름 또는 가로/세로 길이 */}
            {isCircular ? (
              <InputField
                label="지름 (m)"
                name="horizontalLength"
                value={editForm.horizontalLength ?? ""}
                onChange={(v) => onChange("horizontalLength", v)}
              />
            ) : (
              <>
                <InputField
                  label="가로 (m)"
                  name="horizontalLength"
                  value={editForm.horizontalLength ?? ""}
                  onChange={(v) => onChange("horizontalLength", v)}
                />
                <InputField
                  label="세로 (m)"
                  name="verticalLength"
                  value={editForm.verticalLength ?? ""}
                  onChange={(v) => onChange("verticalLength", v)}
                />
              </>
            )}

            {/* 방향 */}
            <SelectField
              label='방향'
              name='orientation'
              value={editForm.orientation ?? ""}
              onChange={(v) => onChange("orientation", v)}
              options={ORIENTATION_LABELS_OPTIONS}
              getOptionLabel={(g) => g.label}
              getOptionValue={(g) => g.value}
            />
          </div>
          {/* 비고 */}
          <TextAreaField
            label="비고"
            value={editForm.remark ?? ""}
            onChange={(v) => onChange("remark", v)}
          />
        </div>
      ) : (
        <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* 시설명 */}
        <InputField
          label="시설명"
          value={stack.name ?? ""}
          onChange={() => {}}
        />

        {/* Sems 번호 */}
        <InputField
          label="SEMS 번호"
          value={stack.semsNumber ?? ""}
          onChange={() => {}}
        />

        {/* 배출시설 규모 */}
        <InputField
          label="종별"
          value={GRADE_LABELS[stack.grade] ?? stack.grade}
          onChange={() => {}}
        />

        <InputField
          label="높이"
          value={stack.height ?? ""}
          onChange={() => {}}
        />

        {/* 지름 또는 가로/세로 길이 */}
        {isCircular ? (
          <InputField
            label="지름"
            value={stack.horizontalLength ?? ""}
          onChange={() => {}}
          />  
        ) : (
          <>
            <InputField
              label="가로"
              value={stack.horizontalLength ?? ""}
              onChange={() => {}}
            />  
            <InputField
              label="세로"
              value={stack.verticalLength ?? ""}
              onChange={() => {}}
            />  
          </>
        )}

        {/* 형상 */}
        <InputField
          label="형상"
          value={SHAPE_LABELS[stack.shape] ?? '-'}
          onChange={() => {}}
        />  

        {/* 방향 */}
        <InputField
          label="방향"
          value={ORIENTATION_LABELS[stack.orientation] ?? '-'}
          onChange={() => {}}
        />  
      </div>
        {/* 비고 */}
        {stack.remark && (
          <TextAreaField
            label="비고"
            value={stack.remark}
          onChange={() => {}}
          />
        )}
      </div>
    )}
    </div>
    </>
  );
};
