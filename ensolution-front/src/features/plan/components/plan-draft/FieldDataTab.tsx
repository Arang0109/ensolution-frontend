import { TableInputCell } from "@shared/ui";
import type { PreInfoEditForm, FieldDataEditForm } from "@plan/model";
import { WIND_DIRECTION_LABELS_OPTIONS, WEATHER_CONDITION_LABELS_OPTIONS } from "@plan/model";

import { SHAPE_LABELS_OPTIONS, ORIENTATION_LABELS_OPTIONS } from "@stack/model";
import { weatherCalculator, moistureCalculator, exhaustGasCalculator, measurePointCaculator } from "@plan/util";

import { TableLabelCell, TableResultCell, TableResultWithLabelCell, TableSelectableCell } from "@shared/ui";

interface FieldDataTabProps {
  preInfo: PreInfoEditForm;
  fieldData: FieldDataEditForm;
  onChange: <
    S extends keyof FieldDataEditForm,
    K extends keyof FieldDataEditForm[S]
  >(
    section: S,
    name: K,
    value: string | null,
    index?: number
  ) => void;
  onPreInfoChange: (name: keyof PreInfoEditForm, value: string) => void;
}

// ─── 모바일 카드 스타일 상수 ────────────────────────────────────────
const mobileWrap = "sm:hidden rounded-lg border border-gray-200 overflow-hidden";
const desktopWrap = "hidden sm:block rounded-lg border border-gray-200 overflow-hidden";

