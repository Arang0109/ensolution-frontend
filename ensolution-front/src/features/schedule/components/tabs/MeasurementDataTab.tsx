import { useMeasurementDataStore } from "@schedule/store/measurementDataStore";
import { useMeasurementHandler } from "@schedule/hooks";

import { Button } from "@common/ui";

import {
  FieldWrapper,
  NumberField,
  SelectField,
  TimeField
} from "@common/ui";

export const MeasurementDataTab = () => {
  const { 
    data, 
    setTime,
    setNumberField,
    setWeather,
    setWindDirection,
    setTripleValue,
    resetData
  } = useMeasurementDataStore();

  const { handleChange, handleTripleChange } = useMeasurementHandler(
    setTime,
    setNumberField,
    setWeather,
    setWindDirection,
    setTripleValue
  );

  const WIND_DIRECTION_OPTIONS = [
    { value: 'N', label: '북' },
    { value: 'NE', label: '북동' },
    { value: 'E', label: '동' },
    { value: 'SE', label: '남동' },
    { value: 'S', label: '남' },
    { value: 'SW', label: '남서' },
    { value: 'W', label: '서' },
    { value: 'NW', label: '북서' },
  ] as const;

  const WEATHER_OPTIONS = [
    { value: 'SUNNY', label: '맑음' },
    { value: 'CLOUDY', label: '흐림' },
    { value: 'RAINY', label: '비' },
    { value: 'SNOWY', label: '눈' },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-6">
          {/* 측정 환경 정보 */}
          <div>
            <h3 className="text-lg font-medium mb-3 text-gray-700">사전 정보</h3>

            {/* 모바일: 카드 형식 */}
            <div className="md:hidden space-y-3">
              <FieldWrapper label="측정 시작시간">
                <TimeField name="startTime" value={data.startTime} onChange={handleChange} />
              </FieldWrapper>
              <FieldWrapper label="측정 종료시간">
                <TimeField name="endTime" value={data.endTime} onChange={handleChange} />
              </FieldWrapper>
              <div className="grid grid-cols-2 gap-3">
                <FieldWrapper label="대기압 (mmH₂O)">
                  <NumberField name="atmosphericPressure" value={data.atmosphericPressure ?? ''} onChange={handleChange} />
                </FieldWrapper>
                <FieldWrapper label="날씨">
                  <SelectField
                    name="weather"
                    value={data.weather}
                    onChange={handleChange}
                    options={WEATHER_OPTIONS}
                  />
                </FieldWrapper>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <FieldWrapper label="기온 (°C)">
                  <NumberField name="temperature" value={data.temperature ?? ''} onChange={handleChange} />
                </FieldWrapper>
                <FieldWrapper label="습도 (%)">
                  <NumberField name="humidity" value={data.humidity ?? ''} onChange={handleChange} />
                </FieldWrapper>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <FieldWrapper label="풍향">
                  <SelectField
                    name="windDirection"
                    value={data.windDirection}
                    onChange={handleChange}
                    options={WIND_DIRECTION_OPTIONS}
                  />
                </FieldWrapper>
                <FieldWrapper label="풍속 (m/s)">
                  <NumberField name="windSpeed" value={data.windSpeed ?? ''} onChange={handleChange} />
                </FieldWrapper>
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
                      <TimeField name="startTime" value={data.startTime} onChange={handleChange} />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <TimeField name="endTime" value={data.endTime} onChange={handleChange} />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <NumberField name="atmosphericPressure" value={data.atmosphericPressure ?? ''} onChange={handleChange} />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <SelectField
                        name="weather"
                        value={data.weather}
                        onChange={handleChange}
                        options={WEATHER_OPTIONS}
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <NumberField name="temperature" value={data.temperature ?? ''} onChange={handleChange} />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <NumberField name="humidity" value={data.humidity ?? ''} onChange={handleChange} />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <SelectField
                        name="windDirection"
                        value={data.windDirection}
                        onChange={handleChange}
                        options={WIND_DIRECTION_OPTIONS}
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <NumberField name="windSpeed" value={data.windSpeed ?? ''} onChange={handleChange} />
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
                <FieldWrapper label="배출가스 온도 (°C)">
                  <NumberField name="exhaustGasTemperature" value={data.exhaustGasTemperature ?? ''} onChange={handleChange} />
                </FieldWrapper>
                <FieldWrapper label="동압 (mmH₂O)">
                  <NumberField name="dynamicPressure" value={data.dynamicPressure ?? ''} onChange={handleChange} />
                </FieldWrapper>
                <FieldWrapper label="정압 (mmH₂O)">
                  <NumberField name="staticPressure" value={data.staticPressure ?? ''} onChange={handleChange} />
                </FieldWrapper>
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
                        <NumberField
                          name="oxygenConcentration-value1"
                          value={data.oxygenConcentration.value1 ?? 20.9}
                          onChange={(e) => handleTripleChange('oxygenConcentration', 'value1', e.target.value)}
                          step={0.01}
                          placeholder="12.5"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="text-xs text-gray-600 w-16">2차:</label>
                        <NumberField
                          name="oxygenConcentration-value2"
                          value={data.oxygenConcentration.value2 ?? 20.9}
                          onChange={(e) => handleTripleChange('oxygenConcentration', 'value2', e.target.value)}
                          step={0.01}
                          placeholder="12.7"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="text-xs text-gray-600 w-16">3차:</label>
                        <NumberField
                          name="oxygenConcentration-value3"
                          value={data.oxygenConcentration.value3 ?? 20.9}
                          onChange={(e) => handleTripleChange('oxygenConcentration', 'value3', e.target.value)}
                          step={0.01}
                          placeholder="12.6"
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
                        <NumberField
                          name="carbonDioxideConcentration-value1"
                          value={data.carbonDioxideConcentration.value1 ?? 0.0}
                          onChange={(e) => handleTripleChange('carbonDioxideConcentration', 'value1', e.target.value)}
                          step={0.01}
                          placeholder="8.0"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="text-xs text-gray-600 w-16">2차:</label>
                        <NumberField
                          name="carbonDioxideConcentration-value2"
                          value={data.carbonDioxideConcentration.value2 ?? 0.0}
                          onChange={(e) => handleTripleChange('carbonDioxideConcentration', 'value2', e.target.value)}
                          step={0.01}
                          placeholder="8.2"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="text-xs text-gray-600 w-16">3차:</label>
                        <NumberField
                          name="carbonDioxideConcentration-value3"
                          value={data.carbonDioxideConcentration.value3 ?? 0.0}
                          onChange={(e) => handleTripleChange('carbonDioxideConcentration', 'value3', e.target.value)}
                          step={0.01}
                          placeholder="8.1"
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
                        <NumberField
                          name="carbonMonoxideConcentration-value1"
                          value={data.carbonMonoxideConcentration.value1 ?? 0.0}
                          onChange={(e) => handleTripleChange('carbonMonoxideConcentration', 'value1', e.target.value)}
                          step={0.1}
                          placeholder="5.0"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="text-xs text-gray-600 w-16">2차:</label>
                        <NumberField
                          name="carbonMonoxideConcentration-value2"
                          value={data.carbonMonoxideConcentration.value2 ?? 0.0}
                          onChange={(e) => handleTripleChange('carbonMonoxideConcentration', 'value2', e.target.value)}
                          step={0.1}
                          placeholder="5.2"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="text-xs text-gray-600 w-16">3차:</label>
                        <NumberField
                          name="carbonMonoxideConcentration-value3"
                          value={data.carbonMonoxideConcentration.value3 ?? 0.0}
                          onChange={(e) => handleTripleChange('carbonMonoxideConcentration', 'value3', e.target.value)}
                          step={0.1}
                          placeholder="5.1"
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
                          <NumberField
                            name="oxygenConcentration-value1"
                            value={data.oxygenConcentration.value1 ?? 20.9}
                            onChange={(e) => handleTripleChange('oxygenConcentration', 'value1', e.target.value)}
                            step={0.01}
                            placeholder="12.5"
                          />
                        </td>
                        <td className="border border-gray-300 px-2 py-2">
                          <NumberField
                            name="oxygenConcentration-value2"
                            value={data.oxygenConcentration.value2 ?? 20.9}
                            onChange={(e) => handleTripleChange('oxygenConcentration', 'value2', e.target.value)}
                            step={0.01}
                            placeholder="12.7"
                          />
                        </td>
                        <td className="border border-gray-300 px-2 py-2">
                          <NumberField
                            name="oxygenConcentration-value3"
                            value={data.oxygenConcentration.value3 ?? 20.9}
                            onChange={(e) => handleTripleChange('oxygenConcentration', 'value3', e.target.value)}
                            step={0.01}
                            placeholder="12.6"
                          />
                        </td>
                      </tr>

                      {/* 이산화탄소 농도 */}
                      <tr className="bg-green-50">
                        <td className="border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700">
                          이산화탄소 농도 (CO₂)
                        </td>
                        <td className="border border-gray-300 px-2 py-2">
                          <NumberField
                            name="carbonDioxideConcentration-value1"
                            value={data.carbonDioxideConcentration.value1 ?? 0.0}
                            onChange={(e) => handleTripleChange('carbonDioxideConcentration', 'value1', e.target.value)}
                            step={0.01}
                            placeholder="8.0"
                          />
                        </td>
                        <td className="border border-gray-300 px-2 py-2">
                          <NumberField
                            name="carbonDioxideConcentration-value2"
                            value={data.carbonDioxideConcentration.value2 ?? 0.0}
                            onChange={(e) => handleTripleChange('carbonDioxideConcentration', 'value2', e.target.value)}
                            step={0.01}
                            placeholder="8.2"
                          />
                        </td>
                        <td className="border border-gray-300 px-2 py-2">
                          <NumberField
                            name="carbonDioxideConcentration-value3"
                            value={data.carbonDioxideConcentration.value3 ?? 0.0}
                            onChange={(e) => handleTripleChange('carbonDioxideConcentration', 'value3', e.target.value)}
                            step={0.01}
                            placeholder="8.1"
                          />
                        </td>
                      </tr>

                      {/* 일산화탄소 농도 */}
                      <tr className="bg-orange-50">
                        <td className="border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700">
                          일산화탄소 농도 (CO)
                        </td>
                        <td className="border border-gray-300 px-2 py-2">
                          <NumberField
                            name="carbonMonoxideConcentration-value1"
                            value={data.carbonMonoxideConcentration.value1 ?? 0.0}
                            onChange={(e) => handleTripleChange('carbonMonoxideConcentration', 'value1', e.target.value)}
                            step={0.1}
                            placeholder="5.0"
                          />
                        </td>
                        <td className="border border-gray-300 px-2 py-2">
                          <NumberField
                            name="carbonMonoxideConcentration-value2"
                            value={data.carbonMonoxideConcentration.value2 ?? 0.0}
                            onChange={(e) => handleTripleChange('carbonMonoxideConcentration', 'value2', e.target.value)}
                            step={0.1}
                            placeholder="5.2"
                          />
                        </td>
                        <td className="border border-gray-300 px-2 py-2">
                          <NumberField
                            name="carbonMonoxideConcentration-value3"
                            value={data.carbonMonoxideConcentration.value3 ?? 0.0}
                            onChange={(e) => handleTripleChange('carbonMonoxideConcentration', 'value3', e.target.value)}
                            step={0.1}
                            placeholder="5.1"
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
            <Button
              label="초기화"
              onClick={resetData}
              variant="ghost"
            />
            <Button
              label="저장"
              variant="submit"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
