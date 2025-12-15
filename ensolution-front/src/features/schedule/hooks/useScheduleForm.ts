import { useState, useEffect } from "react";
import { registerSchedule } from "@schedule/api/scheduleApi";
import { getWorkplaces } from "@workplace/api/workplaceApi";
import { getTeams } from "@agency/api/AgencyApi";
import type { ScheduleRegisterRequest } from "@schedule/model";
import type { WorkplaceResponse } from "@workplace/model";
import type { TeamResponse } from "@agency/model/agency.types";
import type { StackResponse, StackMeasurementResponse } from "@stack/model";

export const useScheduleForm = () => {
  const [form, setForm] = useState<ScheduleRegisterRequest>({
    stackId: 0,
    teamId: 0,
    measureDate: new Date(),
    measurementType: "",
    measurementIds: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Data for select components
  const [workplaces, setWorkplaces] = useState<WorkplaceResponse[]>([]);
  const [teams, setTeams] = useState<TeamResponse[]>([]);
  const [selectedWorkplaceId, setSelectedWorkplaceId] = useState<number>(0);
  const [availableStacks, setAvailableStacks] = useState<StackResponse[]>([]);
  const [availableMeasurements, setAvailableMeasurements] = useState<StackMeasurementResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingStacks, setLoadingStacks] = useState(false);
  const [loadingMeasurements, setLoadingMeasurements] = useState(false);

  // Search states
  const [workplaceSearchTerm, setWorkplaceSearchTerm] = useState("");
  const [stackSearchTerm, setStackSearchTerm] = useState("");
  const [teamSearchTerm, setTeamSearchTerm] = useState("");

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
  }, []);

  // Filtered data based on search
  const filteredWorkplaces = workplaces.filter((workplace) =>
    workplace.name.toLowerCase().includes(workplaceSearchTerm.toLowerCase())
  );

  const filteredStacks = availableStacks.filter((stack) =>
    stack.name.toLowerCase().includes(stackSearchTerm.toLowerCase()) ||
    stack.semsNumber.toLowerCase().includes(stackSearchTerm.toLowerCase())
  );

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(teamSearchTerm.toLowerCase())
  );

  // Fetch stacks when workplace is selected
  const handleWorkplaceChange = async (workplaceId: number) => {
    setSelectedWorkplaceId(workplaceId);
    setForm(prev => ({ ...prev, stackId: 0, measurementIds: [] })); // Reset stack and measurements selection
    setAvailableStacks([]); // Clear stacks
    setAvailableMeasurements([]); // Clear measurements
    setStackSearchTerm(""); // Clear stack search

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
        return;
      }

      try {
        setLoadingMeasurements(true);
        const { getStack } = await import("@stack/api/stackApi");
        const res = await getStack(form.stackId);

        if (res.status && res.data) {
          setAvailableMeasurements(res.data.stackMeasurements);
        }
      } catch (error) {
        console.error("측정항목 로딩 중 오류:", error);
      } finally {
        setLoadingMeasurements(false);
      }
    };

    fetchStackMeasurements();
  }, [form.stackId]);

  const setFieldValue = <K extends keyof ScheduleRegisterRequest>(
    key: K,
    value: ScheduleRegisterRequest[K]
  ) => {
    setForm(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const key = name as keyof ScheduleRegisterRequest;

    if (key === "measureDate") {
      setFieldValue(key, new Date(value));
    } else if (key === "stackId" || key === "teamId") {
      setFieldValue(key, Number(value));
    } else {
      setFieldValue(key, value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.stackId || !form.teamId || !form.measurementType) {
      return { success: false, message: "모든 필수 항목을 입력해주세요." };
    }

    if (form.measurementIds.length === 0) {
      return { success: false, message: "측정항목을 선택해주세요." };
    }

    setIsSubmitting(true);
    try {
      const res = await registerSchedule(form);

      if (res.status) {
        // 성공 시 폼 초기화
        setForm({
          stackId: 0,
          teamId: 0,
          measureDate: new Date(),
          measurementType: "",
          measurementIds: [],
        });
        setSelectedWorkplaceId(0);
        setAvailableStacks([]);
        setAvailableMeasurements([]);
      }

      return { success: res.status, message: res.message };
    } catch (error) {
      console.error("측정일정 등록 실패:", error);
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
    setForm,
    isSubmitting,
    onChange,
    onSubmit,
    setFieldValue,
    // Select data
    workplaces,
    teams,
    availableStacks,
    availableMeasurements,
    selectedWorkplaceId,
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
