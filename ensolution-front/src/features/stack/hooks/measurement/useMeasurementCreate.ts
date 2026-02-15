import { useState } from "react";

import { getDefaultStackMeasurementCreateForm } from "@stack/model";
import type { StackMeasurementCreateForm } from "@stack/model";

export const useMeasurementCreate = (stackId: number) => {
  // pollutant ID 초기값 : null
  const [form, setForm] = useState<StackMeasurementCreateForm[]>([getDefaultStackMeasurementCreateForm(stackId)])

  const onChange = (
    index: number,
    name: keyof StackMeasurementCreateForm,
    value: string | number | null
  ) => {
    setForm(prev => {
      const updated = [...prev];

      updated[index] = {
        ...updated[index],
        [name]: value,
      };

      return updated;
    });
  };

  const addMeasurement = () => {
    setForm(prev => [
      ...prev,
      getDefaultStackMeasurementCreateForm(stackId),
    ]);
  }

  const removeMeasurement = (index: number) => {
    setForm(prev =>
      prev.filter((_, i) => i !== index)
    );
  };
  
  return {
    form,
    addMeasurement,
    removeMeasurement,
    onChange,
  };
};