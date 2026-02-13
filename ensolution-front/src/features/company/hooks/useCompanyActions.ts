import { useState, useCallback } from "react";

import { registerCompany, deleteCompany, patchCompany } from "@company/api/companyApi";
import type { CompanyRegisterRequest, CompanyUpdateRequest } from "@company/model";

import type { ActionResult } from "@shared/model";

export const useCompanyActions = () => {
  const [creating, setCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const handleCreate = useCallback(
    async (data: CompanyRegisterRequest): Promise<ActionResult> => {
      setCreating(true);
      try {
        const res = await registerCompany(data);

        return {
          success: res.status,
          message: res.message ?? "등록이 완료되었습니다.",
        };

      } catch (error) {
        console.error(error);

        return {
          success: false,
          message: "등록 중 오류가 발생했습니다.",
        };
      } finally {
        setCreating(false);
      }
    },
    []
  );

  const handleDelete = useCallback(async (companyId: number): Promise<ActionResult> => {
    setDeletingId(companyId);

    try {
      const res = await deleteCompany(companyId);

      return {
        success: res.status,
        message: res.message ?? "삭제가 완료되었습니다.",
      };

    } catch (error) {
      console.error(error);

      return {
        success: false,
        message: "삭제 중 오류가 발생했습니다.",
      };
    } finally {
      setDeletingId(null);
    }
  }, []);

  const handleUpdate = useCallback(
    async (companyId: number, data: CompanyUpdateRequest): Promise<ActionResult> => {
      setUpdatingId(companyId);

      try {
        const res = await patchCompany(companyId, data);

        return {
          success: res.status,
          message: res.message ?? "수정이 완료되었습니다.",
        };

      } catch (error) {
        console.error(error);

        return {
          success: false,
          message: "수정 중 오류가 발생했습니다.",
        };
      } finally {
        setUpdatingId(null);
      }
    },
    []
  );

  return {
    creating,
    deletingId,
    updatingId,
    handleCreate,
    handleDelete,
    handleUpdate,
  };
};