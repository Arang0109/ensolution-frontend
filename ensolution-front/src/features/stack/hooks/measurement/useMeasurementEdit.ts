import { useState } from "react";
import { getDefaultStackMeasurementUpdateForm } from "@stack/model";
import type { StackMeasurementUpdateForm, StackMeasurementResponse } from "@stack/model";

export const useMeasurementEdit = (stackMeasurement: StackMeasurementResponse | null) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editForm, setEditForm] = useState<StackMeasurementUpdateForm>(() =>
    stackMeasurement
      ? { cycle: stackMeasurement.cycle, allowance: stackMeasurement.allowance }
      : getDefaultStackMeasurementUpdateForm()
  );

  const startEdit = () => {
    if (!stackMeasurement) return;

    console.log("use edit start");
    console.log(stackMeasurement);

    setEditForm({
      cycle: stackMeasurement.cycle,
      allowance: stackMeasurement.allowance,
    });

    setIsEditMode(true);
  };

  const cancelEdit = () => {
    setIsEditMode(false);
  };

  const handleChange = (
    name: keyof StackMeasurementUpdateForm,
    value: string
  ) => {
    setEditForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    isEditMode,
    editForm,

    startEdit,
    cancelEdit,
    handleChange,
    setIsEditMode,
  };
}