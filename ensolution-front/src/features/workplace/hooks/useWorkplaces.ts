import { useState, useEffect } from "react";
import type { WorkplaceResponse } from "@workplace/model";
import { getWorkplaces } from "@workplace/api/workplaceApi";

export const useWorkplaces = () => {
  const [workplaces, setWorkplaces] = useState<WorkplaceResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchWorkplaces = async () => {
    setLoading(true);
    try {
      const res = await getWorkplaces();
      if (res.status && res.data) {
        setWorkplaces(res.data)
      } else {
        setWorkplaces([]);
      } 
    } catch (error) {
      console.error("Failed to load workplaces:", error);
      setWorkplaces([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchWorkplaces();
  }, []);

  return {
    workplaces,
    loading,
    refetch: fetchWorkplaces
  }
}