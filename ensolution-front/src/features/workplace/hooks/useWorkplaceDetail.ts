import { useState, useCallback } from "react";

import { getWorkplace } from "@workplace/api/workplaceApi";

import type { WorkplaceDetailResponse } from "@workplace/model";

export const useWorkplaceDetail = () => {
  const [workplace, setWorkplace] = useState<WorkplaceDetailResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchWorkplace = useCallback(async (workplaceId: number) => {
    setLoading(true);
    try {
      const { status, data } = await getWorkplace(workplaceId);
      setWorkplace(status ? data : null);
    } catch (error) {
      console.error(error);
      setWorkplace(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { workplace, fetchWorkplace, loading };
};