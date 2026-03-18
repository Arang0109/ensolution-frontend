import { useState } from "react";

import {
  getDefaultPreventionBundleCreateForm,
  getDefaultFacilityCreateForm,
  getDefaultTargetCreateForm
 } from "@/entities/stack/model";
import type {
  PreventionCreateForm,
  FacilityCreateForm,
  TargetCreateForm,
  PreventionBundleCreateForm
} from "@/entities/stack/model";
import { validatePrevention } from "@stack/lib";

import type { ValidationErrors } from "@shared/model";

export const usePreventionCreateForm = (stackId: number) => {
  const [form, setForm] = useState<PreventionBundleCreateForm>(getDefaultPreventionBundleCreateForm(stackId));
  const [errors, setErrors] = useState<ValidationErrors>({});

  const onChangePrevention = (
    name: keyof PreventionCreateForm,
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
    name: keyof FacilityCreateForm,
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
    name: keyof TargetCreateForm,
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
        getDefaultFacilityCreateForm(),
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
        getDefaultTargetCreateForm(),
      ],
    }));
  };


  const removeTarget = (index: number) => {
    setForm(prev => ({
      ...prev,
      targets: prev.targets.filter((_, i) => i !== index),
    }))
  };

  const validate = () => {
      const validattionErrors = validatePrevention(form);
      setErrors(validattionErrors);
      return Object.keys(validattionErrors).length === 0;
    }

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
  }
}