import { useState, useCallback } from "react";

import { getStack } from "@stack/api/stackApi";

import type { StackDetailResponse } from "@stack/model";


export const useStackDetailQuery = () => {
  const [stack, setStack] = useState<StackDetailResponse | undefined>();
  const [loading, setLoading] = useState(false);

  const fetchStack = useCallback(async (stackId: number) => {
    setLoading(true);
    try {
      const { data } = await getStack(stackId);
      setStack(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { stack, fetchStack, loading };
};