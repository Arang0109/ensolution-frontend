import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { useToast } from "@app/providers/toast";

import { useCompanyDetail, useCompanyActions, useCompanyEdit } from "@company/hooks";
import { mapUpdateFormToRequest } from "@entities/company/model";

import { useWorkplaceActions } from "@workplace/hooks";

export const useCompanyDetailViewModel = () => {
  const navigate = useNavigate();
  const goBack = () => navigate("/company");

  const { companyId } = useParams();
  const { showToast } = useToast();

  const { company, fetchCompany, loading } = useCompanyDetail();
  const { deletingId, handleDelete: deleteCompanyAction, handleUpdate } = useCompanyActions();
  const [showAddModal, setShowAddModal] = useState(false);
  const { handleCreate } = useWorkplaceActions();

  const {
    isEditMode,
    editForm,
    errors,

    startEdit,
    cancelEdit,
    handleChange,
    setIsEditMode,

    validate,
  } = useCompanyEdit(company);

  useEffect(() => {
    if (companyId) fetchCompany(Number(companyId));
  }, [companyId, fetchCompany])

  const handleSave = async () => {
    if (!companyId) return;

    if (!validate()) return;

    const payload = mapUpdateFormToRequest(editForm);
    const result = await handleUpdate(Number(companyId), payload);

    if (result.success) {
      showToast("수정에 성공했습니다.");
      setIsEditMode(false);
      fetchCompany(Number(companyId));
    } else {
      showToast(result?.message, "error");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    
    if (!companyId) return;

    const result = await deleteCompanyAction(Number(companyId));

    if (result.success) {
      showToast("삭제에 성공했습니다.");
      goBack();
    } else {
      showToast(result?.message, "error");
    }
  };

  return {
    company,
    loading,
    deletingId,

    showAddModal,
    setShowAddModal,

    editForm,
    errors,
    isEditMode,

    startEdit,
    cancelEdit,
    handleChange,

    goBack,
    handleSave,
    handleDelete,

    handleCreate,
    refreshCompany: fetchCompany,
  };
}