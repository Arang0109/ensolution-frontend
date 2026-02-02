import { useMeasurementDataStore } from "@schedule/store/measurementDataStore";
import { useMeasurementHandler } from "@schedule/hooks";

import {
  Button,
  SelectField,
  InputField
} from "@shared/ui";

export const MeasurementDataTab = () => {
  const {
    data,
    setTime,
    setNumberField,
    setWeather,
    setWindDirection,
    setTripleValue,
    setMeasurementPoint,
    resetData
  } = useMeasurementDataStore();

  const { handleChange } = useMeasurementHandler(
    setTime,
    setNumberField,
    setWeather,
    setWindDirection,
    setTripleValue,
    setMeasurementPoint
  );

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
              <InputField
                label="측정 시작시간"
                type="time"
                name="startTime"
                value={data.startTime}
                onChange={() => handleChange}
              />
              <InputField
                label="측정 종료시간"
                type="time"
                name="endTime"
                value={data.startTime}
                onChange={() => handleChange}
              />
              <InputField
                label="대기압 (Hpa)"
                name="atmosphericPressure"
                value={data.atmosphericPressure ?? ''}
                onChange={() => handleChange}
              />
              <SelectField
                label="날씨"
                name="weather"
                value={data.weather}
                onChange={() => handleChange}
                options={WEATHER_OPTIONS}
              />
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
              variant="primary"
            />
          </div>
        </div>
      </div>
  );
};
