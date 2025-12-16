import { useMeasurementDataStore, type MeasurementData } from "@schedule/store/measurementDataStore";

export const MeasurementDataTab = () => {
  const { data, setField, setTripleValue, resetData } = useMeasurementDataStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const key = name as keyof MeasurementData;

    // time 필드는 string 그대로
    if (key === 'startTime' || key === 'endTime') {
      setField(key, value);
    }
    // select 필드 (weather, windDirection)
    else if (key === 'weather' || key === 'windDirection') {
      setField(key, value as MeasurementData[typeof key]);
    }
    // number 필드들
    else {
      setField(key, value === '' ? null : Number(value));
    }
  };

  const handleTripleChange = (
    field: 'oxygenConcentration' | 'carbonDioxideConcentration' | 'carbonMonoxideConcentration',
    index: 'value1' | 'value2' | 'value3',
    value: string
  ) => {
    setTripleValue(field, index, value === '' ? null : Number(value));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-6">
          {/* 측정 환경 정보 */}
          <div>
            <h3 className="text-lg font-medium mb-3 text-gray-700">사전 정보</h3>

            {/* 모바일: 카드 형식 */}
            <div className="md:hidden space-y-3">
              <div className="bg-gray-50 p-3 rounded-lg">
                <label className="block text-xs font-medium text-gray-600 mb-1">측정 시작시간</label>
                <input
                  type="time"
                  name="startTime"
                  value={data.startTime}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <label className="block text-xs font-medium text-gray-600 mb-1">측정 종료시간</label>
                <input
                  type="time"
                  name="endTime"
                  value={data.endTime}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <label className="block text-xs font-medium text-gray-600 mb-1">대기압 (mmH₂O)</label>
                  <input
                    type="number"
                    name="atmosphericPressure"
                    value={data.atmosphericPressure ?? ''}
                    onChange={handleChange}
                    step="0.1"
                    placeholder="760.0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <label className="block text-xs font-medium text-gray-600 mb-1">기온 (°C)</label>
                  <input
                    type="number"
                    name="temperature"
                    value={data.temperature ?? ''}
                    onChange={handleChange}
                    step="0.1"
                    placeholder="20.5"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <label className="block text-xs font-medium text-gray-600 mb-1">습도 (%)</label>
                  <input
                    type="number"
                    name="humidity"
                    value={data.humidity ?? ''}
                    onChange={handleChange}
                    step="1"
                    min="0"
                    max="100"
                    placeholder="65"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <label className="block text-xs font-medium text-gray-600 mb-1">풍속 (m/s)</label>
                  <input
                    type="number"
                    name="windSpeed"
                    value={data.windSpeed ?? ''}
                    onChange={handleChange}
                    step="0.1"
                    min="0"
                    placeholder="3.5"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <label className="block text-xs font-medium text-gray-600 mb-1">날씨</label>
                  <select
                    name="weather"
                    value={data.weather}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">선택</option>
                    <option value="SUNNY">맑음</option>
                    <option value="CLOUDY">흐림</option>
                    <option value="RAINY">비</option>
                    <option value="SNOWY">눈</option>
                  </select>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <label className="block text-xs font-medium text-gray-600 mb-1">풍향</label>
                  <select
                    name="windDirection"
                    value={data.windDirection}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">선택</option>
                    <option value="N">북</option>
                    <option value="NE">북동</option>
                    <option value="E">동</option>
                    <option value="SE">남동</option>
                    <option value="S">남</option>
                    <option value="SW">남서</option>
                    <option value="W">서</option>
                    <option value="NW">북서</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 데스크톱: 테이블 형식 */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-700">측정 시간</th>
                    <th className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-700" colSpan={2}>시작시간 / 종료시간</th>
                    <th className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-700">대기압<br/>(mmH₂O)</th>
                    <th className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-700">날씨</th>
                    <th className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-700">기온<br/>(°C)</th>
                    <th className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-700">습도<br/>(%)</th>
                    <th className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-700">풍향</th>
                    <th className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-700">풍속<br/>(m/s)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-2 py-2 text-center text-sm font-medium text-gray-700">측정값</td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="time"
                        name="startTime"
                        value={data.startTime}
                        onChange={handleChange}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="time"
                        name="endTime"
                        value={data.endTime}
                        onChange={handleChange}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="number"
                        name="atmosphericPressure"
                        value={data.atmosphericPressure ?? ''}
                        onChange={handleChange}
                        step="0.1"
                        placeholder="760.0"
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <select
                        name="weather"
                        value={data.weather}
                        onChange={handleChange}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">선택</option>
                        <option value="SUNNY">맑음</option>
                        <option value="CLOUDY">흐림</option>
                        <option value="RAINY">비</option>
                        <option value="SNOWY">눈</option>
                      </select>
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="number"
                        name="temperature"
                        value={data.temperature ?? ''}
                        onChange={handleChange}
                        step="0.1"
                        placeholder="20.5"
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="number"
                        name="humidity"
                        value={data.humidity ?? ''}
                        onChange={handleChange}
                        step="1"
                        min="0"
                        max="100"
                        placeholder="65"
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <select
                        name="windDirection"
                        value={data.windDirection}
                        onChange={handleChange}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">선택</option>
                        <option value="N">북</option>
                        <option value="NE">북동</option>
                        <option value="E">동</option>
                        <option value="SE">남동</option>
                        <option value="S">남</option>
                        <option value="SW">남서</option>
                        <option value="W">서</option>
                        <option value="NW">북서</option>
                      </select>
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="number"
                        name="windSpeed"
                        value={data.windSpeed ?? ''}
                        onChange={handleChange}
                        step="0.1"
                        min="0"
                        placeholder="3.5"
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 배출구 가스 데이터 */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium mb-3 text-gray-700">배출구 측정 데이터</h3>
            <div className="space-y-4">
              {/* 동압, 정압 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    배출가스 온도 (°C)
                  </label>
                  <input
                    type="number"
                    name="exhaustGasTemperature"
                    value={data.exhaustGasTemperature ?? ''}
                    onChange={handleChange}
                    step="0.1"
                    placeholder="예: 150.0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    동압 (mmH₂O)
                  </label>
                  <input
                    type="number"
                    name="dynamicPressure"
                    value={data.dynamicPressure ?? ''}
                    onChange={handleChange}
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
                    name="staticPressure"
                    value={data.staticPressure ?? ''}
                    onChange={handleChange}
                    step="0.1"
                    placeholder="예: -5.0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* 가스 농도 측정 - 반응형 */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">가스 농도 측정 (%)</h4>

                {/* 모바일: 카드 형식 */}
                <div className="md:hidden space-y-4">
                  {/* 산소 농도 */}
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <h5 className="text-sm font-semibold text-gray-700 mb-2">산소 농도 (O₂)</h5>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <label className="text-xs text-gray-600 w-16">1차:</label>
                        <input
                          type="number"
                          value={data.oxygenConcentration.value1 ?? 20.9}
                          onChange={(e) => handleTripleChange('oxygenConcentration', 'value1', e.target.value)}
                          step="0.01"
                          placeholder="12.5"
                          className="flex-1 px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="text-xs text-gray-600 w-16">2차:</label>
                        <input
                          type="number"
                          value={data.oxygenConcentration.value2 ?? 20.9}
                          onChange={(e) => handleTripleChange('oxygenConcentration', 'value2', e.target.value)}
                          step="0.01"
                          placeholder="12.7"
                          className="flex-1 px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="text-xs text-gray-600 w-16">3차:</label>
                        <input
                          type="number"
                          value={data.oxygenConcentration.value3 ?? 20.9}
                          onChange={(e) => handleTripleChange('oxygenConcentration', 'value3', e.target.value)}
                          step="0.01"
                          placeholder="12.6"
                          className="flex-1 px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 이산화탄소 농도 */}
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <h5 className="text-sm font-semibold text-gray-700 mb-2">이산화탄소 농도 (CO₂)</h5>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <label className="text-xs text-gray-600 w-16">1차:</label>
                        <input
                          type="number"
                          value={data.carbonDioxideConcentration.value1 ?? 0.0}
                          onChange={(e) => handleTripleChange('carbonDioxideConcentration', 'value1', e.target.value)}
                          step="0.01"
                          placeholder="8.0"
                          className="flex-1 px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="text-xs text-gray-600 w-16">2차:</label>
                        <input
                          type="number"
                          value={data.carbonDioxideConcentration.value2 ?? 0.0}
                          onChange={(e) => handleTripleChange('carbonDioxideConcentration', 'value2', e.target.value)}
                          step="0.01"
                          placeholder="8.2"
                          className="flex-1 px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="text-xs text-gray-600 w-16">3차:</label>
                        <input
                          type="number"
                          value={data.carbonDioxideConcentration.value3 ?? 0.0}
                          onChange={(e) => handleTripleChange('carbonDioxideConcentration', 'value3', e.target.value)}
                          step="0.01"
                          placeholder="8.1"
                          className="flex-1 px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 일산화탄소 농도 */}
                  <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                    <h5 className="text-sm font-semibold text-gray-700 mb-2">일산화탄소 농도 (CO)</h5>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <label className="text-xs text-gray-600 w-16">1차:</label>
                        <input
                          type="number"
                          value={data.carbonMonoxideConcentration.value1 ?? 0.0}
                          onChange={(e) => handleTripleChange('carbonMonoxideConcentration', 'value1', e.target.value)}
                          step="0.1"
                          placeholder="5.0"
                          className="flex-1 px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="text-xs text-gray-600 w-16">2차:</label>
                        <input
                          type="number"
                          value={data.carbonMonoxideConcentration.value2 ?? 0.0}
                          onChange={(e) => handleTripleChange('carbonMonoxideConcentration', 'value2', e.target.value)}
                          step="0.1"
                          placeholder="5.2"
                          className="flex-1 px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="text-xs text-gray-600 w-16">3차:</label>
                        <input
                          type="number"
                          value={data.carbonMonoxideConcentration.value3 ?? 0.0}
                          onChange={(e) => handleTripleChange('carbonMonoxideConcentration', 'value3', e.target.value)}
                          step="0.1"
                          placeholder="5.1"
                          className="flex-1 px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 데스크톱: 테이블 형식 */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-white">
                        <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">측정 항목</th>
                        <th className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-700">1차 측정</th>
                        <th className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-700">2차 측정</th>
                        <th className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-700">3차 측정</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* 산소 농도 */}
                      <tr className="bg-blue-50">
                        <td className="border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700">
                          산소 농도 (O₂)
                        </td>
                        <td className="border border-gray-300 px-2 py-2">
                          <input
                            type="number"
                            value={data.oxygenConcentration.value1 ?? 20.9}
                            onChange={(e) => handleTripleChange('oxygenConcentration', 'value1', e.target.value)}
                            step="0.01"
                            placeholder="12.5"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </td>
                        <td className="border border-gray-300 px-2 py-2">
                          <input
                            type="number"
                            value={data.oxygenConcentration.value2 ?? 20.9}
                            onChange={(e) => handleTripleChange('oxygenConcentration', 'value2', e.target.value)}
                            step="0.01"
                            placeholder="12.7"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </td>
                        <td className="border border-gray-300 px-2 py-2">
                          <input
                            type="number"
                            value={data.oxygenConcentration.value3 ?? 20.9}
                            onChange={(e) => handleTripleChange('oxygenConcentration', 'value3', e.target.value)}
                            step="0.01"
                            placeholder="12.6"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </td>
                      </tr>

                      {/* 이산화탄소 농도 */}
                      <tr className="bg-green-50">
                        <td className="border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700">
                          이산화탄소 농도 (CO₂)
                        </td>
                        <td className="border border-gray-300 px-2 py-2">
                          <input
                            type="number"
                            value={data.carbonDioxideConcentration.value1 ?? 0.0}
                            onChange={(e) => handleTripleChange('carbonDioxideConcentration', 'value1', e.target.value)}
                            step="0.01"
                            placeholder="8.0"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </td>
                        <td className="border border-gray-300 px-2 py-2">
                          <input
                            type="number"
                            value={data.carbonDioxideConcentration.value2 ?? 0.0}
                            onChange={(e) => handleTripleChange('carbonDioxideConcentration', 'value2', e.target.value)}
                            step="0.01"
                            placeholder="8.2"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </td>
                        <td className="border border-gray-300 px-2 py-2">
                          <input
                            type="number"
                            value={data.carbonDioxideConcentration.value3 ?? 0.0}
                            onChange={(e) => handleTripleChange('carbonDioxideConcentration', 'value3', e.target.value)}
                            step="0.01"
                            placeholder="8.1"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </td>
                      </tr>

                      {/* 일산화탄소 농도 */}
                      <tr className="bg-orange-50">
                        <td className="border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700">
                          일산화탄소 농도 (CO)
                        </td>
                        <td className="border border-gray-300 px-2 py-2">
                          <input
                            type="number"
                            value={data.carbonMonoxideConcentration.value1 ?? 0.0}
                            onChange={(e) => handleTripleChange('carbonMonoxideConcentration', 'value1', e.target.value)}
                            step="0.1"
                            placeholder="5.0"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                          />
                        </td>
                        <td className="border border-gray-300 px-2 py-2">
                          <input
                            type="number"
                            value={data.carbonMonoxideConcentration.value2 ?? 0.0}
                            onChange={(e) => handleTripleChange('carbonMonoxideConcentration', 'value2', e.target.value)}
                            step="0.1"
                            placeholder="5.2"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                          />
                        </td>
                        <td className="border border-gray-300 px-2 py-2">
                          <input
                            type="number"
                            value={data.carbonMonoxideConcentration.value3 ?? 0.0}
                            onChange={(e) => handleTripleChange('carbonMonoxideConcentration', 'value3', e.target.value)}
                            step="0.1"
                            placeholder="5.1"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* 저장 버튼 */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={resetData}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              초기화
            </button>
            <button
              type="button"
              onClick={() => {
                console.log('측정 데이터 저장:', data);
                alert('측정 데이터가 저장되었습니다.');
              }}
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
