import React from 'react';
import { useNavigate } from 'react-router-dom';

import { formatDateTime, formatDate } from '@common/utils/formatters';
import { GRADE_LABELS, SHAPE_LABELS, ORIENTATION_LABELS } from '@common/constants';
import type { Grade, Shape, Orientation } from '@common/model/common.types';

interface StackSidebarProps {
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
    modifiedAt: Date | string;
    workplaceId: number;
  };
  preventionCount: number;
  facilityCount: number;
  targetCount: number;
  measurementCount: number;
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
      className="mt-1 w-full px-3 py-2 border border-sand-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-transparent"
    />
  </div>
);

const InfoTextarea: React.FC<InfoTextareaProps> = ({ label, ...props }) => (
  <div>
    <label className="text-sm font-medium text-gray-500">{label}</label>
    <textarea
      {...props}
      className="mt-1 w-full px-3 py-2 border border-sand-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-transparent"
      rows={3}
    />
  </div>
);

const InfoSelect: React.FC<InfoSelectProps> = ({ label, options, ...props }) => (
  <div>
    <label className="text-sm font-medium text-gray-500">{label}</label>
    <select
      {...props}
      className="mt-1 w-full px-3 py-2 border border-sand-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-transparent"
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
  const navigate = useNavigate();

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
    <div className="space-y-6">
      {/* 기본 정보 */}
      <div className="bg-white border border-sand-200 rounded-lg p-6 shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-brown-900">기본 정보</h2>
        <div className="space-y-4">
          {isEditMode ? (
            <>
              {/* 시설명 */}
              <InfoInput
                label="시설명 *"
                name="name"
                value={editForm.name}
                onChange={onChange}
              />

              {/* Sems 번호 */}
              <InfoInput
                label="Sems 번호 *"
                name="semsNumber"
                value={editForm.semsNumber}
                onChange={onChange}
              />

              {/* 배출시설 규모 */}
              <InfoSelect
                label="배출시설 규모 *"
                name="grade"
                value={editForm.grade}
                onChange={onChange}
                options={gradeOptions}
              />

              {/* 높이 */}
              <InfoInput
                label="높이 (m) *"
                name="height"
                value={editForm.height}
                onChange={onChange}
                type="text"
              />

              {/* 지름 또는 가로/세로 길이 */}
              {isCircular ? (
                <InfoInput
                  label="지름 (m) *"
                  name="diameter"
                  value={editForm.horizontalLength}
                  onChange={handleDiameterChange}
                  type="text"
                />
              ) : (
                <>
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
                </>
              )}

              {/* 형상 */}
              <InfoSelect
                label="형상 *"
                name="shape"
                value={editForm.shape}
                onChange={onChange}
                options={shapeOptions}
              />

              {/* 방향 */}
              <InfoSelect
                label="방향 *"
                name="orientation"
                value={editForm.orientation}
                onChange={onChange}
                options={orientationOptions}
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
              {/* 시설명 */}
              <ReadOnlyPair label="시설명" value={stack.name} />

              {/* Sems 번호 */}
              <ReadOnlyPair label="Sems 번호" value={stack.semsNumber} />

              {/* 배출시설 규모 */}
              <div>
                <label className="text-sm font-medium text-gray-500">배출시설 규모</label>
                <p className="text-base text-gray-800 mt-1">
                  <span>{GRADE_LABELS[stack.grade] ?? stack.grade}</span>
                </p>
              </div>

              {/* 높이 */}
              <ReadOnlyPair label="높이" value={`${stack.height} m`} />

              {/* 지름 또는 가로/세로 길이 */}
              {isCircular ? (
                <ReadOnlyPair label="지름" value={`${stack.horizontalLength} m`} />
              ) : (
                <>
                  <ReadOnlyPair label="가로 길이" value={`${stack.horizontalLength} m`} />
                  <ReadOnlyPair label="세로 길이" value={`${stack.verticalLength} m`} />
                </>
              )}

              {/* 형상 */}
              <ReadOnlyPair
                label="형상"
                value={SHAPE_LABELS[stack.shape] ?? stack.shape}
              />

              {/* 방향 */}
              <ReadOnlyPair
                label="방향"
                value={ORIENTATION_LABELS[stack.orientation] ?? stack.orientation}
              />

              {/* 비고 */}
              {stack.remark && (
                <ReadOnlyPair label="비고" value={stack.remark} multiLine />
              )}

              {/* 등록일 */}
              <ReadOnlyPair label="등록일" value={formatDate(stack.createdAt)} />
            </>
          )}
        </div>
      </div>

      {/* 사업장 정보 */}
      <div className="bg-white border border-sand-200 rounded-lg p-6 shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-brown-900">사업장 정보</h2>
        <button
          onClick={() => navigate(`/client/workplace/${stack.workplaceId}`)}
          className="w-full px-4 py-2 bg-gradient-to-r from-brown-500 to-brown-600 text-white rounded-lg hover:from-brown-600 hover:to-brown-700 transition-colors text-sm shadow-md"
        >
          사업장 상세 보기
        </button>
      </div>

      {/* 통계 */}
      <div className="bg-white border border-sand-200 rounded-lg p-6 shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-brown-900">통계</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-brown-600">측정물질 수</span>
            <span className="text-lg font-bold text-terracotta-600">{measurementCount}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-brown-600">방지시설 수</span>
            <span className="text-lg font-bold text-brown-700">{preventionCount}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-brown-600">배출시설 수</span>
            <span className="text-lg font-bold text-brown-700">{facilityCount}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-brown-600">제거대상물질 수</span>
            <span className="text-lg font-bold text-brown-700">{targetCount}</span>
          </div>
        </div>
      </div>

      {/* 최근 수정 */}
      <div className="bg-white border border-sand-200 rounded-lg p-6 shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-brown-900">최근 수정</h2>
        <p className="text-sm text-gray-600">
          {formatDateTime(stack.modifiedAt)}
        </p>
      </div>
    </div>
  );
};
