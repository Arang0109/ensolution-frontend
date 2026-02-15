import { useState, useCallback } from "react";

import { getPrevention } from "@stack/api/preventionApi";

import type { PreventionDetailResponse } from "@stack/model";

export const usePreventionDetail = () => {
  const [prevention, setPrevention] = useState<PreventionDetailResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchStack = useCallback(async (preventionId: number) => {
    setLoading(true);
    try {
      const { status, data } = await getPrevention(preventionId);
      setPrevention(status ? data : null);
    } catch (error) {
      console.error(error);
      setPrevention(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { prevention, fetchStack, loading };
};