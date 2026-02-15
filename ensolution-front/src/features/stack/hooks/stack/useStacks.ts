import { useState, useEffect, useCallback } from "react";

import type { StackResponse } from "@stack/model";
import { getStacks } from "@stack/api/stackApi";

export const useStacks = () => {
  const [stacks, setStacks] = useState<StackResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStacks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getStacks();

      if (!res.status || !res.data) {
        setStacks([]);
        return;
      }

      setStacks(res.data);

    } catch (error) {
      console.error(error);
      setError('측정시설 목록을 불러오지 못했습니다.');
      setStacks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStacks();
  }, [fetchStacks]);

  return {
    stacks,
    loading,
    error,
    reload: fetchStacks
  }
}