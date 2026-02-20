import { useState, useCallback } from "react";

import { getStack } from "@stack/api/stackApi";

import type { StackDetailResponse } from "@stack/model";


export const useStackDetail = () => {
  const [stack, setStack] = useState<StackDetailResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchStack = useCallback(async (stackId: number) => {
    setLoading(true);
    try {
      const { status, data } = await getStack(stackId);
      setStack(status? data : null);
    } catch (error) {
      console.error(error);
      setStack(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { stack, fetchStack, loading };
};