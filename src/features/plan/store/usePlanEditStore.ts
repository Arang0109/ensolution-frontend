import { create } from "zustand";

import type {
  PlanDetailResponse,
  PlanDraftEditForm,
  PlanInfoEditForm,
  EquipmentEditForm,
  MeasurementpointEditForm,
  MeasurementItemEditForm,
  MeasurementSheetEditForm,
  WeatherEditForm,
  MoistureEditForm,
  ExhaustGasEditForm,
  SampleEditForm,
  ParticleSampleEditForm,
} from "@/entities/plan/model";

import {
  getDefaultPlanDraftEditForm,
  getDefaultWeatherEditForm,
  getDefaultMoistureEditForm,
  getDefaultExhaustGasEditForm,
  getDefaultParticleSampleEditForm,
} from "@/entities/plan/model";

import type { StackMeasurementResponse } from "@/entities/stack/model";
import { calcMeasurementPointCnt } from "@/features/plan/util";
import { calculator } from "@shared/lib";

const { toNumbers, safeCalc } = calculator;

const createEmptySample = (): SampleEditForm => ({
  startTime: "",
  endTime: "",
  suctionQuantity: "",
  gasMeterGaugePressure: "",
  inTemperature: "",
  outTemperature: "",
  beforeVolume: "",
  afterVolume: "",
  blankSampleNumber: "",
  sampleNumber: "",
  samplingVolume: "",
});

const getEmptyMeasurementPoint = (): MeasurementpointEditForm => ({
  Ts: "",
  Pv: "",
  Ps: "",
  inTm: "",
  outTm: "",
  beforeVm: "",
  afterVm: "",
  samplingTime: "",
  vacuumGaugePressure: "",
  finalImpingerTemperature: "",
  Vlc: "",
  kFactor: "",
  orificeDp: "",
  isokineticRatio: "",
});

const syncMeasurementPoints = (
  current: MeasurementpointEditForm[],
  newCount: number
): MeasurementpointEditForm[] => {
  if (newCount > current.length) {
    const extras = Array.from(
      { length: newCount - current.length },
      getEmptyMeasurementPoint
    );
    return [...current, ...extras];
  }

  return current.slice(0, newCount);
};

type PlanEditStore = {
  editForm: PlanDraftEditForm;

  initEditForm: (plan?: PlanDetailResponse) => void;
  resetEditForm: (plan?: PlanDetailResponse) => void;

  updatePlanInfoField: (
    name: keyof PlanInfoEditForm,
    value: string
  ) => void;

  updateEquipmentField: (
    name: keyof EquipmentEditForm,
    value: string | null
  ) => void;

  updateSheetField: <K extends keyof MeasurementSheetEditForm>(
    sheetIndex: number,
    name: K,
    value: MeasurementSheetEditForm[K]
  ) => void;

  updateWeatherField: (
    sheetIndex: number,
    name: keyof WeatherEditForm,
    value: string | null
  ) => void;

  updateMoistureField: (
    sheetIndex: number,
    name: keyof MoistureEditForm,
    value: string | null
  ) => void;

  updateExhaustGasField: (
    sheetIndex: number,
    name: keyof ExhaustGasEditForm,
    value: string | null,
    index?: number
  ) => void;

  updateMeasurementPointField: (
    sheetIndex: number,
    pointIndex: number,
    name: keyof MeasurementpointEditForm,
    value: string
  ) => void;

  updateSheetSampleItems: (
    sheetIndex: number,
    primaryItemId: number | null,
    concurrentItemIds: number[]
  ) => void;

  updateSampleField: (
    sheetIndex: number,
    sampleIndex: number,
    name: keyof SampleEditForm,
    value: string
  ) => void;

  updateParticleField: (
    sheetIndex: number,
    name: keyof ParticleSampleEditForm,
    value: string | null
  ) => void;

  updateMeasurementItemField: (
    stackMeasurementId: number,
    name: keyof MeasurementItemEditForm,
    value: string
  ) => void;

  updateMeasurementItems: (selected: StackMeasurementResponse[]) => void;

  addSheet: () => void;
  removeSheet: (index: number) => void;
};

