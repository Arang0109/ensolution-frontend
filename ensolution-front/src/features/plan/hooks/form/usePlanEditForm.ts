import { useState } from "react";

import type {
  PlanDetailResponse, PlanDraftEditForm,
  PlanInfoEditForm, EquipmentEditForm,
  MeasurementpointEditForm, MeasurementItemEditForm,
  MeasurementSheetEditForm,
  WeatherEditForm, MoistureEditForm, ExhaustGasEditForm,
  SampleEditForm,
} from "@/entities/plan/model";
import {
  getDefaultPlanDraftEditForm,
  getDefaultWeatherEditForm,
  getDefaultMoistureEditForm,
  getDefaultExhaustGasEditForm,
} from "@/entities/plan/model";
import { calcMeasurePointCnt } from "@plan/util";
import type { StackMeasurementResponse } from "@/entities/stack/model";

const createEmptySample = (): SampleEditForm => ({
  startTime: "",
  endTime: "",
  suctionQuantity: "",
  gasMeterGaugePressure: "",
  inTemperature: "",
  outTemperature: "",
  beforeVolume: "",
  afterVolume: "",
  blankSampleNumber: "",
  sampleNumber: "",
  samplingVolume: "",
});

const getEmptyMeasurementPoint = (): MeasurementpointEditForm => ({
  gasTemperature: "",
  dynamicPressure: "",
  staticPressure: "",
  inEquipmentTemperature: "",
  outEquipmentTemperature: "",
  beforeEquipmentVolume: "",
  afterEquipmentVolume: "",
  measureTime: "",
  vacuumGaugePressure: "",
  finalImpingerTemperature: "",
});

const syncMeasurementPoints = (
  current: MeasurementpointEditForm[],
  newCount: number
): MeasurementpointEditForm[] => {
  if (newCount > current.length) {
    const extras = Array.from({ length: newCount - current.length }, getEmptyMeasurementPoint);
    return [...current, ...extras];
  }
  return current.slice(0, newCount);
};

