import type { ScheduleDetailResponse } from "@schedule/model";

interface MeasurementDataTabProps {
  scheduleDetail: ScheduleDetailResponse;
}

export const MeasurementDataTab = ({ scheduleDetail }: MeasurementDataTabProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">측정 데이터 입력</h2>

        <div className="space-y-6">
          {/* 측정 환경 정보 */}
          <div>
            <h3 className="text-lg font-medium mb-3 text-gray-700">측정 환경</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  측정 일시
                </label>
                <input
                  type="datetime-local"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  대기압 (mmHg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="예: 760.0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  외기 온도 (°C)
                </label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="예: 20.5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* 배출구 측정 데이터 */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium mb-3 text-gray-700">배출구 측정 데이터</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  배출가스 온도 (°C)
                </label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="예: 150.0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  배출가스 유량 (Sm³/hr)
                </label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="예: 5000.0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  산소 농도 (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="예: 12.5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  이산화탄소 농도 (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="예: 8.0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  동압 (mmH₂O)
                </label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="예: 10.5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  정압 (mmH₂O)
                </label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="예: -5.0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* 먼지 측정 데이터 */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium mb-3 text-gray-700">먼지 측정</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  흡인량 (L)
                </label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="예: 100.0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  여지 전 무게 (mg)
                </label>
                <input
                  type="number"
                  step="0.0001"
                  placeholder="예: 100.5234"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  여지 후 무게 (mg)
                </label>
                <input
                  type="number"
                  step="0.0001"
                  placeholder="예: 102.1234"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* 비고 */}
          <div className="pt-6 border-t border-gray-200">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              비고
            </label>
            <textarea
              rows={4}
              placeholder="측정 시 특이사항을 입력하세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 저장 버튼 */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              초기화
            </button>
            <button
              type="button"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
