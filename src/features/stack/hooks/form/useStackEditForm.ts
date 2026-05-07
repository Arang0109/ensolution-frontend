import { useState } from "react";

import { getDefaultStackUpdateForm } from "@/entities/stack/model";
import type { StackDetailResponse, StackUpdateForm } from "@/entities/stack/model";
import { validateStack } from "@/features/stack/lib";

import type { ValidationErrors } from "@shared/model";

export const useStackEditForm = (stack: StackDetailResponse | undefined) => {
  const workplaceId = Number(stack?.stack.workplaceId);

  const [isEditMode, setIsEditMode] = useState(false);
  const [editForm, setEditForm] = useState<StackUpdateForm>(getDefaultStackUpdateForm(workplaceId));
  const [errors, setErrors] = useState<ValidationErrors>({});

  const startEdit = () => {
    if (!stack) return;

    setEditForm({
      workplaceId: workplaceId,
      name: stack.stack.name,
      semsNumber: stack.stack.semsNumber,
      grade: stack.stack.grade,
      height: stack.stack.height,
      horizontalLength: stack.stack.horizontalLength,
      verticalLength: stack.stack.verticalLength,
      shape: stack.stack.shape,
      orientation: stack.stack.orientation,
      remark: stack.stack.remark ?? "",
    });

    setErrors({});
    setIsEditMode(true);
  };

  const cancelEdit = () => {
    setIsEditMode(false);
    setErrors({});
  };

  const updateField = (
    name: keyof StackUpdateForm,
    value: string
  ) => {
    setEditForm(prev => ({
      ...prev,
      [name]: value,
    }));

    setErrors(prev => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const validateForm = () => {
    const validationErrors = validateStack(editForm);
    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  return {
    isEditMode,
    editForm,
    errors,

    startEdit,
    cancelEdit,
    updateField,
    setIsEditMode,

    validateForm,
  };
}