export const usePlanEditForm = (plan: PlanDetailResponse | undefined) => {
  const [editForm, setEditForm] = useState<PlanDraftEditForm>(getDefaultPlanDraftEditForm(plan));

  const updatePlanInfoField = (
    name: keyof PlanInfoEditForm,
    value: string
  ) => {
    setEditForm(prev => {
      const nextPlanInfo = { ...prev.planInfo, [name]: value };
      const measurePointCnt = calcMeasurePointCnt({
        shape: nextPlanInfo.shape,
        horizontalLength: nextPlanInfo.horizontalLength,
        verticalLength: nextPlanInfo.verticalLength,
      });
      const pointCount = Math.ceil(measurePointCnt / 4);
      const syncedSheets = prev.sheets.map(sheet => ({
        ...sheet,
        measurementPoints: syncMeasurementPoints(sheet.measurementPoints, pointCount),
      }));
      return {
        ...prev,
        planInfo: nextPlanInfo,
        sheets: syncedSheets,
      };
    });
  };

  const updateEquipmentField = (
    name: keyof EquipmentEditForm,
    value: string | null
  ) => {
    setEditForm(prev => ({
      ...prev,
      equipment: {
        ...prev.equipment,
        [name]: value,
      },
    }));
  };

  const updateSheetField = <K extends keyof MeasurementSheetEditForm>(
    sheetIndex: number,
    name: K,
    value: MeasurementSheetEditForm[K]
  ) => {
    setEditForm(prev => {
      const updatedSheets = prev.sheets.map((sheet, i) =>
        i === sheetIndex ? { ...sheet, [name]: value } : sheet
      );
      return { ...prev, sheets: updatedSheets };
    });
  };

  const updateWeatherField = (
    sheetIndex: number,
    name: keyof WeatherEditForm,
    value: string | null
  ) => {
    setEditForm(prev => {
      const updatedSheets = prev.sheets.map((sheet, i) =>
        i === sheetIndex
          ? { ...sheet, weather: { ...sheet.weather, [name]: value } }
          : sheet
      );
      return { ...prev, sheets: updatedSheets };
    });
  };

  const updateMoistureField = (
    sheetIndex: number,
    name: keyof MoistureEditForm,
    value: string | null
  ) => {
    setEditForm(prev => {
      const updatedSheets = prev.sheets.map((sheet, i) =>
        i === sheetIndex
          ? { ...sheet, moisture: { ...sheet.moisture, [name]: value } }
          : sheet
      );
      return { ...prev, sheets: updatedSheets };
    });
  };

  const updateExhaustGasField = (
    sheetIndex: number,
    name: keyof ExhaustGasEditForm,
    value: string | null,
    index: number
  ) => {
    setEditForm(prev => {
      const updatedSheets = prev.sheets.map((sheet, i) => {
        if (i !== sheetIndex) return sheet;
        const currentArr = sheet.exhaustGas[name] as string[];
        const newArr = [...currentArr];
        newArr[index] = value ?? "";
        return { ...sheet, exhaustGas: { ...sheet.exhaustGas, [name]: newArr } };
      });
      return { ...prev, sheets: updatedSheets };
    });
  };

  const updateMeasurementPointField = (
    sheetIndex: number,
    pointIndex: number,
    name: keyof MeasurementpointEditForm,
    value: string
  ) => {
    setEditForm(prev => {
      const updatedSheets = prev.sheets.map((sheet, i) => {
        if (i !== sheetIndex) return sheet;
        const updatedPoints = sheet.measurementPoints.map((pt, j) =>
          j === pointIndex ? { ...pt, [name]: value } : pt
        );
        return { ...sheet, measurementPoints: updatedPoints };
      });
      return { ...prev, sheets: updatedSheets };
    });
  };

  const updateSheetSampleItems = (
    sheetIndex: number,
    primaryItemId: number | null,
    concurrentItemIds: number[]
  ) => {
    setEditForm(prev => ({
      ...prev,
      sheets: prev.sheets.map((sheet, i) => {
        if (i !== sheetIndex) return sheet;
        const newCount = (primaryItemId !== null ? 1 : 0) + concurrentItemIds.length;
        const current = sheet.samples ?? [];
        const samples = Array.from({ length: newCount }, (_, j) =>
          j < current.length ? current[j] : createEmptySample()
        );
        return { ...sheet, primaryItemId, concurrentItemIds, samples };
      }),
    }));
  };

  const updateSampleField = (
    sheetIndex: number,
    sampleIndex: number,
    name: keyof SampleEditForm,
    value: string
  ) => {
    setEditForm(prev => ({
      ...prev,
      sheets: prev.sheets.map((sheet, i) => {
        if (i !== sheetIndex) return sheet;
        const updatedSamples = sheet.samples.map((s, j) =>
          j === sampleIndex ? { ...s, [name]: value } : s
        );
        return { ...sheet, samples: updatedSamples };
      }),
    }));
  };

  const updateMeasurementItemField = (
    stackMeasurementId: number,
    name: keyof MeasurementItemEditForm,
    value: string
  ) => {
    setEditForm(prev => ({
      ...prev,
      measurementItems: prev.measurementItems.map(item =>
        item.stackMeasurementId === stackMeasurementId
          ? { ...item, [name]: value }
          : item
      ),
    }));
  };

  const updateMeasurementItems = (selected: StackMeasurementResponse[]) => {
    setEditForm(prev => {
      const kept = prev.measurementItems.filter(item =>
        selected.some(sm => sm.id === item.stackMeasurementId)
      );
      const keptIds = kept.map(item => item.stackMeasurementId);
      const newItems: MeasurementItemEditForm[] = selected
        .filter(sm => !keptIds.includes(sm.id))
        .map(sm => ({
          stackMeasurementId: sm.id,
          pollutantId: sm.pollutant.id,
          pollutantNameKr: sm.pollutant.nameKr,
          pollutantNameEn: sm.pollutant.nameEn,
          method: sm.pollutant.method,
          testEquipment: sm.pollutant.equipmentName,
          testMethod: sm.pollutant.testMethodName,
          samplingTime: sm.pollutant.samplingTime,
          samplingVolume: sm.pollutant.samplingVolume,
          cycle: sm.cycle,
          allowance: sm.allowance,
          startTime: "",
          endTime: "",
        }));
      return { ...prev, measurementItems: [...kept, ...newItems] };
    });
  };

  const addSheet = () => {
    setEditForm(prev => {
      const pointCount = Math.ceil(calcMeasurePointCnt({
        shape: prev.planInfo.shape,
        horizontalLength: prev.planInfo.horizontalLength,
        verticalLength: prev.planInfo.verticalLength,
      }) / 4) || 1;
      const newSheet: MeasurementSheetEditForm = {
        category: "OTHER",
        referenceNumber: "",
        primaryItemId: null,
        concurrentItemIds: [],
        weather: getDefaultWeatherEditForm(undefined),
        moisture: getDefaultMoistureEditForm(undefined),
        exhaustGas: getDefaultExhaustGasEditForm(undefined),
        measurementPoints: Array.from({ length: pointCount }, getEmptyMeasurementPoint),
        samples: [],
        quantity: "",
        pitotTubeCoefficient: "",
        nozzleSize: "",
        startTime: "",
        endTime: "",
      };
      return { ...prev, sheets: [...prev.sheets, newSheet] };
    });
  };

  const removeSheet = (index: number) => {
    setEditForm(prev => ({
      ...prev,
      sheets: prev.sheets.filter((_, i) => i !== index),
    }));
  };

  const resetForm = () => {
    if (plan) {
      setEditForm(getDefaultPlanDraftEditForm(plan));
    }
  };

  return {
    editForm,
    updatePlanInfoField,
    updateEquipmentField,
    updateSheetField,
    updateWeatherField,
    updateMoistureField,
    updateExhaustGasField,
    updateMeasurementPointField,
    updateMeasurementItems,
    updateSheetSampleItems,
    updateSampleField,
    updateMeasurementItemField,
    addSheet,
    removeSheet,
    resetForm,
  };
};
