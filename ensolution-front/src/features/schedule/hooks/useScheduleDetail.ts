import { useState, useEffect } from "react";
import type { ScheduleDetailResponse } from "@schedule/model";
import { getSchedule } from "@schedule/api/scheduleApi";

export const useScheduleDetail = (scheduleId: number) => {
  const [scheduleDetail, setScheduleDetail] = useState<ScheduleDetailResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSchedule = async () => {
      setLoading(true);
      try {
        const res = await getSchedule(scheduleId);
        if (res.status && res.data) {
          setScheduleDetail(res.data);
        } else {
          setScheduleDetail(null);
        }
      } catch (error) {
        console.error("Failed to load schedule:", error);
        setScheduleDetail(null);
      } finally {
        setLoading(false);
      }
    };

    if (scheduleId) {
      fetchSchedule();
    }
  }, [scheduleId]);

  return { scheduleDetail, loading };
};
