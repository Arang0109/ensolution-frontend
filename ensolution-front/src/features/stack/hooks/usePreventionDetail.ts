import { useState, useCallback } from "react";
import type { PreventionDetailResponse } from "@stack/model";
import { getPrevention } from "@stack/api/preventionApi";

export const usePreventionDetail = () => {
  const [prevention, setPrevention] = useState<PreventionDetailResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchStack = useCallback(async (preventionId: number) => {
    setLoading(true);
    try {
      const { status, data } = await getPrevention(preventionId);
      setPrevention(status ? data : null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { prevention, fetchStack, loading };
};