export const FieldDataTab = ({
  preInfo,
  fieldData,
  onChange,
  onPreInfoChange
}: FieldDataTabProps) => {
  const { atmosphericPressure } = weatherCalculator(fieldData.weather);
  const {
    weightDiff,
    tempAvg,
    dryVolumeDiff,
    pressureToMmHg,
    pressureToInchH2O,
    moistureRatio
  } = moistureCalculator(fieldData);
  const {
    o2ConcentrationAvg,
    co2ConcentrationAvg,
    coConcentrationAvg,
    n2ConcentrationAvg,
    noxConcentrationAvg,
    soxConcentrationAvg,
    oxygenCorrectionFactor,
    gasDensity,
  } = exhaustGasCalculator(fieldData, preInfo, moistureRatio);
  const {
    area,
    measurePointCnt,
  } = measurePointCaculator(preInfo);

  return (
    <div className="space-y-6">

      {/* ── 기상정보 ─────────────────────────────────── */}
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">기상정보</h3>

        {/* Mobile */}
        <div className={mobileWrap}>
          <table className="w-full table-fixed border-collapse text-sm">
            <tbody>
              <tr>
                <TableLabelCell>대기압</TableLabelCell>
                <TableInputCell value={fieldData.weather.pressure} onChange={(value) => onChange("weather", "pressure", value)} unit="Hpa" />
                <TableResultCell colSpan={2} value={atmosphericPressure} unit="mmHg" />
              </tr>
              <tr>
                <TableLabelCell>기온</TableLabelCell>
                <TableInputCell value={fieldData.weather.temperature} onChange={(value) => onChange("weather", "temperature", value)} unit="°C" />
                <TableLabelCell>습도</TableLabelCell>
                <TableInputCell value={fieldData.weather.humidity} onChange={(value) => onChange("weather", "humidity", value)} unit="%" />
              </tr>
              <tr>
                <TableSelectableCell colSpan={3} label="기상" value={fieldData.weather.weatherCondition} options={WEATHER_CONDITION_LABELS_OPTIONS} onChange={(value) => onChange("weather", "weatherCondition", value)} />
              </tr>
              <tr>
                <TableSelectableCell label="풍향" value={fieldData.weather.windDirection} options={WIND_DIRECTION_LABELS_OPTIONS} onChange={(value) => onChange("weather", "windDirection", value)} />
                <TableLabelCell>풍속</TableLabelCell>
                <TableInputCell value={fieldData.weather.windSpeed} onChange={(value) => onChange("weather", "windSpeed", value)} unit="m/s" />
              </tr>
            </tbody>
          </table>
        </div>

        {/* Desktop */}
        <div className={desktopWrap}>
          <table className="w-full table-fixed border-collapse text-sm">
            <tbody>
              <tr>
                <TableLabelCell>대기압</TableLabelCell>
                <TableInputCell value={fieldData.weather.pressure} onChange={(value) => onChange("weather", "pressure", value)} unit="Hpa" />
                <TableResultCell value={atmosphericPressure} unit="mmHg" />
                <TableLabelCell>기온</TableLabelCell>
                <TableInputCell value={fieldData.weather.temperature} onChange={(value) => onChange("weather", "temperature", value)} unit="°C" />
                <TableLabelCell>습도</TableLabelCell>
                <TableInputCell value={fieldData.weather.humidity} onChange={(value) => onChange("weather", "humidity", value)} unit="%" />
              </tr>
              <tr>
                <TableSelectableCell colSpan={2} label="기상" value={fieldData.weather.weatherCondition} options={WEATHER_CONDITION_LABELS_OPTIONS} onChange={(value) => onChange("weather", "weatherCondition", value)} />
                <TableSelectableCell label="풍향" value={fieldData.weather.windDirection} options={WIND_DIRECTION_LABELS_OPTIONS} onChange={(value) => onChange("weather", "windDirection", value)} />
                <TableLabelCell>풍속</TableLabelCell>
                <TableInputCell value={fieldData.weather.windSpeed} onChange={(value) => onChange("weather", "windSpeed", value)} unit="m/s" />
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 수분량정보 ────────────────────────────────── */}
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">수분량정보</h3>

        {/* Mobile */}
        <div className={mobileWrap}>
          <table className="w-full table-fixed border-collapse text-sm">
            <tbody>
              <tr>
                <TableLabelCell>흡습병 무게</TableLabelCell>
                <TableInputCell value={fieldData.moisture.beforeWeight} onChange={(value) => onChange("moisture", "beforeWeight", value)} unit="g"/>
                <TableInputCell value={fieldData.moisture.afterWeight} onChange={(value) => onChange("moisture", "afterWeight", value)} unit="g" />
                <TableResultCell value={weightDiff} unit="g" />
              </tr>
              <tr>
                <TableLabelCell>온도</TableLabelCell>
                <TableInputCell value={fieldData.moisture.inTemperature} onChange={(value) => onChange("moisture", "inTemperature", value)} unit="°C" />
                <TableInputCell value={fieldData.moisture.outTemperature} onChange={(value) => onChange("moisture", "outTemperature", value)} unit="°C" />
                <TableResultCell value={tempAvg} unit="°C" />
              </tr>
              <tr>
                <TableLabelCell>게이지압</TableLabelCell>
                <TableInputCell value={fieldData.moisture.gasMeterGaugePressure} onChange={(value) => onChange("moisture", "gasMeterGaugePressure", value)} unit={<>mmH<sub>2</sub>O</>} />
                <TableResultCell value={pressureToMmHg} unit="mmHg" />
                <TableResultCell value={pressureToInchH2O} unit={<>inchH<sub>2</sub>O</>} />
              </tr>
              <tr>
                <TableLabelCell>흡인량</TableLabelCell>
                <TableInputCell value={fieldData.moisture.beforeDryVolume} onChange={(value) => onChange("moisture", "beforeDryVolume", value)} unit="L" />
                <TableInputCell value={fieldData.moisture.afterDryVolume} onChange={(value) => onChange("moisture", "afterDryVolume", value)} unit="L" />
                <TableResultCell value={dryVolumeDiff} unit="L" />
              </tr>
              <tr>
                <TableLabelCell>흡인유속</TableLabelCell>
                <TableInputCell value={fieldData.moisture.suctionVelocity} onChange={(value) => onChange("moisture", "suctionVelocity", value)} unit="m/s" />
                <TableLabelCell>수분량(%)</TableLabelCell>
                <TableResultCell value={moistureRatio} unit="%" />
              </tr>
            </tbody>
          </table>
        </div>

        {/* Desktop */}
        <div className={desktopWrap}>
          <table className="w-full table-fixed border-collapse text-sm">
            <tbody>
              <tr>
                <TableLabelCell>흡습병 무게</TableLabelCell>
                <TableInputCell value={fieldData.moisture.beforeWeight} onChange={(value) => onChange("moisture", "beforeWeight", value)} unit="g" />
                <TableInputCell value={fieldData.moisture.afterWeight} onChange={(value) => onChange("moisture", "afterWeight", value)} unit="g" />
                <TableResultCell value={weightDiff} unit="g" />
                <TableLabelCell>가스미터 온도</TableLabelCell>
                <TableInputCell value={fieldData.moisture.inTemperature} onChange={(value) => onChange("moisture", "inTemperature", value)} unit="°C" />
                <TableInputCell value={fieldData.moisture.outTemperature} onChange={(value) => onChange("moisture", "outTemperature", value)} unit="°C" />
                <TableResultCell value={tempAvg} unit="°C" />
              </tr>
              <tr>
                <TableLabelCell>가스미터 흡입량</TableLabelCell>
                <TableInputCell value={fieldData.moisture.beforeDryVolume} onChange={(value) => onChange("moisture", "beforeDryVolume", value)} unit="L" />
                <TableInputCell value={fieldData.moisture.afterDryVolume} onChange={(value) => onChange("moisture", "afterDryVolume", value)} unit="L" />
                <TableResultCell value={dryVolumeDiff} unit="L" />
                <TableLabelCell>게이지압</TableLabelCell>
                <TableInputCell value={fieldData.moisture.gasMeterGaugePressure} onChange={(value) => onChange("moisture", "gasMeterGaugePressure", value)} unit={<>mmH<sub>2</sub>O</>} />
                <TableResultCell value={pressureToMmHg} unit="mmHg" />
                <TableResultCell value={pressureToInchH2O} unit={<>inchH<sub>2</sub>O</>} />
              </tr>
              <tr>
                <TableLabelCell>흡인유속</TableLabelCell>
                <TableInputCell colSpan={3} value={fieldData.moisture.suctionVelocity} onChange={(value) => onChange("moisture", "suctionVelocity", value)} unit="m/s" />
                <TableLabelCell>수분량</TableLabelCell>
                <TableResultCell colSpan={3} value={moistureRatio} unit="%" />
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 배출가스정보 ──────────────────────────────── */}
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">배출가스정보</h3>

        {/* Mobile */}
        <div className={mobileWrap}>
          <table className="w-full table-fixed border-collapse text-sm">
            <tbody>
              <tr>
                <TableLabelCell>O<sub>2</sub></TableLabelCell>
                <TableInputCell value={fieldData.exhaustGas.o2Concentration[0]} onChange={(value) => onChange("exhaustGas", "o2Concentration", value, 0)} unit="%" />
                <TableInputCell value={fieldData.exhaustGas.o2Concentration[1]} onChange={(value) => onChange("exhaustGas", "o2Concentration", value, 1)} unit="%" />
                <TableInputCell value={fieldData.exhaustGas.o2Concentration[2]} onChange={(value) => onChange("exhaustGas", "o2Concentration", value, 2)} unit="%" />
                <TableResultCell value={o2ConcentrationAvg} unit="%" />
              </tr>
              <tr>
                <TableLabelCell>CO<sub>2</sub></TableLabelCell>
                <TableInputCell value={fieldData.exhaustGas.co2Concentration[0]} onChange={(value) => onChange("exhaustGas", "co2Concentration", value, 0)} unit="%" />
                <TableInputCell value={fieldData.exhaustGas.co2Concentration[1]} onChange={(value) => onChange("exhaustGas", "co2Concentration", value, 1)} unit="%" />
                <TableInputCell value={fieldData.exhaustGas.co2Concentration[2]} onChange={(value) => onChange("exhaustGas", "co2Concentration", value, 2)} unit="%" />
                <TableResultCell value={co2ConcentrationAvg} unit="%" />
              </tr>
              <tr>
                <TableLabelCell>CO</TableLabelCell>
                <TableInputCell value={fieldData.exhaustGas.coConcentration[0]} onChange={(value) => onChange("exhaustGas", "coConcentration", value, 0)} unit="%" />
                <TableInputCell value={fieldData.exhaustGas.coConcentration[1]} onChange={(value) => onChange("exhaustGas", "coConcentration", value, 1)} unit="%" />
                <TableInputCell value={fieldData.exhaustGas.coConcentration[2]} onChange={(value) => onChange("exhaustGas", "coConcentration", value, 2)} unit="%" />
                <TableResultCell value={coConcentrationAvg} unit="%" />
              </tr>
              <tr>
                <TableLabelCell>NO<sub>x</sub></TableLabelCell>
                <TableInputCell value={fieldData.exhaustGas.noxConcentration[0]} onChange={(value) => onChange("exhaustGas", "noxConcentration", value, 0)} unit="%" />
                <TableInputCell value={fieldData.exhaustGas.noxConcentration[1]} onChange={(value) => onChange("exhaustGas", "noxConcentration", value, 1)} unit="%" />
                <TableInputCell value={fieldData.exhaustGas.noxConcentration[2]} onChange={(value) => onChange("exhaustGas", "noxConcentration", value, 2)} unit="%" />
                <TableResultCell value={noxConcentrationAvg} unit="%" />
              </tr>
              <tr>
                <TableLabelCell>SO<sub>x</sub></TableLabelCell>
                <TableInputCell value={fieldData.exhaustGas.soxConcentration[0]} onChange={(value) => onChange("exhaustGas", "soxConcentration", value, 0)} unit="%" />
                <TableInputCell value={fieldData.exhaustGas.soxConcentration[1]} onChange={(value) => onChange("exhaustGas", "soxConcentration", value, 1)} unit="%" />
                <TableInputCell value={fieldData.exhaustGas.soxConcentration[2]} onChange={(value) => onChange("exhaustGas", "soxConcentration", value, 2)} unit="%" />
                <TableResultCell value={soxConcentrationAvg} unit="%" />
              </tr>
              <tr>
                <TableResultWithLabelCell label={<>N<sub>2</sub></>} value={n2ConcentrationAvg} unit="%" />
                <TableResultWithLabelCell colSpan={2} label="표준산소농도" value={preInfo.standardOxygen} unit="%" />
                <TableResultWithLabelCell colSpan={2} label="산소보정계수" value={oxygenCorrectionFactor} unit="" />
              </tr>
              <tr>
                <TableResultWithLabelCell colSpan={5} label="배가스밀도" value={gasDensity} unit="kg/Nm³" />
              </tr>
            </tbody>
          </table>
        </div>

        {/* Desktop */}
        <div className={desktopWrap}>
          <table className="w-full table-fixed border-collapse text-sm">
            <tbody>
              <tr>
                <TableLabelCell>O<sub>2</sub></TableLabelCell>
                <TableInputCell value={fieldData.exhaustGas.o2Concentration[0]} onChange={(value) => onChange("exhaustGas", "o2Concentration", value, 0)} unit="%" />
                <TableInputCell value={fieldData.exhaustGas.o2Concentration[1]} onChange={(value) => onChange("exhaustGas", "o2Concentration", value, 1)} unit="%" />
                <TableInputCell value={fieldData.exhaustGas.o2Concentration[2]} onChange={(value) => onChange("exhaustGas", "o2Concentration", value, 2)} unit="%" />
                <TableResultCell value={o2ConcentrationAvg} unit="%" />
                <TableLabelCell>CO<sub>2</sub></TableLabelCell>
                <TableInputCell value={fieldData.exhaustGas.co2Concentration[0]} onChange={(value) => onChange("exhaustGas", "co2Concentration", value, 0)} unit="%" />
                <TableInputCell value={fieldData.exhaustGas.co2Concentration[1]} onChange={(value) => onChange("exhaustGas", "co2Concentration", value, 1)} unit="%" />
                <TableInputCell value={fieldData.exhaustGas.co2Concentration[2]} onChange={(value) => onChange("exhaustGas", "co2Concentration", value, 2)} unit="%" />
                <TableResultCell value={co2ConcentrationAvg} unit="%" />
                <TableLabelCell>CO</TableLabelCell>
                <TableInputCell value={fieldData.exhaustGas.coConcentration[0]} onChange={(value) => onChange("exhaustGas", "coConcentration", value, 0)} unit="%" />
                <TableInputCell value={fieldData.exhaustGas.coConcentration[1]} onChange={(value) => onChange("exhaustGas", "coConcentration", value, 1)} unit="%" />
                <TableInputCell value={fieldData.exhaustGas.coConcentration[2]} onChange={(value) => onChange("exhaustGas", "coConcentration", value, 2)} unit="%" />
                <TableResultCell value={coConcentrationAvg} unit="%" />
              </tr>
              <tr>
                <TableLabelCell>N<sub>2</sub></TableLabelCell>
                <TableResultCell colSpan={4} value={n2ConcentrationAvg} unit="%" />
                <TableLabelCell>NO<sub>x</sub></TableLabelCell>
                <TableInputCell value={fieldData.exhaustGas.noxConcentration[0]} onChange={(value) => onChange("exhaustGas", "noxConcentration", value, 0)} unit="%" />
                <TableInputCell value={fieldData.exhaustGas.noxConcentration[1]} onChange={(value) => onChange("exhaustGas", "noxConcentration", value, 1)} unit="%" />
                <TableInputCell value={fieldData.exhaustGas.noxConcentration[2]} onChange={(value) => onChange("exhaustGas", "noxConcentration", value, 2)} unit="%" />
                <TableResultCell value={noxConcentrationAvg} unit="%" />
                <TableLabelCell>SO<sub>x</sub></TableLabelCell>
                <TableInputCell value={fieldData.exhaustGas.soxConcentration[0]} onChange={(value) => onChange("exhaustGas", "soxConcentration", value, 0)} unit="%" />
                <TableInputCell value={fieldData.exhaustGas.soxConcentration[1]} onChange={(value) => onChange("exhaustGas", "soxConcentration", value, 1)} unit="%" />
                <TableInputCell value={fieldData.exhaustGas.soxConcentration[2]} onChange={(value) => onChange("exhaustGas", "soxConcentration", value, 2)} unit="%" />
                <TableResultCell value={soxConcentrationAvg} unit="%" />
              </tr>
              <tr>
                <TableLabelCell>표준산소농도</TableLabelCell>
                <TableResultCell colSpan={4} value={preInfo.standardOxygen} unit="%" />
                <TableLabelCell>산소보정계수</TableLabelCell>
                <TableResultCell colSpan={4} value={oxygenCorrectionFactor} unit="" />
                <TableLabelCell>배가스밀도</TableLabelCell>
                <TableResultCell colSpan={4} value={gasDensity} unit="kg/Nm³" />
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">시설정보</h3>

        {/* Mobile */}
        <div className={mobileWrap}>
          <table className="w-full table-fixed border-collapse text-sm">
            <tbody>
              <tr>
                <TableLabelCell>높이</TableLabelCell>
                <TableInputCell colSpan={3} value={preInfo.height} onChange={(value) => onPreInfoChange("height", value)} unit="m" />
              </tr>
              <tr>
                <TableSelectableCell
                  label="형태" colSpan={3} value={preInfo.shape}
                  options={SHAPE_LABELS_OPTIONS}
                  onChange={(value) => {
                    onPreInfoChange("shape", value);
                    if (value === "CIRCULAR") onPreInfoChange("verticalLength", "");
                  }}
                />
              </tr>
              <tr>
                {preInfo.shape === "CIRCULAR" ? (
                  <>
                    <TableLabelCell>지름</TableLabelCell>
                    <TableInputCell colSpan={3} value={preInfo.horizontalLength} onChange={(value) => onPreInfoChange("horizontalLength", value)} unit="m" />
                    
                  </>
                ) : (
                  <>
                    <TableLabelCell>가로</TableLabelCell>
                    <TableInputCell value={preInfo.horizontalLength} onChange={(value) => onPreInfoChange("horizontalLength", value)} unit="m" />
                    <TableLabelCell>세로</TableLabelCell>
                    <TableInputCell value={preInfo.verticalLength} onChange={(value) => onPreInfoChange("verticalLength", value)} unit="m" />
                  </>
                )}
              </tr>
              <tr>
                <TableSelectableCell
                  colSpan={3}
                  label="방향" value={preInfo.orientation}
                  options={ORIENTATION_LABELS_OPTIONS}
                  onChange={(value) => onPreInfoChange("orientation", value)}
                />
              </tr>
              <tr>
                <TableLabelCell>면적</TableLabelCell>
                <TableResultCell value={area} unit="m³" />
                <TableLabelCell>측정점</TableLabelCell>
                <TableResultCell value={measurePointCnt} unit="지점" />
              </tr>
            </tbody>
          </table>
        </div>

        {/* Desktop */}
        <div className={desktopWrap}>
          <table className="w-full table-fixed border-collapse text-sm">
            <tbody>
              <tr>
                <TableLabelCell>높이</TableLabelCell>
                <TableInputCell value={preInfo.height} onChange={(value) => onPreInfoChange("height", value)} unit="m" />
                <TableSelectableCell
                  label="형태" value={preInfo.shape}
                  options={SHAPE_LABELS_OPTIONS}
                  onChange={(value) => {
                    onPreInfoChange("shape", value);
                    if (value === "CIRCULAR") onPreInfoChange("verticalLength", "");
                  }}
                />
                {preInfo.shape === "CIRCULAR" ? (
                  <>
                    <TableLabelCell>지름</TableLabelCell>
                    <TableInputCell value={preInfo.horizontalLength} onChange={(value) => onPreInfoChange("horizontalLength", value)} unit="m" />
                    <TableLabelCell> </TableLabelCell>
                    <TableLabelCell> </TableLabelCell>
                  </>
                ) : (
                  <>
                    <TableLabelCell>가로</TableLabelCell>
                    <TableInputCell value={preInfo.horizontalLength} onChange={(value) => onPreInfoChange("horizontalLength", value)} unit="m" />
                    <TableLabelCell>세로</TableLabelCell>
                    <TableInputCell value={preInfo.verticalLength} onChange={(value) => onPreInfoChange("verticalLength", value)} unit="m" />
                  </>
                )}
                <TableSelectableCell
                  label="방향" value={preInfo.orientation}
                  options={ORIENTATION_LABELS_OPTIONS}
                  onChange={(value) => onPreInfoChange("orientation", value)}
                />
              </tr>
              <tr>
                <TableLabelCell>면적</TableLabelCell>
                <TableResultCell colSpan={4} value={area} unit={<>m<sup>2</sup></>} />
                <TableLabelCell>측정점</TableLabelCell>
                <TableResultCell colSpan={4} value={measurePointCnt} unit="지점" />
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">측정점정보</h3>

        {/* Desktop */}
        <div className={desktopWrap}>
          <table className="w-full table-fixed border-collapse text-sm">
            <tbody>
              <tr>
                <TableLabelCell>배출가스온도</TableLabelCell>
                <TableInputCell value={preInfo.height} onChange={(value) => onPreInfoChange("height", value)} unit="°C" />
              </tr>
              <tr>
                <TableLabelCell>동압</TableLabelCell>
                <TableInputCell value={preInfo.height} onChange={(value) => onPreInfoChange("height", value)} unit={<>mmH<sub>2</sub>O</>} />
              </tr>
              <tr>
                <TableLabelCell>정압</TableLabelCell>
                <TableInputCell value={preInfo.height} onChange={(value) => onPreInfoChange("height", value)} unit={<>mmH<sub>2</sub>O</>} />
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
