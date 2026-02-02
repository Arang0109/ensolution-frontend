import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { useCompanyDetail, useCompanyActions } from "@company/hooks";
import { useToast } from "@app/providers/toast";
import { useWorkplaceActions } from "@workplace/hooks";
import type { CompanyUpdateRequest } from "../model";
import { formatBizNumber } from "@/shared/lib";

export const useCompanyDetailPage = () => {
  const navgigate = useNavigate();
  const { companyId } = useParams();
  const { showToast } = useToast();

  const { company, fetchCompany, loading } = useCompanyDetail();
  const { isDeleting, handleDelete, handleUpdate } = useCompanyActions();
  const { handleCreate } = useWorkplaceActions();

  const [isEditMode, setIsEditMode] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const [editForm, setEditForm] = useState<CompanyUpdateRequest>({
    name: "",
    address: "",
    ceoName: "",
    bizNumber: "",
    remark: "",
  });

  useEffect(() => {
    if (companyId) fetchCompany(Number(companyId));
  }, [companyId, fetchCompany])

  const backUrl = () => navgigate("/company");

  const handleEditChange = (
    name: keyof CompanyUpdateRequest,
    value: string
  ) => {
    setEditForm(prev => ({
      ...prev,
      [name]:
        name === "bizNumber"
          ? formatBizNumber(value)
          : value,
    }));
  };

  const startEdit = () => {
    if (!company) return;

    setEditForm({
      name: company.company.name,
      address: company.company.address,
      ceoName: company.company.ceoName,
      bizNumber: company.company.bizNumber,
      remark: company.company.remark ?? "",
    });

    setIsEditMode(true);
  };

  const cancelEdit = () => setIsEditMode(false);

  const saveEdit = async () => {
    if (!companyId) return;

    const result = await handleUpdate(Number(companyId), editForm);
    showToast(result.message);

    setIsEditMode(false);
    fetchCompany(Number(companyId));
  };

  const deleteCompany = async () => {
    if (!companyId) return;

    const result = await handleDelete(Number(companyId));
    showToast(result.success ? "삭제에 성공했습니다." : "삭제에 실패했습니다.");

    if (result.success) backUrl();
  };

  return {
    company,
    loading,
    isDeleting,
    isEditMode,
    showAddModal,
    setShowAddModal,

    editForm,

    backUrl,
    startEdit,
    cancelEdit,
    saveEdit,
    deleteCompany,
    handleEditChange,

    handleCreate,
    fetchCompany,
  }
}