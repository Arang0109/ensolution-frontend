import { useState } from "react";

import { registerEquipment } from "@/entities/agency/equipment/api/EquipmentApi";
import { EquipType } from "@/entities/agency/equipment/model";

import type { FieldType } from "@shared/model";

import type { EquipmentRegisterRequest, EquipmentSpecMap, PitotTubeSpec, NozzleSpec } from "@/entities/agency/equipment/model";

const getDefaultSpec = (type: EquipType): EquipmentSpecMap[EquipType] => {
  switch (type) {
    case EquipType.PARTICLE_SAMPLER:
      return { totalVolume: 0, orificeDp: 0, yd: 0 };
    case EquipType.GAS_SAMPLER:
      return { totalVolume: 0 };
    case EquipType.PITOT_TUBE:
      return { pitotTubeType: "" as never, coefficients: [] };
    case EquipType.NOZZLE:
      return { nozzleDiameters: [] };
    default:
      return {};
  }
};

const getDefaultForm = (): EquipmentRegisterRequest => ({
  type: EquipType.PARTICLE_SAMPLER,
  managementNumber: "",
  serialNumber: "",
  modelName: "",
  equipmentName: "",
  alias: "",
  price: 0,
  manufacturer: "",
  originCountry: "",
  purchaseDate: new Date().toISOString().split("T")[0],
  remark: "",
  calibrationCycle: 12,
  spec: getDefaultSpec(EquipType.PARTICLE_SAMPLER),
});

export const useEquipmentForm = () => {
  const [form, setForm] = useState<EquipmentRegisterRequest>(getDefaultForm());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange = (
    name: keyof EquipmentRegisterRequest,
    value: string,
    type: FieldType
  ) => {
    if (name === "type") {
      const equipType = value as EquipType;
      setForm(prev => ({
        ...prev,
        type: equipType,
        spec: getDefaultSpec(equipType),
      }));
      return;
    }

    if (type === "number") {
      setForm(prev => ({ ...prev, [name]: Number(value) }));
      return;
    }

    setForm(prev => ({ ...prev, [name]: value }));
  };

  const parseFieldValue = (value: string, type: FieldType) => {
    if (type === "number") {
      return value === "" ? "" : Number(value);
    }
    return value;
  };

  const onSpecChange = (
    name: string,
    value: string,
    type: FieldType
  ) => {
    const parsedValue = parseFieldValue(value, type);

    setForm(prev => ({
      ...prev,
      spec: {
        ...(prev.spec as Record<string, unknown>),
        [name]: parsedValue,
      },
    }));
  };

  // PitotTube coefficients 관리
  const addCoefficient = () => {
    setForm(prev => {
      const spec = prev.spec as PitotTubeSpec;
      return {
        ...prev,
        spec: {
          ...spec,
          coefficients: [...(spec.coefficients || []), { coefficient: 0, velocity: 0 }],
        },
      };
    });
  };

  const updateCoefficient = (index: number, field: 'coefficient' | 'velocity', value: string) => {
    setForm(prev => {
      const spec = prev.spec as PitotTubeSpec;
      const newCoefficients = [...(spec.coefficients || [])];
      newCoefficients[index] = { ...newCoefficients[index], [field]: value };
      return {
        ...prev,
        spec: {
          ...spec,
          coefficients: newCoefficients,
        },
      };
    });
  };

  const removeCoefficient = (index: number) => {
    setForm(prev => {
      const spec = prev.spec as PitotTubeSpec;
      const newCoefficients = [...(spec.coefficients || [])];
      newCoefficients.splice(index, 1);
      return {
        ...prev,
        spec: {
          ...spec,
          coefficients: newCoefficients,
        },
      };
    });
  };

  // Nozzle diameters 관리
  const addNozzleDiameter = () => {
    setForm(prev => {
      const spec = prev.spec as NozzleSpec;
      return {
        ...prev,
        spec: {
          ...spec,
          diameters: [...(spec.diameters || []), { diameter: 0 }],
        },
      };
    });
  };

  const updateNozzleDiameter = (index: number, value: string) => {
    setForm(prev => {
      const spec = prev.spec as NozzleSpec;
      const newDiameters = [...(spec.diameters || [])];
      newDiameters[index] = { diameter: value };
      return {
        ...prev,
        spec: {
          ...spec,
          diameters: newDiameters,
        },
      };
    });
  };

  const removeNozzleDiameter = (index: number) => {
    setForm(prev => {
      const spec = prev.spec as NozzleSpec;
      const newDiameters = [...(spec.diameters || [])];
      newDiameters.splice(index, 1);
      return {
        ...prev,
        spec: {
          ...spec,
          diameters: newDiameters,
        },
      };
    });
  };

  const onSubmit = async () => {
    setIsSubmitting(true);

    try {
      const res = await registerEquipment(form as Parameters<typeof registerEquipment>[0]);
      return { success: res.status, message: res.message };
    } catch {
      return { success: false, message: "등록 중 오류가 발생했습니다." };
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setForm(getDefaultForm());
  };

  return {
    form,
    isSubmitting,
    onChange,
    onSpecChange,
    onSubmit,
    resetForm,
    // PitotTube
    addCoefficient,
    updateCoefficient,
    removeCoefficient,
    // Nozzle
    addNozzleDiameter,
    updateNozzleDiameter,
    removeNozzleDiameter,
  };
};
