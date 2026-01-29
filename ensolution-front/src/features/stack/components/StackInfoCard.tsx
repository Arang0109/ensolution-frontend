import React from 'react';

import { GRADE_LABELS, SHAPE_LABELS, ORIENTATION_LABELS } from '@stack/model';
import { formatDate } from '@/shared/lib/formatter/formatters';
import type { Grade, Shape, Orientation } from '@/shared/types/common.types';

interface StackInfoCardProps {
  stack: {
    name: string;
    semsNumber: string;
    grade: Grade;
    height: string;
    horizontalLength: string;
    verticalLength: string;
    shape: Shape;
    orientation: Orientation;
    remark?: string | null;
    createdAt: Date;
  };
  isEditMode: boolean;
  editForm: {
    name: string;
    semsNumber: string;
    grade: Grade;
    height: string;
    horizontalLength: string;
    verticalLength: string;
    shape: Shape;
    orientation: Orientation;
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

const InfoInput: React.FC<InfoInputProps> = ({ label, ...props }) => (
  <div>
    <label className="text-sm font-medium text-gray-500">{label}</label>
    <input
      {...props}
      className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
    />
  </div>
);

const InfoTextarea: React.FC<InfoTextareaProps> = ({ label, ...props }) => (
  <div>
    <label className="text-sm font-medium text-gray-500">{label}</label>
    <textarea
      {...props}
      className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
      rows={3}
    />
  </div>
);

const InfoSelect: React.FC<InfoSelectProps> = ({ label, options, ...props }) => (
  <div>
    <label className="text-sm font-medium text-gray-500">{label}</label>
    <select
      {...props}
      className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

const ReadOnlyPair: React.FC<ReadOnlyPairProps> = ({ label, value, multiLine = false }) => (
  <div>
    <label className="text-sm font-medium text-gray-500">{label}</label>
    <p className={`text-base text-gray-800 mt-1 ${multiLine ? 'whitespace-pre-wrap' : ''}`}>
      {value}
    </p>
  </div>
);

export const StackInfoCard: React.FC<StackInfoCardProps> = ({
  stack,
  isEditMode,
  editForm,
  onChange,
}) => {
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

  // 원형일 때 지름 입력 시 horizontalLength와 verticalLength 모두 업데이트
  const handleDiameterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const syntheticEvent = {
      target: {
        name: 'horizontalLength',
        value: value,
      },
    } as React.ChangeEvent<HTMLInputElement>;

    onChange(syntheticEvent);

    // verticalLength도 동일하게 설정
    const verticalEvent = {
      target: {
        name: 'verticalLength',
        value: value,
      },
    } as React.ChangeEvent<HTMLInputElement>;

    onChange(verticalEvent);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-neutral-900">기본 정보</h2>

      <div className="space-y-4">
        {isEditMode ? (
          <>
            {/* 시설명 / Sems 번호 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoInput
                label="시설명 *"
                name="name"
                value={editForm.name}
                onChange={onChange}
              />
              <InfoInput
                label="Sems 번호 *"
                name="semsNumber"
                value={editForm.semsNumber}
                onChange={onChange}
              />
            </div>

            {/* 배출시설 규모 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoSelect
                label="배출시설 규모 *"
                name="grade"
                value={editForm.grade}
                onChange={onChange}
                options={gradeOptions}
              />
              <div>
                <label className="text-sm font-medium text-gray-500">등록일</label>
                <p className="text-base text-gray-800 mt-1">
                  {formatDate(stack.createdAt)}
                </p>
              </div>
            </div>

            {/* 높이 / 지름 또는 가로/세로 길이 */}
            {isCircular ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoInput
                  label="높이 (m) *"
                  name="height"
                  value={editForm.height}
                  onChange={onChange}
                  type="text"
                />
                <InfoInput
                  label="지름 (m) *"
                  name="diameter"
                  value={editForm.horizontalLength}
                  onChange={handleDiameterChange}
                  type="text"
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InfoInput
                  label="높이 (m) *"
                  name="height"
                  value={editForm.height}
                  onChange={onChange}
                  type="text"
                />
                <InfoInput
                  label="가로 길이 (m) *"
                  name="horizontalLength"
                  value={editForm.horizontalLength}
                  onChange={onChange}
                  type="text"
                />
                <InfoInput
                  label="세로 길이 (m) *"
                  name="verticalLength"
                  value={editForm.verticalLength}
                  onChange={onChange}
                  type="text"
                />
              </div>
            )}

            {/* 형상 / 방향 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoSelect
                label="형상 *"
                name="shape"
                value={editForm.shape}
                onChange={onChange}
                options={shapeOptions}
              />
              <InfoSelect
                label="방향 *"
                name="orientation"
                value={editForm.orientation}
                onChange={onChange}
                options={orientationOptions}
              />
            </div>

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
            {/* 시설명 / Sems 번호 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ReadOnlyPair label="시설명" value={stack.name} />
              <ReadOnlyPair label="Sems 번호" value={stack.semsNumber} />
            </div>

            {/* 배출시설 규모 / 등록일 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">배출시설 규모</label>
                <p className="text-base text-gray-800 mt-1">
                  <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-800">
                    {GRADE_LABELS[stack.grade] ?? stack.grade}
                  </span>
                </p>
              </div>
              <ReadOnlyPair label="등록일" value={formatDate(stack.createdAt)} />
            </div>

            {/* 높이 / 지름 또는 가로/세로 길이 */}
            {isCircular ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ReadOnlyPair label="높이" value={`${stack.height} m`} />
                <ReadOnlyPair label="지름" value={`${stack.horizontalLength} m`} />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ReadOnlyPair label="높이" value={`${stack.height} m`} />
                <ReadOnlyPair label="가로 길이" value={`${stack.horizontalLength} m`} />
                <ReadOnlyPair label="세로 길이" value={`${stack.verticalLength} m`} />
              </div>
            )}

            {/* 형상 / 방향 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ReadOnlyPair
                label="형상"
                value={SHAPE_LABELS[stack.shape] ?? stack.shape}
              />
              <ReadOnlyPair
                label="방향"
                value={ORIENTATION_LABELS[stack.orientation] ?? stack.orientation}
              />
            </div>

            {/* 비고 */}
            {stack.remark && (
              <ReadOnlyPair label="비고" value={stack.remark} multiLine />
            )}
          </>
        )}
      </div>
    </div>
  );
};
