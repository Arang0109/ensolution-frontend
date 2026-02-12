import axios from "axios";
import { useState, useEffect, useMemo } from "react";

import { registerPlan } from "@plan/api/planApi";
import { getWorkplaces } from "@workplace/api/workplaceApi";
import { getTeams } from "@agency/api/AgencyApi";
import { usePlanFormStore } from "@plan/store/usePlanFormStore";
import { toRegisterRequest } from "@plan/model";
import type { PlanFormData, MeasurementType, MeasurementField } from "@plan/model";

export const usePlanForm = () => {
  const {
    form,
    workplaces,
    teams,
    availableStacks,
    availableMeasurements,
    selectedStack,
    selectedWorkplace,
    loading,
    loadingStacks,
    loadingMeasurements,
    workplaceSearchTerm,
    stackSearchTerm,
    teamSearchTerm,
    setFieldValue,
    setWorkplaces,
    setTeams,
    setAvailableStacks,
    setAvailableMeasurements,
    setSelectedStack,
    setSelectedWorkplace,
    setLoading,
    setLoadingStacks,
    setLoadingMeasurements,
    setWorkplaceSearchTerm,
    setStackSearchTerm,
    setTeamSearchTerm,
    resetForm,
    clearStackData,
  } = usePlanFormStore();

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch workplaces and teams on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [workplacesRes, teamsRes] = await Promise.all([
          getWorkplaces(),
          getTeams()
        ]);

        if (workplacesRes.status && workplacesRes.data) {
          setWorkplaces(workplacesRes.data);
        }

        if (teamsRes.status && teamsRes.data) {
          setTeams(teamsRes.data);
        }
      } catch (error) {
        console.error("데이터 로딩 중 오류:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setLoading, setWorkplaces, setTeams]);

  // Filtered data based on search
  const filteredWorkplaces = useMemo(() =>
    workplaces.filter((workplace) =>
      workplace.name.toLowerCase().includes(workplaceSearchTerm.toLowerCase())
    ),
    [workplaces, workplaceSearchTerm]
  );

  const filteredStacks = useMemo(() =>
    availableStacks.filter((stack) =>
      stack.name.toLowerCase().includes(stackSearchTerm.toLowerCase()) ||
      stack.semsNumber.toLowerCase().includes(stackSearchTerm.toLowerCase())
    ),
    [availableStacks, stackSearchTerm]
  );

  const filteredTeams = useMemo(() =>
    teams.filter((team) =>
      team.name.toLowerCase().includes(teamSearchTerm.toLowerCase())
    ),
    [teams, teamSearchTerm]
  );

  // Fetch stacks when workplace is selected
  const handleWorkplaceChange = async (workplaceId: number) => {
    setFieldValue('workplaceId', workplaceId);
    setFieldValue('stackId', 0);
    setFieldValue('measurementIds', []);
    clearStackData();

    // Find and set the selected workplace
    const workplace = workplaces.find(w => w.id === workplaceId);
    setSelectedWorkplace(workplace || null);

    if (workplaceId) {
      try {
        setLoadingStacks(true);
        const { getWorkplace } = await import("@workplace/api/workplaceApi");
        const res = await getWorkplace(workplaceId);

        if (res.status && res.data) {
          setAvailableStacks(res.data.stacks);
        }
      } catch (error) {
        console.error("사업장 상세 정보 로딩 중 오류:", error);
      } finally {
        setLoadingStacks(false);
      }
    }
  };

  // Fetch stack measurements when stack is selected
  useEffect(() => {
    const fetchStackMeasurements = async () => {
      if (!form.stackId) {
        setAvailableMeasurements([]);
        setSelectedStack(null);
        return;
      }

      try {
        setLoadingMeasurements(true);
        const { getStack } = await import("@stack/api/stackApi");
        const res = await getStack(form.stackId);

        if (res.status && res.data) {
          setAvailableMeasurements(res.data.stackMeasurements);
          setSelectedStack(res.data.stack);
        }
      } catch (error) {
        console.error("측정항목 로딩 중 오류:", error);
      } finally {
        setLoadingMeasurements(false);
      }
    };

    fetchStackMeasurements();
  }, [form.stackId, setAvailableMeasurements, setSelectedStack, setLoadingMeasurements]);

  const onChange = (
    name: keyof PlanFormData,
    value: string | number | Date
  ) => {
    if (name === "measureDate") {
      setFieldValue(name, new Date(value as string));
    } else if (name === "stackId" || name === "teamId" || name === "workplaceId") {
      setFieldValue(name, Number(value));
    } else if (name === "measurementType") {
      setFieldValue(name, value as MeasurementType);
    } else if (name === "measurementField") {
      setFieldValue(name, value as MeasurementField);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.workplaceId || !form.stackId || !form.teamId) {
      return { success: false, message: "모든 필수 항목을 입력해주세요." };
    }

    if (form.measurementIds.length === 0) {
      return { success: false, message: "측정항목을 선택해주세요." };
    }

    setIsSubmitting(true);
    try {
      // Get companyId from selected workplace
      const companyId = selectedWorkplace?.companyId ?? 0;

      // Convert form data to server request format
      const requestData = toRegisterRequest(form, companyId);
      const res = await registerPlan(requestData);

      if (res.status) {
        resetForm();
      }

      return { success: res.status, message: res.message };
    } catch (error) {
      console.error("측정일정 등록 실패:", error);

      if (axios.isAxiosError(error)) {
        const serverMessage = error.response?.data?.message;
        return {
          success: false,
          message: serverMessage ?? "등록 중 오류가 발생했습니다. 다시 시도해주세요.",
        };
      }

      return {
        success: false,
        message: "등록 중 오류가 발생했습니다. 다시 시도해주세요."
      };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    onChange,
    onSubmit,
    setFieldValue,
    // Select data
    workplaces,
    teams,
    availableStacks,
    availableMeasurements,
    selectedStack,
    selectedWorkplace,
    handleWorkplaceChange,
    loading,
    loadingStacks,
    loadingMeasurements,
    // Search
    workplaceSearchTerm,
    setWorkplaceSearchTerm,
    stackSearchTerm,
    setStackSearchTerm,
    teamSearchTerm,
    setTeamSearchTerm,
    filteredWorkplaces,
    filteredStacks,
    filteredTeams,
  };
};
