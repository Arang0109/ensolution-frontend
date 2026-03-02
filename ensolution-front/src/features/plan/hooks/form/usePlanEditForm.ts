import { useState } from "react";

import type { PlanDetailResponse, PlanDraftEditForm, PreInfoEditForm, EquipmentEditForm, FieldDataEditForm } from "@plan/model";
import { getDefaultPlanDraftEditForm } from "@plan/model";

export const usePlanEditForm = (plan: PlanDetailResponse | undefined) => {
  const [editForm, setEditForm] = useState<PlanDraftEditForm>(getDefaultPlanDraftEditForm(plan));
    
  const updatePreInfoField = (
    name: keyof PreInfoEditForm,
    value: string
  ) => {
    setEditForm(prev => ({
      ...prev,
      preInfo: {
        ...prev.preInfo,
        [name]: value,
      },
    }));
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
    updateMeasurementItems,
    resetForm,
  };
};