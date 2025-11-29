import { useState, useEffect } from "react";
import type { StackResponse } from "@stack/model";
import { getStacks } from "@stack/api/stackApi";

export const useStacks = () => {
  const [stacks, setStacks] = useState<StackResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchStacks = async () => {
    setLoading(true);
    try {
      const res = await getStacks();
      if (res.status && res.data) {
        setStacks(res.data)
      } else {
        setStacks([]);
      } 
    } catch (error) {
      console.error("Failed to load stacks:", error);
      setStacks([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStacks();
  }, []);

  return {
    stacks,
    loading,
    refetch: fetchStacks
  }
}