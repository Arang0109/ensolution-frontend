import { create } from 'zustand';
import type { ScheduleRegisterRequest } from '@schedule/model';
import type { WorkplaceResponse } from '@workplace/model';
import type { TeamResponse } from '@agency/model/agency.types';
import type { StackResponse, StackMeasurementResponse } from '@stack/model';

interface ScheduleFormState {
  // Form data
  form: ScheduleRegisterRequest;

  // Select data
  workplaces: WorkplaceResponse[];
  teams: TeamResponse[];
  availableStacks: StackResponse[];
  availableMeasurements: StackMeasurementResponse[];
  selectedStack: StackResponse | null;

  // Loading states
  loading: boolean;
  loadingStacks: boolean;
  loadingMeasurements: boolean;

  // Search states
  workplaceSearchTerm: string;
  stackSearchTerm: string;
  teamSearchTerm: string;

  // Actions
  setFieldValue: <K extends keyof ScheduleRegisterRequest>(
    key: K,
    value: ScheduleRegisterRequest[K]
  ) => void;
  setWorkplaces: (workplaces: WorkplaceResponse[]) => void;
  setTeams: (teams: TeamResponse[]) => void;
  setAvailableStacks: (stacks: StackResponse[]) => void;
  setAvailableMeasurements: (measurements: StackMeasurementResponse[]) => void;
  setSelectedStack: (stack: StackResponse | null) => void;
  setLoading: (loading: boolean) => void;
  setLoadingStacks: (loading: boolean) => void;
  setLoadingMeasurements: (loading: boolean) => void;
  setWorkplaceSearchTerm: (term: string) => void;
  setStackSearchTerm: (term: string) => void;
  setTeamSearchTerm: (term: string) => void;
  resetForm: () => void;
  clearStackData: () => void;
}

const initialForm: ScheduleRegisterRequest = {
  measurementField: "대기",
  measureDate: new Date(),
  measurementType: "자가측정용",
  workplaceId: 0,
  stackId: 0,
  measurementIds: [],
  teamId: 0,
  staffIds: [],
};

export const useScheduleFormStore = create<ScheduleFormState>((set) => ({
  // Initial state
  form: initialForm,
  workplaces: [],
  teams: [],
  availableStacks: [],
  availableMeasurements: [],
  selectedStack: null,
  loading: true,
  loadingStacks: false,
  loadingMeasurements: false,
  workplaceSearchTerm: "",
  stackSearchTerm: "",
  teamSearchTerm: "",

  // Actions
  setFieldValue: (key, value) =>
    set((state) => ({
      form: { ...state.form, [key]: value },
    })),

  setWorkplaces: (workplaces) => set({ workplaces }),
  setTeams: (teams) => set({ teams }),
  setAvailableStacks: (stacks) => set({ availableStacks: stacks }),
  setAvailableMeasurements: (measurements) => set({ availableMeasurements: measurements }),
  setSelectedStack: (stack) => set({ selectedStack: stack }),
  setLoading: (loading) => set({ loading }),
  setLoadingStacks: (loading) => set({ loadingStacks: loading }),
  setLoadingMeasurements: (loading) => set({ loadingMeasurements: loading }),
  setWorkplaceSearchTerm: (term) => set({ workplaceSearchTerm: term }),
  setStackSearchTerm: (term) => set({ stackSearchTerm: term }),
  setTeamSearchTerm: (term) => set({ teamSearchTerm: term }),

  resetForm: () => set({
    form: initialForm,
    availableStacks: [],
    availableMeasurements: [],
    selectedStack: null,
    workplaceSearchTerm: "",
    stackSearchTerm: "",
    teamSearchTerm: "",
  }),

  clearStackData: () => set({
    availableStacks: [],
    availableMeasurements: [],
    selectedStack: null,
    stackSearchTerm: "",
  }),
}));
