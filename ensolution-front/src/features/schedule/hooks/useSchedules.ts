import { useState, useEffect } from "react";

import type { ScheduleTableView } from "@schedule/model";
import { getSchedules } from "@schedule/api/scheduleApi";

export const useSchedules = () => {
  const [schedules, setSchedules] = useState<ScheduleTableView[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSchedules = async () => {
    setLoading(true);
    try {
      const res = await getSchedules();
      if (res.status && res.data) {
        setSchedules(res.data);
      } else {
        setSchedules([]);
      }
    } catch (error) {
      console.error("Failed to load schedules:", error);
      setSchedules([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  return {
    schedules,
    loading,
    refetch: fetchSchedules,
  };
};
