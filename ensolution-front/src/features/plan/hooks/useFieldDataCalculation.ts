import type { PlanInfoEditForm, MeasurementSheetEditForm } from "@/entities/plan/model";
import type { TypedEquipmentResponse } from "@/entities/agency/equipment/model";

import { weatherCalculator, moistureCalculator, exhaustGasCalculator, measurePointCaculator } from "@plan/util";

export const useFieldDataCalculation = (
  planInfo: PlanInfoEditForm,
  sheet: MeasurementSheetEditForm,
  selectedPT?: TypedEquipmentResponse
) => {
  const { atmosphericPressure } = weatherCalculator(sheet.weather);

  const calcMoisture = moistureCalculator(sheet, atmosphericPressure);

  const calcExhaustGas = exhaustGasCalculator(
    sheet,
    planInfo,
    calcMoisture.moistureRatio
  );

  const calcMeasurePoint = measurePointCaculator(
    planInfo,
    sheet,
    calcExhaustGas.gasDensity,
    atmosphericPressure,
    calcMoisture.moistureRatio,
    selectedPT
  );

  return {
    atmosphericPressure,
    calcMoisture,
    calcExhaustGas,
    calcMeasurePoint,
  }
};