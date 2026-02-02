import type { StackResponse, StackUpdateRequest } from '@stack/model';

import { formatDateTime } from '@/shared/lib/formatter/dateFormatter';
import { SHAPE_LABELS, ORIENTATION_LABELS } from "@stack/model";
import { GRADE_LABELS } from "@shared/model";
import { SectionHeader, InputField, TextAreaField, SelectField } from '@shared/ui';

interface StackSidebarProps {
  stack: StackResponse;
  preventionCount: number;
  facilityCount: number;
  targetCount: number;
  measurementCount: number;
  isEditMode: boolean;
  editForm: StackUpdateRequest;
  onChange: (
    name: keyof StackUpdateRequest,
    value: string
  ) => void;
}

export const StackSidebar = ({
  stack,
  preventionCount,
  facilityCount,
  targetCount,
  measurementCount,
  isEditMode,
  editForm,
  onChange,
}: StackSidebarProps) => {
  const gradeOptions = Object.entries(GRADE_LABELS).map(([value, label]) => ({
    value,
    label,
  }));

  const shapeOptions = Object.entries(SHAPE_LABELS).map(([value, label]) => ({
    value,
    label,
  }));

  const orientationOptions = Object.entries(ORIENTATION_LABELS).map(([value, label]) => ({
    value,
    label,
  }));

  // 원형일 경우 true
  const isCircular = isEditMode ? editForm.shape === 'CIRCULAR' : stack.shape === 'CIRCULAR';

  return (
    <div className="space-y-6">
      {/* 기본 정보 */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-md">
        <SectionHeader title="기본정보" />
        <div className="space-y-4">
          {isEditMode ? (
            <>
              {/* 시설명 */}
              <InputField
                label="시설명"
                required={true}
                value={editForm.name}
                onChange={(v) => onChange("name", v)}
              />

              {/* Sems 번호 */}
              <InputField
                label="SEMS 번호"
                required={true}
                value={editForm.semsNumber}
                onChange={(v) => onChange("name", v)}
              />

              {/* 배출시설 규모 */}
              <SelectField
                label='배출시설 규모'
                name='grade'
                value={editForm.grade}
                onChange={(v) => onChange("grade", v)}
                options={gradeOptions}
              />

              {/* 높이 */}
              <InputField
                label="높이 (m)"
                value={editForm.height}
                onChange={(v) => onChange("name", v)}
              />

              {/* 형상 */}
              <SelectField
                label='형상'
                name='shape'
                value={editForm.shape}
                onChange={(v) => onChange("shape", v)}
                options={shapeOptions}
              />

              {/* 지름 또는 가로/세로 길이 */}
              {isCircular ? (
                <InputField
                  label="지름 (m)"
                  name="horizontalLength"
                  value={editForm.horizontalLength}
                  onChange={(v) => onChange("name", v)}
                />
              ) : (
                <>
                  <InputField
                    label="가로 (m)"
                    name="horizontalLength"
                    value={editForm.horizontalLength}
                    onChange={(v) => onChange("name", v)}
                  />
                  <InputField
                    label="세로 (m)"
                    name="verticalLength"
                    value={editForm.verticalLength}
                    onChange={(v) => onChange("name", v)}
                  />
                </>
              )}

              {/* 방향 */}
              <SelectField
                label='방향'
                name='orientation'
                value={editForm.orientation}
                onChange={(v) => onChange("orientation", v)}
                options={orientationOptions}
              />

              {/* 비고 */}
              <TextAreaField
                label="비고"
                value={editForm.remark}
                onChange={(v) => onChange("remark", v)}
              />
            </>
          ) : (
            <>
              {/* 시설명 */}
              <InputField
                label="시설명"
                value={stack.name}
                readOnly
              />

              {/* Sems 번호 */}
              <InputField
                label="SEMS 번호"
                value={stack.semsNumber}
                readOnly
              />

              {/* 배출시설 규모 */}
              <InputField
                label="종별"
                value={GRADE_LABELS[stack.grade] ?? stack.grade}
                readOnly
              />

              <InputField
                label="높이"
                value={stack.height}
                readOnly
              />

              {/* 지름 또는 가로/세로 길이 */}
              {isCircular ? (
                <InputField
                  label="지름"
                  value={stack.horizontalLength}
                  readOnly
                />  
              ) : (
                <>
                  <InputField
                    label="가로"
                    value={stack.horizontalLength}
                    readOnly
                  />  
                  <InputField
                    label="세로"
                    value={stack.verticalLength}
                    readOnly
                  />  
                </>
              )}

              {/* 형상 */}
              <InputField
                label="형상"
                value={SHAPE_LABELS[editForm.shape] ?? '-'}
                readOnly
              />  

              {/* 방향 */}
              <InputField
                label="방향"
                value={ORIENTATION_LABELS[editForm.orientation] ?? '-'}
                readOnly
              />  

              {/* 비고 */}
              {stack.remark && (
                <TextAreaField
                  label="비고"
                  value={stack.remark}
                  readOnly
                />
              )}
            </>
          )}
        </div>
      </div>

      {/* 통계 */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-neutral-900">통계</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-neutral-600">측정물질 수</span>
            <span className="text-lg font-bold text-primary-600">{measurementCount}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-neutral-600">방지시설 수</span>
            <span className="text-lg font-bold text-neutral-700">{preventionCount}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-neutral-600">배출시설 수</span>
            <span className="text-lg font-bold text-neutral-700">{facilityCount}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-neutral-600">제거대상물질 수</span>
            <span className="text-lg font-bold text-neutral-700">{targetCount}</span>
          </div>
        </div>
      </div>

      {/* 최근 수정 */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-neutral-900">최근 수정</h2>
        <p className="text-sm text-gray-600">
          {formatDateTime(stack.modifiedAt)}
        </p>
      </div>
    </div>
  );
};
