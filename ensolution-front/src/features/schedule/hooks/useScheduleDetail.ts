import { useState, useEffect } from "react";
import type { ScheduleResponse } from "@schedule/model";
import { getSchedules } from "@schedule/api/scheduleApi";

export const useScheduleDetail = (scheduleId: number) => {
  const [schedule, setSchedule] = useState<ScheduleResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSchedule = async () => {
      setLoading(true);
      try {
        // Note: Since there's no getSchedule(id) API, we fetch all and filter
        // You may want to add a getSchedule(id) API endpoint later
        const res = await getSchedules();
        if (res.status && res.data) {
          const found = res.data.find(s => s.id === scheduleId);
          setSchedule(found || null);
        } else {
          setSchedule(null);
        }
      } catch (error) {
        console.error("Failed to load schedule:", error);
        setSchedule(null);
      } finally {
        setLoading(false);
      }
    };

    if (scheduleId) {
      fetchSchedule();
    }
  }, [scheduleId]);

  return { schedule, loading };
};
