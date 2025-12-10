import { useState } from "react";
import type { ScheduleDetailResponse } from "@schedule/model";
import type { StackUpdateRequest } from "@/features/stack/model";
import { patchStack } from "@/features/stack/api/stackApi";
import { patchSchedule } from "@schedule/api/scheduleApi";
import { formatBizNumber } from "@/common/utils/formatters";
import { TEAM_LABEL, GRADE_LABELS, SHAPE_LABELS, ORIENTATION_LABELS } from "@/common/constants/labels";
import type { Shape, Orientation, Grade } from "@/common/model/common.types";

const STATUS_LABELS: Record<string, string> = {
  MEASURING: "측정 중",
  ANALYZING: "분석 중",
  COMPLETED: "완료",
  CANCELED: "취소",
};

interface PreInfoTabProps {
  scheduleDetail: ScheduleDetailResponse;
}

export const PreInfoTab = ({ scheduleDetail }: PreInfoTabProps) => {
  const { schedule, stack, workplace, company } = scheduleDetail;

  // Stack Edit State
  const [isEditingStack, setIsEditingStack] = useState(false);
  const [stackForm, setStackForm] = useState<StackUpdateRequest>({
    name: stack.stack.name,
    semsNumber: stack.stack.semsNumber,
    shape: stack.stack.shape,
    orientation: stack.stack.orientation,
    grade: stack.stack.grade,
    height: stack.stack.height,
    horizontalLength: stack.stack.horizontalLength,
    verticalLength: stack.stack.verticalLength,
    remark: stack.stack.remark,
  });

  // Schedule Edit State
  const [isEditingSchedule, setIsEditingSchedule] = useState(false);
  const [scheduleForm, setScheduleForm] = useState({
    measureDate: schedule.measureDate,
    measurementType: schedule.measurementType,
    teamId: schedule.teamId,
    stackId: schedule.stackId,
  });

  // Stack Handlers
  const handleStackSave = async () => {
    try {
      const result = await patchStack(stack.stack.id, stackForm);
      if (result.status) {
        alert("배출구 정보가 수정되었습니다.");
        setIsEditingStack(false);
        window.location.reload();
      }
    } catch (error) {
      alert("배출구 정보 수정에 실패했습니다.");
      console.error(error);
    }
  };

  // Schedule Handlers
  const handleScheduleSave = async () => {
    try {
      const result = await patchSchedule(schedule.id, scheduleForm);
      if (result.status) {
        alert("일정 정보가 수정되었습니다.");
        setIsEditingSchedule(false);
        window.location.reload();
      }
    } catch (error) {
      alert("일정 정보 수정에 실패했습니다.");
      console.error(error);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Company Info - Editable */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">업체 정보</h2>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  업체명
                </label>
                <p className="text-gray-800 font-medium">{company.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  사업자번호
                </label>
                <p className="text-gray-800 font-medium">{formatBizNumber(company.bizNumber)}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                주소
              </label>
              <p className="text-gray-800 font-medium">{company.address}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                대표자명
              </label>
              <p className="text-gray-800 font-medium">{company.ceoName}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                비고
              </label>
              <p className="text-gray-800 font-medium">{company.remark || "-"}</p>
            </div>
          </div>
        </div>

        {/* Workplace Info - Editable */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">사업장 정보</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                사업장명
              </label>
              <p className="text-gray-800 font-medium">{workplace.name}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                사업장 주소
              </label>
              <p className="text-gray-800 font-medium">{workplace.address}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  사업자번호
                </label>
                <p className="text-gray-800 font-medium">{formatBizNumber(workplace.bizNumber)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  업종
                </label>
                <p className="text-gray-800 font-medium">{workplace.businessCategory}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  등급
                </label>
                <p className="text-gray-800 font-medium">{GRADE_LABELS[workplace.grade]}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                비고
              </label>
              <p className="text-gray-800 font-medium">{workplace.remark || "-"}</p>
            </div>
          </div>
        </div>

        {/* Stack Info - Editable */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">배출구 정보</h2>
            {!isEditingStack ? (
              <button
                onClick={() => setIsEditingStack(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                수정
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleStackSave}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                >
                  저장
                </button>
                <button
                  onClick={() => {
                    setStackForm({
                      name: stack.stack.name,
                      semsNumber: stack.stack.semsNumber,
                      shape: stack.stack.shape,
                      orientation: stack.stack.orientation,
                      grade: stack.stack.grade,
                      height: stack.stack.height,
                      horizontalLength: stack.stack.horizontalLength,
                      verticalLength: stack.stack.verticalLength,
                      remark: stack.stack.remark,
                    });
                    setIsEditingStack(false);
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                >
                  취소
                </button>
              </div>
            )}
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  배출구명
                </label>
                {isEditingStack ? (
                  <input
                    type="text"
                    value={stackForm.name}
                    onChange={(e) => setStackForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{stack.stack.name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  SEMS 번호
                </label>
                {isEditingStack ? (
                  <input
                    type="text"
                    value={stackForm.semsNumber || ""}
                    onChange={(e) => setStackForm(prev => ({ ...prev, semsNumber: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{stack.stack.semsNumber || "-"}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  배출구 모양
                </label>
                {isEditingStack ? (
                  <select
                    value={stackForm.shape}
                    onChange={(e) => setStackForm(prev => ({ ...prev, shape: e.target.value as Shape }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="CIRCULAR">{SHAPE_LABELS.CIRCULAR}</option>
                    <option value="RECTANGULAR">{SHAPE_LABELS.RECTANGULAR}</option>
                    <option value="OTHER">{SHAPE_LABELS.OTHER}</option>
                  </select>
                ) : (
                  <p className="text-gray-800 font-medium">{SHAPE_LABELS[stack.stack.shape] || "-"}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  배출구 방향
                </label>
                {isEditingStack ? (
                  <select
                    value={stackForm.orientation}
                    onChange={(e) => setStackForm(prev => ({ ...prev, orientation: e.target.value as Orientation }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="VERTICAL">{ORIENTATION_LABELS.VERTICAL}</option>
                    <option value="HORIZONTAL">{ORIENTATION_LABELS.HORIZONTAL}</option>
                  </select>
                ) : (
                  <p className="text-gray-800 font-medium">{ORIENTATION_LABELS[stack.stack.orientation] || "-"}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  등급
                </label>
                {isEditingStack ? (
                  <select
                    value={stackForm.grade}
                    onChange={(e) => setStackForm(prev => ({ ...prev, grade: e.target.value as Grade }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="TYPE_1">{GRADE_LABELS.TYPE_1}</option>
                    <option value="TYPE_2">{GRADE_LABELS.TYPE_2}</option>
                    <option value="TYPE_3">{GRADE_LABELS.TYPE_3}</option>
                    <option value="TYPE_4">{GRADE_LABELS.TYPE_4}</option>
                    <option value="TYPE_5">{GRADE_LABELS.TYPE_5}</option>
                  </select>
                ) : (
                  <p className="text-gray-800 font-medium">{GRADE_LABELS[stack.stack.grade]}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  높이 (m)
                </label>
                {isEditingStack ? (
                  <input
                    type="text"
                    value={stackForm.height}
                    onChange={(e) => setStackForm(prev => ({ ...prev, height: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{stack.stack.height}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  가로 길이 (m)
                </label>
                {isEditingStack ? (
                  <input
                    type="text"
                    value={stackForm.horizontalLength}
                    onChange={(e) => setStackForm(prev => ({ ...prev, horizontalLength: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{stack.stack.horizontalLength}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  세로 길이 (m)
                </label>
                {isEditingStack ? (
                  <input
                    type="text"
                    value={stackForm.verticalLength}
                    onChange={(e) => setStackForm(prev => ({ ...prev, verticalLength: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{stack.stack.verticalLength}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                비고
              </label>
              {isEditingStack ? (
                <textarea
                  value={stackForm.remark}
                  onChange={(e) => setStackForm(prev => ({ ...prev, remark: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-800 font-medium">{stack.stack.remark || "-"}</p>
              )}
            </div>
          </div>
        </div>

        {/* Schedule Info - Editable */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">측정 일정 정보</h2>
            {!isEditingSchedule ? (
              <button
                onClick={() => setIsEditingSchedule(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                수정
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleScheduleSave}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                >
                  저장
                </button>
                <button
                  onClick={() => {
                    setScheduleForm({
                      measureDate: schedule.measureDate,
                      measurementType: schedule.measurementType,
                      teamId: schedule.teamId,
                      stackId: schedule.stackId,
                    });
                    setIsEditingSchedule(false);
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                >
                  취소
                </button>
              </div>
            )}
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  측정일
                </label>
                {isEditingSchedule ? (
                  <input
                    type="date"
                    value={new Date(scheduleForm.measureDate).toISOString().split('T')[0]}
                    onChange={(e) => setScheduleForm(prev => ({ ...prev, measureDate: new Date(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">
                    {new Date(schedule.measureDate).toLocaleDateString('ko-KR')}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  측정 종류
                </label>
                {isEditingSchedule ? (
                  <input
                    type="text"
                    value={scheduleForm.measurementType}
                    onChange={(e) => setScheduleForm(prev => ({ ...prev, measurementType: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{schedule.measurementType}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  팀
                </label>
                {isEditingSchedule ? (
                  <select
                    value={scheduleForm.teamId}
                    onChange={(e) => setScheduleForm(prev => ({ ...prev, teamId: Number(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {Object.entries(TEAM_LABEL).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="text-gray-800 font-medium">{TEAM_LABEL[schedule.teamId as keyof typeof TEAM_LABEL]}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  상태
                </label>
                <p className="text-gray-800 font-medium">{STATUS_LABELS[schedule.status]}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                등록일: {new Date(schedule.createdAt).toLocaleString('ko-KR')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Status Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">현재 상태</h3>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">진행 상태</p>
              <p className="text-lg font-semibold text-blue-700">
                {STATUS_LABELS[schedule.status]}
              </p>
            </div>
          </div>
        </div>

        {/* Stack Summary */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">배출구 요약</h3>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-gray-600">배출구명</p>
              <p className="font-medium text-gray-800">{stack.stack.name}</p>
            </div>
            <div>
              <p className="text-gray-600">SEMS 번호</p>
              <p className="font-medium text-gray-800">{stack.stack.semsNumber || "-"}</p>
            </div>
            <div>
              <p className="text-gray-600">등급</p>
              <p className="font-medium text-gray-800">{stack.stack.grade || "-"}</p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">추가 정보</h3>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-gray-600">일정 ID</p>
              <p className="font-medium text-gray-800">{schedule.id}</p>
            </div>
            <div>
              <p className="text-gray-600">등록일</p>
              <p className="font-medium text-gray-800">
                {new Date(schedule.createdAt).toLocaleDateString('ko-KR')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
