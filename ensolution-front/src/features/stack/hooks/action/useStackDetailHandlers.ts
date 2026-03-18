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

  const openPrevention = (p: PreventionDetailResponse) => {
    setSelectedPrevention(p);
  };

  const closePrevention = () => {
    setSelectedPrevention(null);
  };

  const closeMeasurementCreateModal = () => {
    setShowMeasurementAddModal(false)
  }

  const onPreventionEditSuccess = () => {
    refresh(stackId);
    closePrevention();
  };

  const onAddMeasurement = () => {
    setShowMeasurementAddModal(true);
  };

  const onAddPrevention = () => {
    setShowPreventionAddModal(true);
  };

  const onMeasurementAddSuccess = () => {
    refresh(stackId);
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

    onPreventionEditSuccess,
    onMeasurementAddSuccess,
    onPreventionAddSuccess,
    onAddMeasurement,
    onAddPrevention,
  };
};