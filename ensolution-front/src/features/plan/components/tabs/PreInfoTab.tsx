import { formatBizNumber } from "@shared/lib";
import { SHAPE_LABELS, ORIENTATION_LABELS } from "@stack/model";
import { GRADE_LABELS } from "@shared/model";

import type { PlanDetailResponse } from "@plan/model";

interface PreInfoTabProps {
  planDetail: PlanDetailResponse;
}

export const PreInfoTab = ({ planDetail }: PreInfoTabProps) => {
  const { measurementInfo } = planDetail;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Stack/Facility Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stack/Facility */}
        <section>
          <div className="border-l-4 border-neutral-600 pl-4 mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              측정시설(배출구) 정보
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-8">
            <div className="grid grid-cols-1 gap-6">
              {/* Basic Info */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  배출구명
                </label>
                <p className="text-lg font-bold text-gray-900">
                  {measurementInfo.client.stack.name}
                </p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  SEMS 번호
                </label>
                <p className="text-lg font-semibold text-gray-800 font-mono">
                  {measurementInfo.client.stack.semsNumber || "-"}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    굴뚝 모양
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold">
                      {SHAPE_LABELS[measurementInfo.client.stack.shape]}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    가로 길이
                  </label>
                  <p className="text-xl font-bold text-gray-900">
                    {measurementInfo.client.stack.horizontalLength}{" "}
                    <span className="text-sm font-normal text-gray-500">
                      m
                    </span>
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    세로 길이
                  </label>
                  <p className="text-xl font-bold text-gray-900">
                    {measurementInfo.client.stack.verticalLength}{" "}
                    <span className="text-sm font-normal text-gray-500">
                      m
                    </span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    굴뚝 방향
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold">
                      {ORIENTATION_LABELS[measurementInfo.client.stack.orientation]}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    높이
                  </label>
                  <p className="text-xl font-bold text-gray-900">
                    {measurementInfo.client.stack.height}{" "}
                    <span className="text-sm font-normal text-gray-500">
                      m
                    </span>
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    측정시설 규모
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold">
                      {GRADE_LABELS[measurementInfo.client.stack.grade]}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Workplace Section */}
        <section className="lg:col-span-2">
          <div className="border-l-4 border-neutral-600 pl-4 mb-4">
            <h2 className="text-2xl font-bold text-gray-900">사업장 정보</h2>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-green-100 p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  사업장명
                </label>
                <p className="text-lg font-bold text-gray-900">
                  {measurementInfo.client.company.workplaceName}
                </p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  사업장 주소
                </label>
                <p className="text-base text-gray-700 leading-relaxed">
                  {measurementInfo.client.company.address}
                </p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  사업자번호
                </label>
                <p className="text-lg font-semibold text-gray-800 font-mono">
                  {formatBizNumber(measurementInfo.client.company.bizNumber)}
                </p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  업종
                </label>
                <p className="text-base text-gray-800">
                  {measurementInfo.client.company.businessCategory}
                </p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  사업장 규모
                </label>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold">
                    {GRADE_LABELS[measurementInfo.client.company.grade]}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};