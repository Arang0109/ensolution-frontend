import type { WeatherEditForm } from "@/entities/plan/model";
import {
  WEATHER_CONDITION_LABELS_OPTIONS, WIND_DIRECTION_LABELS_OPTIONS
} from "@/entities/plan/model";
import { display } from "@shared/lib";

import {
  TableLabelCell, TableInputCell, TableResultCell, TableSelectableCell, SectionAccordion
} from "@shared/ui";

interface WeatherSectionProps {
  mobileWrap: string;
  desktopWrap: string;

  weather: WeatherEditForm;
  onChange: (name: keyof WeatherEditForm, value: string) => void;
  atmosphericPressure: number | null;
}

export const WeatherSection = ({
  mobileWrap,
  desktopWrap,

  weather,
  onChange,
  atmosphericPressure,
}: WeatherSectionProps) => {

  return (
    <SectionAccordion title="Part 1. 기상정보 입력">
      {/* Mobile */}
      <div className={mobileWrap}>
        <table className="w-full table-fixed border-collapse text-sm">
          <tbody>
            <tr>
              <TableLabelCell colSpan={3}>대기압 (<i>Hpa</i>)</TableLabelCell>
              <TableLabelCell>기상</TableLabelCell>
            </tr>
            <tr>
              <TableInputCell
                colSpan={2}
                type="number"
                value={weather.pressure}
                onChange={(value) => onChange("pressure", value)}
                unit="Hpa"
                min={0.1}
                step={0.1}
              />
              <TableResultCell value={display(atmosphericPressure)} unit="mmHg" />
              <TableSelectableCell
                value={weather.weatherCondition}
                options={WEATHER_CONDITION_LABELS_OPTIONS}
                onChange={(value) => onChange("weatherCondition", value)} />
            </tr>
            <tr>
              <TableLabelCell>기온 (<i>°C</i>)</TableLabelCell>
              <TableLabelCell>습도 (<i>%</i>)</TableLabelCell>
              <TableLabelCell>풍향</TableLabelCell>
              <TableLabelCell>풍속 (<i>m/s</i>)</TableLabelCell>
            </tr>
            <tr>
              <TableInputCell
                type="text"
                value={weather.temperature}
                onChange={(value) => onChange("temperature", value)}
                unit="°C"/>
              <TableInputCell
                type="number"
                value={weather.humidity}
                onChange={(value) => onChange("humidity", value)}
                unit="%"/>
                min={0.0}
                max={100.0}
                step={0.1}
              <TableSelectableCell
                value={weather.windDirection}
                options={WIND_DIRECTION_LABELS_OPTIONS}
                onChange={(value) => onChange("windDirection", value)}/>
              <TableInputCell
                type="number"
                value={weather.windSpeed}
                onChange={(value) => onChange("windSpeed", value)}
                unit="m/s"
                min={0.0}
                max={50.0}
                step={0.1}
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
              <TableLabelCell colSpan={2}>대기압 (<i>Hpa</i>)</TableLabelCell>
              <TableLabelCell>기온 (<i>°C</i>)</TableLabelCell>
              <TableLabelCell>습도 (<i>%</i>)</TableLabelCell>
              <TableLabelCell>기상</TableLabelCell>
              <TableLabelCell>풍향</TableLabelCell>
              <TableLabelCell>풍속 (<i>m/s</i>)</TableLabelCell>
            </tr>
            <tr>
              <TableInputCell
                type="number"
                value={weather.pressure}
                onChange={(value) => onChange("pressure", value)}
                unit="Hpa"
                min={0.1}
                step={0.1}
              />
              <TableResultCell value={display(atmosphericPressure)} unit="mmHg" />
              <TableInputCell
                type="text"
                value={weather.temperature}
                onChange={(value) => onChange("temperature", value)}
                unit="°C"
              />
              <TableInputCell
                type="number"
                value={weather.humidity}
                onChange={(value) => onChange("humidity", value)}
                unit="%"
                min={0.0}
                max={100.0}
                step={0.1}
              />
              <TableSelectableCell
                value={weather.weatherCondition}
                options={WEATHER_CONDITION_LABELS_OPTIONS}
                onChange={(value) => onChange("weatherCondition", value)} />
              <TableSelectableCell
                value={weather.windDirection}
                options={WIND_DIRECTION_LABELS_OPTIONS}
                onChange={(value) => onChange("windDirection", value)}
              />
              <TableInputCell
                type="number"
                value={weather.windSpeed}
                onChange={(value) => onChange("windSpeed", value)}
                unit="m/s"
                min={0.0}
                max={50.0}
                step={0.1}
              />
            </tr>
          </tbody>
        </table>
      </div>
    </SectionAccordion>
  )
}
