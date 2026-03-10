import { useState } from "react";

import type { PlanDetailResponse, PlanDraftEditForm, PreInfoEditForm, EquipmentEditForm, FieldDataEditForm, MeasurementpointEditForm } from "@plan/model";
import { getDefaultPlanDraftEditForm } from "@plan/model";
import { calcMeasurePointCnt } from "@plan/util";

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

  const updatePreInfoField = (
    name: keyof PreInfoEditForm,
    value: string
  ) => {
    setEditForm(prev => {
      const nextPreInfo = { ...prev.preInfo, [name]: value };
      const measurePointCnt = calcMeasurePointCnt(nextPreInfo);
      const syncedPoints = syncMeasurementPoints(
        prev.fieldData.measurementPoints,
        Math.ceil(measurePointCnt / 4)
      );
      return {
        ...prev,
        preInfo: nextPreInfo,
        fieldData: {
          ...prev.fieldData,
          measurementPoints: syncedPoints,
        },
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

  const updateFieldDataField = <
    S extends keyof FieldDataEditForm,
    K extends keyof FieldDataEditForm[S]
  >(
    section: S,
    name: K,
    value: string | null,
    index?: number
  ) => {
    setEditForm(prev => {
      const currentSection = prev.fieldData[section];
      const currentField = currentSection[name];

      if (index !== undefined && Array.isArray(currentField)) {
        const newArr = [...(currentField as string[])];
        newArr[index] = value ?? "";
        return {
          ...prev,
          fieldData: {
            ...prev.fieldData,
            [section]: {
              ...currentSection,
              [name]: newArr,
            },
          },
        };
      }

      return {
        ...prev,
        fieldData: {
          ...prev.fieldData,
          [section]: {
            ...currentSection,
            [name]: value,
          },
        },
      };
    });
  };

  const updateWeatherField = <
    K extends keyof FieldDataEditForm["weather"]
  >(
    name: K,
    value: string | null
  ) => {
    updateFieldDataField("weather", name, value);
  }

  const updateMoistureField = <
    K extends keyof FieldDataEditForm["moisture"]
  >(
    name: K,
    value: string | null
  ) => {
    updateFieldDataField("moisture", name, value);
  }

  const updateExhaustGasField = <
    K extends keyof FieldDataEditForm["exhaustGas"]
  >(
    name: K,
    value: string | null,
    index: number
  ) => {
    updateFieldDataField("exhaustGas", name, value, index);
  }

  const updateMeasureDataField = <
    K extends keyof FieldDataEditForm["measureData"]
  >(
    name: K,
    value: string | null
  ) => {
    updateFieldDataField("measureData", name, value);
  }

  const updateMeasurementPointField = (
    index: number,
    name: keyof MeasurementpointEditForm,
    value: string
  ) => {
    setEditForm(prev => {
      const updatedPoints = prev.fieldData.measurementPoints.map((pt, i) =>
        i === index ? { ...pt, [name]: value } : pt
      );
      return {
        ...prev,
        fieldData: {
          ...prev.fieldData,
          measurementPoints: updatedPoints,
        },
      };
    });
  };

  const updateMeasurementItems = (ids: number[]) => {
    setEditForm(prev => ({
      ...prev,
      measurementItems: { measurementItems: ids },
    }));
  };

  const resetForm = () => {
    if (plan) {
      setEditForm(getDefaultPlanDraftEditForm(plan));
    }
  };

  return {
    editForm,
    updatePreInfoField,
    updateEquipmentField,

    updateFieldDataField,
    updateWeatherField,
    updateMoistureField,
    updateExhaustGasField,

    updateMeasureDataField,
    updateMeasurementPointField,
    updateMeasurementItems,
    resetForm,
  };
};