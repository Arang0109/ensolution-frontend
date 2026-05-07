import { useState } from 'react';

import type { PreventionDetailResponse } from '@/entities/stack/model';

export const useStackDetailHandlers = ({
  stackId,
  refresh,
}: {
  stackId: number;
  refresh: (stackId: number) => void;
}) => {

  const [selectedPrevention, setSelectedPrevention] = useState<PreventionDetailResponse | null>(null);
  const [showPreventionAddModal, setShowPreventionAddModal] = useState(false);
  const [showMeasurementAddModal, setShowMeasurementAddModal] = useState(false);

  const onAddMeasurement = () => {
    setShowMeasurementAddModal(true);
  };

  const closeMeasurementCreateModal = () => {
    setShowMeasurementAddModal(false);
  };

  const onMeasurementAddSuccess = () => {
    refresh(stackId);
  };

  const onAddPrevention = () => {
    setShowPreventionAddModal(true);
  };

  const closePreventionCreateModal = () => {
    setShowPreventionAddModal(false);
  };

  const openPrevention = (p: PreventionDetailResponse) => {
    setSelectedPrevention(p);
  };

  const closePrevention = () => {
    setSelectedPrevention(null);
  };

  const onPreventionEditSuccess = () => {
    refresh(stackId);
    closePrevention();
  };

  const onPreventionAddSuccess = () => {
    refresh(stackId);
  };

  return {
    selectedPrevention,
    showPreventionAddModal,
    showMeasurementAddModal,

    setShowPreventionAddModal,
    setShowMeasurementAddModal,

    openPrevention,
    closePrevention,
    closeMeasurementCreateModal,
    closePreventionCreateModal,

    onPreventionEditSuccess,
    onMeasurementAddSuccess,
    onPreventionAddSuccess,
    onAddMeasurement,
    onAddPrevention,
  };
};