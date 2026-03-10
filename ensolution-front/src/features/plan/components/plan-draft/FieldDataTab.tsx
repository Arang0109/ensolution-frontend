import type { TypedEquipmentResponse } from "@equipment/model";
import type { PreInfoEditForm, FieldDataEditForm, MeasurementpointEditForm } from "@plan/model";
import { useFieldDataCalculation } from "@plan/hooks";
import {
  WeatherSection, MoistureSection, ExhaustGasSection, StackProfileSection, MeasurementPointSection
} from "@plan/components";

interface FieldDataTabProps {
  preInfo: PreInfoEditForm;
  fieldData: FieldDataEditForm;

  onPreInfoChange: (name: keyof PreInfoEditForm, value: string) => void;
  onWeatherChange: (name: keyof FieldDataEditForm["weather"], value: string) => void;
  onMoistureChange: (name: keyof FieldDataEditForm["moisture"], value: string) => void;
  onExhaustGasChange: (name: keyof FieldDataEditForm["exhaustGas"], value: string, index: number) => void;
  onMeasureDataChange: (name: keyof FieldDataEditForm["measureData"], value: string) => void;
  onMeasurementPointChange: (index: number, name: keyof MeasurementpointEditForm, value: string) => void;

  selectedPS?: TypedEquipmentResponse;
  selectedGS?: TypedEquipmentResponse;
  selectedPT?: TypedEquipmentResponse;
  selectedNZ?: TypedEquipmentResponse;

  isParticle: boolean;
}

// ─── 모바일 카드 스타일 상수 ────────────────────────────────────────
const mobileWrap = "sm:hidden rounded-lg border border-gray-200 overflow-hidden";
const desktopWrap = "hidden sm:block rounded-lg border border-gray-200 overflow-hidden";

export const FieldDataTab = ({
  preInfo,
  fieldData,
  onPreInfoChange,
  onWeatherChange,
  onMoistureChange,
  onExhaustGasChange,
  onMeasureDataChange,
  onMeasurementPointChange,
  selectedPT,
  selectedNZ,

  isParticle,
}: FieldDataTabProps) => {

  const {
    atmosphericPressure,
    calcMoisture,
    calcExhaustGas,
    calcMeasurePoint,
  } = useFieldDataCalculation(preInfo, fieldData, onMeasurementPointChange, selectedPT);

  return (
    <div className="space-y-6">

      {/* ── 기상정보 ─────────────────────────────────── */}
      <WeatherSection
        mobileWrap={mobileWrap}
        desktopWrap={desktopWrap}

        weather={fieldData.weather}
        onChange={onWeatherChange}

        atmosphericPressure={atmosphericPressure}
      />

      {/* ── 수분량정보 ────────────────────────────────── */}
      <MoistureSection
        mobileWrap={mobileWrap}
        desktopWrap={desktopWrap}

        moisture={fieldData.moisture}
        onChange={onMoistureChange}

        weightDiff={calcMoisture.weightDiff}
        tempAvg={calcMoisture.tempAvg}
        dryVolumeDiff={calcMoisture.dryVolumeDiff}
        pressureToMmHg={calcMoisture.pressureToMmHg}
        pressureToInchH2O={calcMoisture.pressureToInchH2O}
        
        moistureRatio={calcMoisture.moistureRatio}
      />

      {/* ── 배출가스정보 ──────────────────────────────── */}
      <ExhaustGasSection
        mobileWrap={mobileWrap}
        desktopWrap={desktopWrap}

        exhaustGas={fieldData.exhaustGas}
        onChange={onExhaustGasChange}

        standardOxygen={preInfo.standardOxygen}

        o2ConcentrationAvg={calcExhaustGas.o2ConcentrationAvg}
        co2ConcentrationAvg={calcExhaustGas.co2ConcentrationAvg}
        coConcentrationAvg={calcExhaustGas.coConcentrationAvg}
        n2ConcentrationAvg={calcExhaustGas.n2ConcentrationAvg}
        noxConcentrationAvg={calcExhaustGas.noxConcentrationAvg}
        soxConcentrationAvg={calcExhaustGas.soxConcentrationAvg}
        oxygenCorrectionFactor={calcExhaustGas.oxygenCorrectionFactor}
        gasDensity={calcExhaustGas.gasDensity}
      />

      <StackProfileSection
        mobileWrap={mobileWrap}
        desktopWrap={desktopWrap}

        preInfo={preInfo}
        onChange={onPreInfoChange}

        stackArea={calcMeasurePoint.area}
        measurePointCnt={calcMeasurePoint.measurePointCnt}
      />

      <MeasurementPointSection
        fieldData={fieldData}
        onChange={onMeasurementPointChange}
        onMeasureDataChange={onMeasureDataChange}

        measurePointLength={calcMeasurePoint.measurePointLength}
        AvgGasTemp={calcMeasurePoint.AvgGasTemp}
        AvgPd={calcMeasurePoint.AvgPd}
        AvgPs={calcMeasurePoint.AvgPs}
        avgInTemp={calcMeasurePoint.avgInTemp}
        avgOutTemp={calcMeasurePoint.avgOutTemp}

        standardDensity={calcMeasurePoint.standardDensity}
        gasVelocity={calcMeasurePoint.gasVelocity}
        pointVelocities={calcMeasurePoint.pointVelocities}
        pitotTubeCoefficient={calcMeasurePoint.pitotTubeCoefficient}
        quantity={calcMeasurePoint.quantity}
        standardQuantity={calcMeasurePoint.standardQuantity}

        selectedNZ={selectedNZ}

        isParticle={isParticle}
      />
    </div>
  );
};