export const usePlanEditStore = create<PlanEditStore>((set) => ({
  editForm: getDefaultPlanDraftEditForm(),

  initEditForm: (plan) =>
    set({
      editForm: getDefaultPlanDraftEditForm(plan),
    }),

  resetEditForm: (plan) =>
    set({
      editForm: getDefaultPlanDraftEditForm(plan),
    }),

  updatePlanInfoField: (name, value) =>
    set((state) => {
      if (!state.editForm) return state;

      const nextPlanInfo = {
        ...state.editForm.planInfo,
        [name]: value,
      };

      const diameters = toNumbers([
        nextPlanInfo.horizontalLength,
        nextPlanInfo.verticalLength,
      ]);

      const measurePointCnt = safeCalc([diameters], () =>
        calcMeasurementPointCnt(nextPlanInfo.shape, diameters!)
      );

      const pointCount =
        safeCalc([measurePointCnt], () => Math.ceil(measurePointCnt!)) ?? 1;

      return {
        editForm: {
          ...state.editForm,
          planInfo: nextPlanInfo,
          sheets: state.editForm.sheets.map((sheet) => ({
            ...sheet,
            measurementPoints: syncMeasurementPoints(
              sheet.measurementPoints,
              pointCount
            ),
          })),
        },
      };
    }),

  updateEquipmentField: (name, value) =>
    set((state) => {
      if (!state.editForm) return state;

      return {
        editForm: {
          ...state.editForm,
          equipment: {
            ...state.editForm.equipment,
            [name]: value,
          },
        },
      };
    }),

  updateSheetField: (sheetIndex, name, value) =>
    set((state) => {
      if (!state.editForm) return state;

      return {
        editForm: {
          ...state.editForm,
          sheets: state.editForm.sheets.map((sheet, i) =>
            i === sheetIndex ? { ...sheet, [name]: value } : sheet
          ),
        },
      };
    }),

  updateWeatherField: (sheetIndex, name, value) =>
    set((state) => {
      if (!state.editForm) return state;

      return {
        editForm: {
          ...state.editForm,
          sheets: state.editForm.sheets.map((sheet, i) =>
            i === sheetIndex
              ? {
                  ...sheet,
                  weather: {
                    ...sheet.weather,
                    [name]: value,
                  },
                }
              : sheet
          ),
        },
      };
    }),

  updateMoistureField: (sheetIndex, name, value) =>
    set((state) => {
      if (!state.editForm) return state;

      return {
        editForm: {
          ...state.editForm,
          sheets: state.editForm.sheets.map((sheet, i) =>
            i === sheetIndex
              ? {
                  ...sheet,
                  moisture: {
                    ...sheet.moisture,
                    [name]: value,
                  },
                }
              : sheet
          ),
        },
      };
    }),

  updateExhaustGasField: (sheetIndex, name, value, index) =>
    set((state) => {
      if (!state.editForm) return state;

      return {
        editForm: {
          ...state.editForm,
          sheets: state.editForm.sheets.map((sheet, i) => {
            if (i !== sheetIndex) return sheet;

            const current = sheet.exhaustGas[name];

            if (Array.isArray(current)) {
              if (index === undefined) return sheet;

              const newArr = [...current];
              newArr[index] = value ?? "";

              return {
                ...sheet,
                exhaustGas: {
                  ...sheet.exhaustGas,
                  [name]: newArr,
                },
              };
            }

            return {
              ...sheet,
              exhaustGas: {
                ...sheet.exhaustGas,
                [name]: value ?? "",
              },
            };
          }),
        },
      };
    }),

  updateMeasurementPointField: (sheetIndex, pointIndex, name, value) =>
    set((state) => {
      if (!state.editForm) return state;

      return {
        editForm: {
          ...state.editForm,
          sheets: state.editForm.sheets.map((sheet, i) => {
            if (i !== sheetIndex) return sheet;

            return {
              ...sheet,
              measurementPoints: sheet.measurementPoints.map((point, j) =>
                j === pointIndex ? { ...point, [name]: value } : point
              ),
            };
          }),
        },
      };
    }),

  updateSheetSampleItems: (sheetIndex, primaryItemId, concurrentItemIds) =>
    set((state) => {
      if (!state.editForm) return state;

      return {
        editForm: {
          ...state.editForm,
          sheets: state.editForm.sheets.map((sheet, i) => {
            if (i !== sheetIndex) return sheet;

            const newCount =
              (primaryItemId !== null ? 1 : 0) + concurrentItemIds.length;

            const current = sheet.samples ?? [];

            const samples = Array.from({ length: newCount }, (_, j) =>
              j < current.length ? current[j] : createEmptySample()
            );

            return {
              ...sheet,
              primaryItemId,
              concurrentItemIds,
              samples,
            };
          }),
        },
      };
    }),

  updateSampleField: (sheetIndex, sampleIndex, name, value) =>
    set((state) => {
      if (!state.editForm) return state;

      return {
        editForm: {
          ...state.editForm,
          sheets: state.editForm.sheets.map((sheet, i) => {
            if (i !== sheetIndex) return sheet;

            return {
              ...sheet,
              samples: sheet.samples.map((sample, j) =>
                j === sampleIndex ? { ...sample, [name]: value } : sample
              ),
            };
          }),
        },
      };
    }),

  updateParticleField: (sheetIndex, name, value) =>
    set((state) => {
      if (!state.editForm) return state;

      return {
        editForm: {
          ...state.editForm,
          sheets: state.editForm.sheets.map((sheet, i) =>
            i === sheetIndex
              ? {
                  ...sheet,
                  particleSample: {
                    ...sheet.particleSample,
                    [name]: value,
                  },
                }
              : sheet
          ),
        },
      };
    }),

  updateMeasurementItemField: (stackMeasurementId, name, value) =>
    set((state) => {
      if (!state.editForm) return state;

      return {
        editForm: {
          ...state.editForm,
          measurementItems: state.editForm.measurementItems.map((item) =>
            item.stackMeasurementId === stackMeasurementId
              ? { ...item, [name]: value }
              : item
          ),
        },
      };
    }),

  updateMeasurementItems: (selected) =>
    set((state) => {
      if (!state.editForm) return state;

      const kept = state.editForm.measurementItems.filter((item) =>
        selected.some((sm) => sm.id === item.stackMeasurementId)
      );

      const keptIds = kept.map((item) => item.stackMeasurementId);

      const newItems: MeasurementItemEditForm[] = selected
        .filter((sm) => !keptIds.includes(sm.id))
        .map((sm) => ({
          stackMeasurementId: sm.id,
          pollutantId: sm.pollutant.id,
          pollutantNameKr: sm.pollutant.nameKr,
          pollutantNameEn: sm.pollutant.nameEn,
          method: sm.pollutant.method,
          testEquipment: sm.pollutant.equipmentName,
          testMethod: sm.pollutant.testMethodName,
          samplingTime: sm.pollutant.samplingTime,
          samplingVolume: sm.pollutant.samplingVolume,
          cycle: sm.cycle,
          allowance: sm.allowance,
          startTime: "",
          endTime: "",
        }));

      return {
        editForm: {
          ...state.editForm,
          measurementItems: [...kept, ...newItems],
        },
      };
    }),

  addSheet: () =>
    set((state) => {
      if (!state.editForm) return state;

      const diameters = toNumbers([
        state.editForm.planInfo.horizontalLength,
        state.editForm.planInfo.verticalLength,
      ]);

      const measurePointCnt = safeCalc([diameters], () =>
        calcMeasurementPointCnt(state.editForm!.planInfo.shape, diameters!)
      );

      const pointCount =
        safeCalc([measurePointCnt], () => Math.ceil(measurePointCnt! / 4)) ?? 1;

      const newSheet: MeasurementSheetEditForm = {
        category: "GAS",
        primaryItemId: null,
        concurrentItemIds: [],
        weather: getDefaultWeatherEditForm(undefined),
        moisture: getDefaultMoistureEditForm(undefined),
        exhaustGas: getDefaultExhaustGasEditForm(undefined),
        measurementPoints: Array.from(
          { length: pointCount },
          getEmptyMeasurementPoint
        ),
        samples: [],
        particleSample: getDefaultParticleSampleEditForm(undefined),
        quantity: "",
      };

      return {
        editForm: {
          ...state.editForm,
          sheets: [...state.editForm.sheets, newSheet],
        },
      };
    }),

  removeSheet: (index) =>
    set((state) => {
      if (!state.editForm) return state;

      return {
        editForm: {
          ...state.editForm,
          sheets: state.editForm.sheets.filter((_, i) => i !== index),
        },
      };
    }),
}));