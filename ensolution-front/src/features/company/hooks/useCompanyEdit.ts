import { useState } from "react";

import { getDefaultCompanyUpdateForm } from "@entities/company/model";
import type { CompanyDetailResponse, CompanyUpdateForm } from "@entities/company/model";
import { validateCompany } from "@company/lib";

import type { ValidationErrors } from "@shared/model";
import { formatBizNumber } from "@shared/lib";

export const useCompanyEdit = (company: CompanyDetailResponse | null) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editForm, setEditForm] = useState<CompanyUpdateForm>(getDefaultCompanyUpdateForm());
  const [errors, setErrors] = useState<ValidationErrors>({});

  const startEdit = () => {
    if (!company) return;

    setEditForm({
      name: company.company.name,
      address: company.company.address,
      ceoName: company.company.ceoName,
      bizNumber: company.company.bizNumber,
      remark: company.company.remark ?? "",
    });

    setErrors({});
    setIsEditMode(true);
  };

  const cancelEdit = () => {
    setIsEditMode(false);
    setErrors({});
  };

  const handleChange = (
    name: keyof CompanyUpdateForm,
    value: string
  ) => {
    const formattedValue =
      name === "bizNumber" ? formatBizNumber(value) : value;

    setEditForm(prev => ({
      ...prev,
      [name]: formattedValue,
    }));

    setErrors(prev => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const validate = () => {
    const validationErrors = validateCompany(editForm);
    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  return {
    isEditMode,
    editForm,
    errors,

    startEdit,
    cancelEdit,
    handleChange,
    setIsEditMode,

    validate,
  };
};