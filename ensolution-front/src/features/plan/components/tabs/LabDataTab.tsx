export const LabDataTab = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">실험 데이터 입력</h2>

        <div className="space-y-6">
          {/* 시료 정보 */}
          <div>
            <h3 className="text-lg font-medium mb-3 text-gray-700">시료 정보</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  시료 채취일
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  시료 번호
                </label>
                <input
                  type="text"
                  placeholder="예: S-2024-001"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  분석일
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* 먼지 분석 */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium mb-3 text-gray-700">먼지 농도 분석</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  배출농도 (mg/Sm³)
                </label>
                <input
                  type="number"
                  step="0.0001"
                  placeholder="예: 5.2345"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  배출허용기준 (mg/Sm³)
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="예: 30.00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  적부 판정
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">선택</option>
                  <option value="적합">적합</option>
                  <option value="부적합">부적합</option>
                </select>
              </div>
            </div>
          </div>

          {/* 가스상 물질 분석 */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium mb-3 text-gray-700">가스상 물질 분석</h3>

            {/* SOx */}
            <div className="mb-4">
              <h4 className="text-md font-medium mb-2 text-gray-600">황산화물 (SOx)</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    배출농도 (ppm)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="예: 15.50"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    배출허용기준 (ppm)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="예: 50.00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    적부 판정
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">선택</option>
                    <option value="적합">적합</option>
                    <option value="부적합">부적합</option>
                  </select>
                </div>
              </div>
            </div>

            {/* NOx */}
            <div className="mb-4">
              <h4 className="text-md font-medium mb-2 text-gray-600">질소산화물 (NOx)</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    배출농도 (ppm)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="예: 45.30"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    배출허용기준 (ppm)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="예: 100.00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    적부 판정
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">선택</option>
                    <option value="적합">적합</option>
                    <option value="부적합">부적합</option>
                  </select>
                </div>
              </div>
            </div>

            {/* HCl */}
            <div className="mb-4">
              <h4 className="text-md font-medium mb-2 text-gray-600">염화수소 (HCl)</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    배출농도 (ppm)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="예: 8.20"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    배출허용기준 (ppm)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="예: 30.00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    적부 판정
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">선택</option>
                    <option value="적합">적합</option>
                    <option value="부적합">부적합</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* 중금속 분석 */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium mb-3 text-gray-700">중금속 분석</h3>
            <div className="space-y-3">
              {['납(Pb)', '카드뮴(Cd)', '비소(As)', '수은(Hg)'].map((metal) => (
                <div key={metal} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  <div className="font-medium text-gray-700">{metal}</div>
                  <div>
                    <input
                      type="number"
                      step="0.0001"
                      placeholder="배출농도 (mg/Sm³)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="배출허용기준 (mg/Sm³)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">적부 판정</option>
                      <option value="적합">적합</option>
                      <option value="부적합">부적합</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 분석자 정보 */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium mb-3 text-gray-700">분석자 정보</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  분석자 성명
                </label>
                <input
                  type="text"
                  placeholder="예: 홍길동"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  검증자 성명
                </label>
                <input
                  type="text"
                  placeholder="예: 김철수"
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
              placeholder="분석 시 특이사항을 입력하세요."
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
