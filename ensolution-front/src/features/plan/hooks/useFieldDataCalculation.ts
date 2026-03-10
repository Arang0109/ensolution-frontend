import { useEffect } from "react";

import type { PreInfoEditForm, FieldDataEditForm, MeasurementpointEditForm } from "@plan/model";
import type { TypedEquipmentResponse } from "@equipment/model";

import { weatherCalculator, moistureCalculator, exhaustGasCalculator, measurePointCaculator } from "@plan/util";

export const useFieldDataCalculation = (
  preInfo: PreInfoEditForm,
  fieldData: FieldDataEditForm,
  onMeasurementPointChange: (index: number, name: keyof MeasurementpointEditForm, value: string) => void,
  selectedPT?: TypedEquipmentResponse
) => {
  const { atmosphericPressure } = weatherCalculator(fieldData.weather);

  const calcMoisture = moistureCalculator(fieldData, atmosphericPressure);

  const calcExhaustGas = exhaustGasCalculator(
    fieldData,
    preInfo,
    calcMoisture.moistureRatio
  );

  const calcMeasurePoint = measurePointCaculator(
    preInfo,
    fieldData,
    calcExhaustGas.gasDensity,
    atmosphericPressure,
    calcMoisture.moistureRatio,
    selectedPT
  );

  useEffect(() => {
    calcMeasurePoint.pointVelocities.forEach((v, i) => {
      const velocity = v != null ? String(v) : "";

      if (fieldData.measurementPoints[i]?.gasVelocity === velocity) return;

      onMeasurementPointChange(i, "gasVelocity", velocity);
    });

  }, [
    calcMeasurePoint.pointVelocities,
    fieldData.measurementPoints,
    onMeasurementPointChange
  ]);

  return {
    atmosphericPressure,
    calcMoisture,
    calcExhaustGas,
    calcMeasurePoint,
  }
};