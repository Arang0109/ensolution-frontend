import { useState, useCallback } from "react";
import { deleteSchedule, patchSchedule, patchScheduleStatus } from "@schedule/api/scheduleApi";
import type { ScheduleUpdateRequest, ScheduleStatusUpdateRequest } from "@schedule/model";

export const useScheduleActions = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleDelete = useCallback(async (scheduleId: number) => {
    if (!window.confirm("정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.")) {
      return { success: false, message: "삭제가 취소되었습니다." };
    }

    setIsDeleting(true);
    try {
      const res = await deleteSchedule(scheduleId);
      return { success: res.status, message: res.message };
    } catch {
      return { success: false, message: "삭제 중 오류가 발생했습니다." };
    } finally {
      setIsDeleting(false);
    }
  }, []);

  const handleUpdate = useCallback(async (scheduleId: number, data: ScheduleUpdateRequest) => {
    setIsUpdating(true);
    try {
      const res = await patchSchedule(scheduleId, data);
      return { success: res.status, message: res.message };
    } catch {
      return { success: false, message: "수정 중 오류가 발생했습니다." };
    } finally {
      setIsUpdating(false);
    }
  }, []);

  const handleStatusUpdate = useCallback(async (scheduleId: number, data: ScheduleStatusUpdateRequest) => {
    setIsUpdating(true);
    try {
      const res = await patchScheduleStatus(scheduleId, data);
      return { success: res.status, message: res.message };
    } catch {
      return { success: false, message: "상태 변경 중 오류가 발생했습니다." };
    } finally {
      setIsUpdating(false);
    }
  }, []);

  return {
    isDeleting,
    isUpdating,
    handleDelete,
    handleUpdate,
    handleStatusUpdate,
  };
};
