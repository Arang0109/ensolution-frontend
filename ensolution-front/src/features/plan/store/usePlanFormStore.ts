import { create } from 'zustand';
import type { PlanFormData } from '@plan/model';
import type { WorkplaceResponse } from '@workplace/model';
import type { TeamResponse } from '@/features/agency/model/agency-types';
import type { StackResponse, StackMeasurementResponse } from '@stack/model';
import { MEASUREMENT_FIELDS, MEASUREMENT_TYPES } from '@plan/model';

interface PlanFormState {
  // Form data
  form: PlanFormData;

  // Select data
  workplaces: WorkplaceResponse[];
  teams: TeamResponse[];
  availableStacks: StackResponse[];
  availableMeasurements: StackMeasurementResponse[];
  selectedStack: StackResponse | null;
  selectedWorkplace: WorkplaceResponse | null;

  // Loading states
  loading: boolean;
  loadingStacks: boolean;
  loadingMeasurements: boolean;

  // Search states
  workplaceSearchTerm: string;
  stackSearchTerm: string;
  teamSearchTerm: string;

  // Actions
  setFieldValue: <K extends keyof PlanFormData>(
    key: K,
    value: PlanFormData[K]
  ) => void;
  setWorkplaces: (workplaces: WorkplaceResponse[]) => void;
  setTeams: (teams: TeamResponse[]) => void;
  setAvailableStacks: (stacks: StackResponse[]) => void;
  setAvailableMeasurements: (measurements: StackMeasurementResponse[]) => void;
  setSelectedStack: (stack: StackResponse | null) => void;
  setSelectedWorkplace: (workplace: WorkplaceResponse | null) => void;
  setLoading: (loading: boolean) => void;
  setLoadingStacks: (loading: boolean) => void;
  setLoadingMeasurements: (loading: boolean) => void;
  setWorkplaceSearchTerm: (term: string) => void;
  setStackSearchTerm: (term: string) => void;
  setTeamSearchTerm: (term: string) => void;
  resetForm: () => void;
  clearStackData: () => void;
}

const initialForm: PlanFormData = {
  measurementField: MEASUREMENT_FIELDS.AIR,
  measureDate: new Date(),
  measurementType: MEASUREMENT_TYPES.SELF,
  workplaceId: 0,
  stackId: 0,
  measurementIds: [],
  teamId: 0,
  staffIds: [],
};

export const usePlanFormStore = create<PlanFormState>((set) => ({
  // Initial state
  form: initialForm,
  workplaces: [],
  teams: [],
  availableStacks: [],
  availableMeasurements: [],
  selectedStack: null,
  selectedWorkplace: null,
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
  setSelectedWorkplace: (workplace) => set({ selectedWorkplace: workplace }),
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
    selectedWorkplace: null,
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
