import { useState } from "react";

import { getDefaultPollutantEditForm } from "@pollutant/model";
import type { PollutantResponse, PollutantEditForm } from "@pollutant/model";
import { validatePollutant } from "@pollutant/lib";

import type { ValidationErrors } from "@shared/model";

export const usePollutantEdit = (pollutant: PollutantResponse) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editForm, setEditForm] = useState<PollutantEditForm>(getDefaultPollutantEditForm());
  const [errors, setErrors] = useState<ValidationErrors>({});

  const startEdit = () => {
    if (!pollutant) return;

    setEditForm({
      nameKr: pollutant.nameKr,
      nameEn: pollutant.nameEn,
      method: pollutant.method,
      phase: pollutant.phase,
      equipmentName: pollutant.equipmentName,
      testMethodName: pollutant.testMethodName,
      samplingTime: pollutant.samplingTime,
      samplingVolume: pollutant.samplingVolume,
    });
    
    setErrors({});
    setIsEditMode(true);
  };

  const cancelEdit = () => {
    setIsEditMode(false);
    setErrors({});
  };

  const handleChange = (
    name: keyof PollutantEditForm,
    value: string
  ) => {

    setEditForm(prev => ({
      ...prev,
      [name]: value,
    }));

    setErrors(prev => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const validate = () => {
      const validationErrors = validatePollutant(editForm);
      setErrors(validationErrors);
  
      return Object.keys(validationErrors).length === 0;
    };

  return {
    isEditMode,
    editForm,
    errors,

    startEdit,
    cancelEdit,
    handleChange,
    setIsEditMode,

    validate,
  };
}