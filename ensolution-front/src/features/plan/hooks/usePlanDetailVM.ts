import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// import { useToast } from "@app/providers/toast";

import { usePlanDetail } from '@plan/hooks';

export const usePlanDetailVM = () => {
  const navigate = useNavigate();
  const goBack = () => {navigate("/plan")};

  const { planId } = useParams();
  // const { showToast } = useToast();

  const { plan, fetchPlan, loading } = usePlanDetail();

  useEffect(() => {
    if (planId) {
      fetchPlan(Number(planId));
    }
  }, [planId, fetchPlan]);

  return {
    plan,
    loading,

    goBack,
    refreshPlan: fetchPlan,
  }
}