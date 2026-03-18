import { useState } from "react";

import { getDefaultWorkplaceUpdateForm } from "@entities/workplace/model";
import type { WorkplaceDetailResponse, WorkplaceUpdateForm } from "@entities/workplace/model";
import { validateWorkplace } from "@workplace/lib";

import type { ValidationErrors } from "@shared/model";
import { formatBizNumber } from "@shared/lib";

export const useWorkplaceEdit = (workplace: WorkplaceDetailResponse | null) => {
  const companyId = Number(workplace?.workplace.companyId);

  const [isEditMode, setIsEditMode] = useState(false);
  const [editForm, setEditForm] = useState<WorkplaceUpdateForm>(getDefaultWorkplaceUpdateForm(companyId));
  const [errors, setErrors] = useState<ValidationErrors>({});

  const startEdit = () => {
    if (!workplace) return;

    setEditForm({
      companyId: companyId,
      name: workplace.workplace.name,
      address: workplace.workplace.address,
      bizNumber: workplace.workplace.bizNumber,
      businessCategory: workplace.workplace.businessCategory,
      grade: workplace.workplace.grade,
      remark: workplace.workplace.remark ?? "",
    });

    setErrors({});
    setIsEditMode(true);
  };

  const cancelEdit = () => {
    setIsEditMode(false);
    setErrors({});
  };

  const handleChange = (
    name: keyof WorkplaceUpdateForm,
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
    const validationErrors = validateWorkplace(editForm);
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
}