import { useState } from "react";
import { patchPlan, deleteMeasurement } from "@plan/api/planApi";
import { CYCLE_LABELS } from "@stack/model";
import { TeamType } from "@agency/model";
import { MdDelete } from "react-icons/md";

import type { PlanDetailResponse } from "@plan/model";
import type { Cycle } from "@/shared/model";
import { Button } from "@/shared/ui";
import { AddMeasurementModal } from "../AddMeasurementModal";

const getCycleLabel = (cycle: Cycle): string => {
  return CYCLE_LABELS[cycle] || cycle;
};

interface MeasurementInfoTabProps {
  planDetail: PlanDetailResponse;
}

export const MeasurementInfoTab = ({ planDetail }: MeasurementInfoTabProps) => {
  const { plan, measurements, stack } = planDetail;

  const [isEditing, setIsEditing] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [planForm, setPlanForm] = useState({
    measureDate: plan.measureDate,
    measurementType: plan.measurementType,
    teamId: plan.teamId,
    stackId: plan.stackId,
  });

  const handleSave = async () => {
    try {
      const result = await patchPlan(plan.id, planForm);
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
    setPlanForm({
      measureDate: plan.measureDate,
      measurementType: plan.measurementType,
      teamId: plan.teamId,
      stackId: plan.stackId,
    });
    setIsEditing(false);
  };

  const handleDeleteMeasurement = async (measurementId: number) => {
    if (!window.confirm("이 측정항목을 삭제하시겠습니까?")) {
      return;
    }

    try {
      const result = await deleteMeasurement(plan.id, measurementId);
      if (result.status) {
        alert("측정항목이 삭제되었습니다.");
        window.location.reload();
      }
    } catch (error) {
      alert("측정항목 삭제에 실패했습니다.");
      console.error(error);
    }
  };

  const handleAddSuccess = () => {
    window.location.reload();
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* 2-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Measurement Items Section */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200">
          <div className="border-b border-gray-200 px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">측정항목</h2>
                <p className="text-sm text-gray-500 mt-1">
                  총 {measurements.length}개의 측정항목
                </p>
              </div>
              <Button
                onClick={() => setShowAddModal(true)}
                label="추가"
              />
            </div>
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
                      <th className="px-1 py-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        No.
                      </th>
                      <th className="px-6 py-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        오염물질명
                      </th>
                      <th className="px-1 py-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        측정주기
                      </th>
                      <th className="px-6 py-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        배출허용기준
                      </th>
                      <th className="px-6 py-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        분석방법
                      </th>
                      <th className="px-2 py-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        삭제
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {measurements.map((measurement, index) => (
                      <tr key={measurement.id} className="hover:bg-gray-50 transition-colors">
                        <td className="text-center px-1 py-2 whitespace-nowrap text-sm text-gray-900">
                          {index + 1}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900">
                            {measurement.stackMeasurement.pollutant.nameKr} {measurement.stackMeasurement.pollutant.nameEn}
                          </div>
                        </td>
                        <td className="text-center px-1 py-2 whitespace-nowrap">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {getCycleLabel(measurement.stackMeasurement.cycle)}
                          </span>
                        </td>
                        <td className="text-center px-6 py-2 whitespace-nowrap text-sm text-gray-900">
                          {measurement.stackMeasurement.allowance
                            ? `${measurement.stackMeasurement.allowance} ppm`
                            : '-'}
                        </td>
                        <td className="text-center px-6 py-2 whitespace-nowrap text-sm text-gray-600">
                          {measurement.stackMeasurement.pollutant.method}
                        </td>
                        <td className="text-center px-2 py-2 whitespace-nowrap">
                          <button
                            onClick={() => handleDeleteMeasurement(measurement.id)}
                            className="text-red-600 hover:text-red-800 transition-colors p-1"
                            title="삭제"
                          >
                            <MdDelete size={20} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Plan Information Section */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200">
        {/* Header */}
        <div className="border-b border-gray-200 px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">측정 일정 정보</h2>
            </div>

            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                label="수정" />
            ) : (
              <div className="flex gap-3">
                <Button
                  onClick={handleSave}
                  label="저장" />
                <Button
                  onClick={handleCancel}
                  label="취소" />
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Measure Date */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
                측정일
              </label>
              {isEditing ? (
                <input
                  type="date"
                  value={new Date(planForm.measureDate).toISOString().split('T')[0]}
                  onChange={(e) => setPlanForm(prev => ({ ...prev, measureDate: new Date(e.target.value) }))}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                />
              ) : (
                <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-900">
                    {new Date(plan.measureDate).toLocaleDateString('ko-KR', {
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
                  value={planForm.measurementType}
                  onChange={(e) => setPlanForm(prev => ({ ...prev, measurementType: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                  placeholder="예: 정기측정, 수시측정"
                />
              ) : (
                <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-900">{plan.measurementType}</p>
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
                  value={planForm.teamId}
                  onChange={(e) => setPlanForm(prev => ({ ...prev, teamId: Number(e.target.value) }))}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base bg-white"
                >
                  {Object.entries(TeamType).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                  
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Add Measurement Modal */}
      {showAddModal && (
        <AddMeasurementModal
          planId={plan.id}
          stackId={stack.stack.id}
          existingMeasurementIds={measurements.map((m) => m.stackMeasurement.id)}
          onClose={() => setShowAddModal(false)}
          onSuccess={handleAddSuccess}
        />
      )}
    </div>
  );
};
