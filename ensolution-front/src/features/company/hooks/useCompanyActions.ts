import { useState, useCallback } from "react";
import { deleteCompany, patchCompany } from "@company/api/companyApi";
import type { CompanyUpdateRequest } from "@company/model";

export const useCompanyActions = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleDelete = useCallback(async (companyId: number) => {
    if (!window.confirm("정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.")) {
      return { success: false, message: "삭제가 취소되었습니다." };
    }

    setIsDeleting(true);
    try {
      const res = await deleteCompany(companyId);
      return { success: res.status, message: res.message };
    } catch {
      return { success: false, message: "삭제 중 오류가 발생했습니다." };
    } finally {
      setIsDeleting(false);
    }
  }, []);

  const handleUpdate = useCallback(async (companyId: number, data: CompanyUpdateRequest) => {
    setIsUpdating(true);
    try {
      const res = await patchCompany(companyId, data);
      return { success: res.status, message: res.message };
    } catch {
      return { success: false, message: "수정 중 오류가 발생했습니다." };
    } finally {
      setIsUpdating(false);
    }
  }, []);

  return {
    isDeleting,
    isUpdating,
    handleDelete,
    handleUpdate,
  };
};
