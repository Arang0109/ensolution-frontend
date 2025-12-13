import { useState, useEffect } from "react";
import { registerSchedule } from "@schedule/api/scheduleApi";
import { getWorkplaces } from "@workplace/api/workplaceApi";
import { getTeams } from "@agency/api/AgencyApi";
import type { ScheduleRegisterRequest } from "@schedule/model";
import type { WorkplaceResponse } from "@workplace/model";
import type { TeamResponse } from "@agency/model/agency.types";
import type { StackResponse } from "@stack/model";

export const useScheduleForm = () => {
  const [form, setForm] = useState<ScheduleRegisterRequest>({
    stackId: 0,
    teamId: 0,
    measureDate: new Date(),
    measurementType: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Data for select components
  const [workplaces, setWorkplaces] = useState<WorkplaceResponse[]>([]);
  const [teams, setTeams] = useState<TeamResponse[]>([]);
  const [selectedWorkplaceId, setSelectedWorkplaceId] = useState<number>(0);
  const [availableStacks, setAvailableStacks] = useState<StackResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingStacks, setLoadingStacks] = useState(false);

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
    setForm(prev => ({ ...prev, stackId: 0 })); // Reset stack selection
    setAvailableStacks([]); // Clear stacks
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

    setIsSubmitting(true);
    try {
      const res = await registerSchedule(form);
      setForm({
        stackId: 0,
        teamId: 0,
        measureDate: new Date(),
        measurementType: "",
      });
      setSelectedWorkplaceId(0);
      return { success: res.status, message: res.message };
    } catch (error) {
      return { success: false, message: error + "등록 중 오류가 발생했습니다." };
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
    selectedWorkplaceId,
    handleWorkplaceChange,
    loading,
    loadingStacks,
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
