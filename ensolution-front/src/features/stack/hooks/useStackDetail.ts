import { useState, useCallback } from "react";
import type { StackDetailResponse } from "@stack/model";
import { getStack } from "@stack/api/stackApi";

export const useStackDetail = () => {
  const [stack, setStack] = useState<StackDetailResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchStack = useCallback(async (stackId: number) => {
    setLoading(true);
    try {
      const { status, data } = await getStack(stackId);
      setStack(status ? data : null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { stack, fetchStack, loading };
};