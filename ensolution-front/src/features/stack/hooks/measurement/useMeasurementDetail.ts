import { useState, useCallback } from "react";

import { getStackMeasurement } from "@stack/api/stackMeasurementApi";

import type { StackMeasurementResponse } from "@stack/model";


export const useMeasurementDetail = () => {
  const [stackMeasurement, setStackMeasurement] = useState<StackMeasurementResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchStackMeasurement = useCallback(async (stackMeasurementId: number) => {
    setLoading(true);
    try {
      const { status, data } = await getStackMeasurement(stackMeasurementId);
      setStackMeasurement(status? data : null);
    } catch (error) {
      console.error(error);
      setStackMeasurement(null);
    } finally {
      setLoading(false)
    }
  }, []);

  return { stackMeasurement, fetchStackMeasurement, loading };
};