import type {
  FieldDataEditForm
} from "@plan/model";
import {
  WEATHER_CONDITION_LABELS_OPTIONS, WIND_DIRECTION_LABELS_OPTIONS
} from "@plan/model";

import {
  TableLabelCell, TableInputCell, TableResultCell, TableSelectableCell
} from "@shared/ui";

interface WeatherSectionProps {
  mobileWrap: string;
  desktopWrap: string;

  weather: FieldDataEditForm['weather'];
  onChange: (name: keyof FieldDataEditForm["weather"], value: string) => void;
  atmosphericPressure: number;
}

const PressureRow = ({
  weather,
  atmosphericPressure,
  onChange,
}: {
  weather: WeatherSectionProps["weather"];
  atmosphericPressure: number;
  onChange: WeatherSectionProps["onChange"];
}) => (
  <>
    <TableLabelCell>대기압</TableLabelCell>
    <TableInputCell
      colSpan={2}
      value={weather.pressure}
      onChange={(value) => onChange("pressure", value)}
      unit="Hpa"
    />
    <TableResultCell value={atmosphericPressure.toFixed(1)} unit="mmHg" />
  </>
);

const TemperatureRow = ({
  weather,
  onChange,
}: {
  weather: WeatherSectionProps["weather"];
  onChange: WeatherSectionProps["onChange"];
}) => (
  <>
    <TableLabelCell>기온</TableLabelCell>
    <TableInputCell
      value={weather.temperature}
      onChange={(value) => onChange("temperature", value)}
      unit="°C"
    />
  </>
);

const HumidityRow = ({
  weather,
  onChange,
}: {
  weather: WeatherSectionProps["weather"];
  onChange: WeatherSectionProps["onChange"];
}) => (
  <>
    <TableLabelCell>습도</TableLabelCell>
    <TableInputCell
      value={weather.humidity}
      onChange={(value) => onChange("humidity", value)}
      unit="%"
    />
  </>
);

const WeatherConditionRow = ({
  weather,
  onChange,
}: {
  weather: WeatherSectionProps["weather"];
  onChange: WeatherSectionProps["onChange"];
}) => (
  <>
    <TableLabelCell>기상</TableLabelCell>
    <TableSelectableCell
      colSpan={3}
      value={weather.weatherCondition}
      options={WEATHER_CONDITION_LABELS_OPTIONS}
      onChange={(value) => onChange("weatherCondition", value)} />
  </>
);

const WindDirectionRow = ({
  weather,
  onChange,
}: {
  weather: WeatherSectionProps["weather"];
  onChange: WeatherSectionProps["onChange"];
}) => (
  <>
    <TableLabelCell>풍향</TableLabelCell>
    <TableSelectableCell
      value={weather.windDirection} 
      options={WIND_DIRECTION_LABELS_OPTIONS} 
      onChange={(value) => onChange("windDirection", value)} 
    />
  </>
);

const WindSpeedRow = ({
  weather,
  onChange,
}: {
  weather: WeatherSectionProps["weather"];
  onChange: WeatherSectionProps["onChange"];
}) => (
  <>
    <TableLabelCell>풍속</TableLabelCell>
    <TableInputCell
      value={weather.windSpeed}
      onChange={(value) => onChange("windSpeed", value)}
      unit="m/s"
    />
  </>
);

export const WeatherSection = ({
  mobileWrap,
  desktopWrap,
  
  weather,
  onChange,
  atmosphericPressure,
}: WeatherSectionProps) => {

  return (
    <section>
      <h3 className="text-sm font-semibold text-gray-700 mb-2">기상정보</h3>

      {/* Mobile */}
      <div className={mobileWrap}>
        <table className="w-full table-fixed border-collapse text-sm">
          <tbody>
            <tr>
              <PressureRow
                weather={weather}
                atmosphericPressure={atmosphericPressure}
                onChange={onChange}
              />
            </tr>
            <tr>
              <TemperatureRow
                weather={weather}
                onChange={onChange}
              />
              <HumidityRow
                weather={weather}
                onChange={onChange}
              />
            </tr>
            <tr>
              <WeatherConditionRow
                weather={weather}
                onChange={onChange}
              />
            </tr>
            <tr>
              <WindDirectionRow
                weather={weather}
                onChange={onChange}
              />
              <WindSpeedRow
                weather={weather}
                onChange={onChange}
              />
            </tr>
          </tbody>
        </table>
      </div>

      {/* Desktop */}
      <div className={desktopWrap}>
        <table className="w-full table-fixed border-collapse text-sm">
          <tbody>
            <tr>
              <PressureRow
                weather={weather}
                atmosphericPressure={atmosphericPressure}
                onChange={onChange}
              />
              <TemperatureRow
                weather={weather}
                onChange={onChange}
              />
              <HumidityRow
                weather={weather}
                onChange={onChange}
              />  
            </tr>
            <tr>
              <WeatherConditionRow
                weather={weather}
                onChange={onChange}
              />
              <WindDirectionRow
                weather={weather}
                onChange={onChange}
              />
              <WindSpeedRow
                weather={weather}
                onChange={onChange}
              />
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}