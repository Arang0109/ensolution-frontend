import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { useToast } from "@app/providers/toast";

import { useCompanyDetail, useCompanyActions, useCompanyEdit } from "@company/hooks";
import { mapCreateFormToRequest } from "@company/model";

import { useWorkplaceActions } from "@workplace/hooks";

export const useCompanyDetailViewModel = () => {
  const navgigate = useNavigate();
  const { companyId } = useParams();
  const { showToast } = useToast();

  const { company, fetchCompany, loading } = useCompanyDetail();
  const { deletingId, handleDelete, handleUpdate } = useCompanyActions();
  const [showAddModal, setShowAddModal] = useState(false);
  const { handleCreate } = useWorkplaceActions();

  const {
    isEditMode,
    editForm,
    errors,

    startEdit,
    cancelEdit,
    handleEditChange,
    setIsEditMode,

    validate,
  } = useCompanyEdit(company);

  useEffect(() => {
    if (companyId) fetchCompany(Number(companyId));
  }, [companyId, fetchCompany])

  const backUrl = () => navgigate("/company");

  const saveEdit = async () => {
    if (!companyId) return;

    if (!validate()) return;

    const payload = mapCreateFormToRequest(editForm);
    const result = await handleUpdate(Number(companyId), payload);

    if (result.success) {
      showToast("수정에 성공했습니다.");
      setIsEditMode(false);
      fetchCompany(Number(companyId));
    } else {
      showToast("수정에 실패했습니다.");
    }
  };

  const deleteCompany = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    
    if (!companyId) return;

    const result = await handleDelete(Number(companyId));
    showToast(result.success ? "삭제에 성공했습니다." : "삭제에 실패했습니다.");

    if (result.success) backUrl();
  };

  return {
    company,
    loading,
    deletingId,
    showAddModal,
    setShowAddModal,
    errors,
    
    editForm,
    isEditMode,
    startEdit,
    cancelEdit,
    handleEditChange,

    backUrl,
    saveEdit,
    deleteCompany,

    handleCreate,
    fetchCompany,
  }
}