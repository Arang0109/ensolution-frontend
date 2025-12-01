import { useState, useCallback } from "react";
import type { StackDetailWithPreventionsResponse, PreventionDetailResponse } from "@stack/model";
import { getStack } from "@stack/api/stackApi";
import { getPrevention } from "@stack/api/preventionApi";

export const useStackDetail = () => {
  const [stack, setStack] = useState<StackDetailWithPreventionsResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchStack = useCallback(async (stackId: number) => {
    setLoading(true);
    try {
      const { status, data } = await getStack(stackId);

      if (status && data) {
        // 각 방지시설의 상세 정보(배출시설, 제거대상물질 포함)를 가져옴
        const preventionsWithDetails: PreventionDetailResponse[] = await Promise.all(
          data.preventions.map(async (preventionResponse) => {
            const preventionDetailRes = await getPrevention(preventionResponse.id);
            return preventionDetailRes.status && preventionDetailRes.data
              ? preventionDetailRes.data
              : {
                  prevention: preventionResponse,
                  facilities: [],
                  targets: []
                };
          })
        );

        setStack({
          stack: data.stack,
          preventions: preventionsWithDetails
        });
      } else {
        setStack(null);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { stack, fetchStack, loading };
};