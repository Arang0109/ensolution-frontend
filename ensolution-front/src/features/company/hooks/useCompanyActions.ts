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
          message: res.message,
        };

      } finally {
        setCreating(false);
      }
    },
    []
  );

  const handleDelete = useCallback(
    async (companyId: number): Promise<ActionResult> => {
      setDeletingId(companyId);

      try {
        const res = await deleteCompany(companyId);

        return {
          success: res.status,
          message: res.message,
        };
      } finally {
        setDeletingId(null);
      }
    },
    []
  );

  const handleUpdate = useCallback(
    async (companyId: number, data: CompanyUpdateRequest): Promise<ActionResult> => {
      setUpdatingId(companyId);

      try {
        const res = await patchCompany(companyId, data);

        return {
          success: res.status,
          message: res.message,
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