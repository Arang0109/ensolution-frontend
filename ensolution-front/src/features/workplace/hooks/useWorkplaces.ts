import { useState, useEffect, useCallback } from "react";

import { useToast } from "@app/providers/toast";
import { getWorkplaces } from "@workplace/api/workplaceApi";

import type { WorkplaceResponse } from "@workplace/model";

export const useWorkplaces = () => {
  const [workplaces, setWorkplaces] = useState<WorkplaceResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const fetchWorkplaces = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getWorkplaces();
      
      if (!res.status || !res.data) {
        setWorkplaces([]);
        return;
      }

      setWorkplaces(res.data);

    } catch (error) {
      console.error(error);
      showToast('사업장 목록을 불러오지 못했습니다.', 'error');
      setWorkplaces([]);
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchWorkplaces();
  }, [fetchWorkplaces]);

  return {
    workplaces,
    loading,
    reload: fetchWorkplaces
  }
}