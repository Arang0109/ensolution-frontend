import { useState } from "react";

import {
  getDefaultFacilityUpdateForm,
  getDefaultTargetUpdateForm,
} from "@/entities/stack/model";
import type {
  PreventionDetailResponse,
  PreventionUpdateForm,
  FacilityUpdateForm,
  TargetUpdateForm,
  PreventionBundleUpdateForm,
} from "@/entities/stack/model";
import { validatePrevention } from "@stack/lib";

import type { ValidationErrors } from "@shared/model";

const mapDetailToForm = (detail: PreventionDetailResponse): PreventionBundleUpdateForm => ({
  prevention: {
    name: detail.prevention.name,
    remark: detail.prevention.remark,
  },
  facilities: detail.facilities.map(f => ({
    id: f.id,
    name: f.name,
    fuelUsage: f.fuelUsage,
    itemOutput: f.itemOutput,
    fuelInput: f.fuelInput,
    fuelType: f.fuelType,
    remark: f.remark,
  })),
  targets: detail.targets.map(t => ({
    id: t.id,
    targetSubstance: t.targetSubstance,
    removalEfficiency: t.removalEfficiency,
  })),
});

export const usePreventionEditForm = (preventionDetail: PreventionDetailResponse) => {
  const [form, setForm] = useState<PreventionBundleUpdateForm>(mapDetailToForm(preventionDetail));
  const [errors, setErrors] = useState<ValidationErrors>({});

  const onChangePrevention = (
    name: keyof PreventionUpdateForm,
    value: string
  ) => {
    setForm(prev => ({
      ...prev,
      prevention: {
        ...prev.prevention,
        [name]: value,
      },
    }));
  };

  const onChangeFacility = (
    index: number,
    name: keyof FacilityUpdateForm,
    value: string
  ) => {
    setForm(prev => {
      const updated = [...prev.facilities];
      updated[index] = {
        ...updated[index],
        [name]: value,
      };

      return {
        ...prev,
        facilities: updated,
      };
    });
  };

  const onChangeTarget = (
    index: number,
    name: keyof TargetUpdateForm,
    value: string
  ) => {
    setForm(prev => {
      const updated = [...prev.targets];
      updated[index] = {
        ...updated[index],
        [name]: value,
      };

      return {
        ...prev,
        targets: updated,
      };
    });
  };

  const addFacility = () => {
    setForm(prev => ({
      ...prev,
      facilities: [
        ...prev.facilities,
        getDefaultFacilityUpdateForm(null),
      ],
    }));
  };

  const removeFacility = (index: number) => {
    setForm(prev => ({
      ...prev,
      facilities: prev.facilities.filter((_, i) => i !== index),
    }));
  };

  const addTarget = () => {
    setForm(prev => ({
      ...prev,
      targets: [
        ...prev.targets,
        getDefaultTargetUpdateForm(null),
      ],
    }));
  };

  const removeTarget = (index: number) => {
    setForm(prev => ({
      ...prev,
      targets: prev.targets.filter((_, i) => i !== index),
    }));
  };

  const validate = () => {
    const validationErrors = validatePrevention(form);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  return {
    form,
    errors,

    addFacility,
    removeFacility,
    addTarget,
    removeTarget,

    onChangePrevention,
    onChangeFacility,
    onChangeTarget,

    validate,
  };
};
