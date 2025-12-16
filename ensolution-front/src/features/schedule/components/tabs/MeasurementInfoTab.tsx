import { useState } from "react";
import { patchSchedule } from "@schedule/api/scheduleApi";
import { TEAM_LABEL, CYCLE_LABELS } from "@common/constants/labels";

import type { ScheduleDetailResponse } from "@schedule/model";
import type { Cycle } from "@common/model";

const STATUS_LABELS: Record<string, string> = {
  MEASURING: "측정 중",
  ANALYZING: "분석 중",
  COMPLETED: "완료",
  CANCELED: "취소",
};

const STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  MEASURING: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  ANALYZING: { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200" },
  COMPLETED: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
  CANCELED: { bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-200" },
};

const getCycleLabel = (cycle: Cycle): string => {
  return CYCLE_LABELS[cycle] || cycle;
};

interface MeasurementInfoTabProps {
  scheduleDetail: ScheduleDetailResponse;
}

export const MeasurementInfoTab = ({ scheduleDetail }: MeasurementInfoTabProps) => {
  const { schedule, measurements } = scheduleDetail;

  const [isEditing, setIsEditing] = useState(false);
  const [scheduleForm, setScheduleForm] = useState({
    measureDate: schedule.measureDate,
    measurementType: schedule.measurementType,
    teamId: schedule.teamId,
    stackId: schedule.stackId,
  });

  const handleSave = async () => {
    try {
      const result = await patchSchedule(schedule.id, scheduleForm);
      if (result.status) {
        alert("측정 일정이 수정되었습니다.");
        setIsEditing(false);
        window.location.reload();
      }
    } catch (error) {
      alert("측정 일정 수정에 실패했습니다.");
      console.error(error);
    }
  };

  const handleCancel = () => {
    setScheduleForm({
      measureDate: schedule.measureDate,
      measurementType: schedule.measurementType,
      teamId: schedule.teamId,
      stackId: schedule.stackId,
    });
    setIsEditing(false);
  };

  const statusColor = STATUS_COLORS[schedule.status] || STATUS_COLORS.MEASURING;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Measurement Items Section */}
      <div className="bg-white rounded-xl shadow-md border border-gray-20">
        <div className="border-b border-gray-200 px-8 py-6">
          <h2 className="text-2xl font-bold text-gray-900">측정항목</h2>
          <p className="text-sm text-gray-500 mt-1">
            총 {measurements.length}개의 측정항목
          </p>
        </div>

        <div className="p-8">
          {measurements.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="mt-4 text-lg font-medium text-gray-900">등록된 측정항목이 없습니다</p>
              <p className="mt-2 text-sm text-gray-500">측정항목을 추가해주세요</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      No.
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      오염물질명 (한글)
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      오염물질명 (영문)
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      측정주기
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      배출허용기준
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      분석방법
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {measurements.map((measurement, index) => (
                    <tr key={measurement.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">
                          {measurement.stackMeasurement.pollutant.nameKr}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {measurement.stackMeasurement.pollutant.nameEn}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {getCycleLabel(measurement.stackMeasurement.cycle)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {measurement.stackMeasurement.allowance
                          ? `${measurement.stackMeasurement.allowance} ppm`
                          : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {measurement.stackMeasurement.pollutant.method}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-gray-200  mt-6">
        {/* Header */}
        <div className="border-b border-gray-200 px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">측정 일정 정보</h2>
              <p className="text-sm text-gray-500 mt-1">
                일정 등록일: {new Date(schedule.createdAt).toLocaleString('ko-KR')}
              </p>
            </div>

            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-sm hover:shadow font-semibold"
              >
                수정
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-sm hover:shadow font-semibold"
                >
                  저장
                </button>
                <button
                  onClick={handleCancel}
                  className="px-6 py-2.5 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all shadow-sm hover:shadow font-semibold"
                >
                  취소
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Status - Always Read Only */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                현재 상태
              </label>
              <div className={`inline-flex items-center px-6 py-3 rounded-xl border-2 ${statusColor.bg} ${statusColor.text} ${statusColor.border}`}>
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-lg font-bold">{STATUS_LABELS[schedule.status]}</span>
              </div>
            </div>

            {/* Measure Date */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
                측정일
              </label>
              {isEditing ? (
                <input
                  type="date"
                  value={new Date(scheduleForm.measureDate).toISOString().split('T')[0]}
                  onChange={(e) => setScheduleForm(prev => ({ ...prev, measureDate: new Date(e.target.value) }))}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                />
              ) : (
                <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-lg font-semibold text-gray-900">
                    {new Date(schedule.measureDate).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      weekday: 'short'
                    })}
                  </p>
                </div>
              )}
            </div>

            {/* Measurement Type */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
                측정 종류
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={scheduleForm.measurementType}
                  onChange={(e) => setScheduleForm(prev => ({ ...prev, measurementType: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                  placeholder="예: 정기측정, 수시측정"
                />
              ) : (
                <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-lg font-semibold text-gray-900">{schedule.measurementType}</p>
                </div>
              )}
            </div>

            {/* Team */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
                담당 팀
              </label>
              {isEditing ? (
                <select
                  value={scheduleForm.teamId}
                  onChange={(e) => setScheduleForm(prev => ({ ...prev, teamId: Number(e.target.value) }))}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base bg-white"
                >
                  {Object.entries(TEAM_LABEL).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-lg font-semibold text-gray-900">
                    {TEAM_LABEL[schedule.teamId as keyof typeof TEAM_LABEL]}
                  </p>
                </div>
              )}
            </div>

            {/* Schedule ID - Always Read Only */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
                일정 ID
              </label>
              <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-lg font-semibold text-gray-900 font-mono">{schedule.id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
