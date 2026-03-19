import { useState, useEffect } from "react";

import { patchEquipment } from "@/entities/agency/equipment/api/EquipmentApi";
import { EquipType } from "@/entities/agency/equipment/model";

import type { FieldType } from "@shared/model";

import type { EquipmentResponse, EquipmentUpdateRequest, EquipmentSpecMap, PitotTubeSpec, NozzleSpec } from "@/entities/agency/equipment/model";

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

export const useEquipmentEditForm = (equipment: EquipmentResponse | null) => {
  const [form, setForm] = useState<EquipmentUpdateRequest | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (equipment) {
      setForm({
        type: equipment.type,
        managementNumber: equipment.managementNumber,
        serialNumber: equipment.serialNumber,
        modelName: equipment.modelName,
        equipmentName: equipment.equipmentName,
        alias: equipment.alias,
        price: equipment.price,
        manufacturer: equipment.manufacturer,
        originCountry: equipment.originCountry,
        purchaseDate: equipment.purchaseDate,
        remark: equipment.remark,
        calibrationCycle: equipment.calibrationCycle,
        spec: equipment.spec,
      });
    }
  }, [equipment]);

  const onChange = (
    name: keyof EquipmentUpdateRequest,
    value: string,
    type: FieldType
  ) => {
    if (name === "type") {
      const equipType = value as EquipType;
      setForm(prev => prev ? ({
        ...prev,
        type: equipType,
        spec: getDefaultSpec(equipType),
      }) : null);
      return;
    }

    if (type === "number") {
      setForm(prev => prev ? ({ ...prev, [name]: Number(value) }) : null);
      return;
    }

    setForm(prev => prev ? ({ ...prev, [name]: value }) : null);
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

    setForm(prev => prev ? ({
      ...prev,
      spec: {
        ...(prev.spec as Record<string, unknown>),
        [name]: parsedValue,
      },
    }) : null);
  };

  // PitotTube coefficients 관리
  const addCoefficient = () => {
    setForm(prev => {
      if (!prev) return null;
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
      if (!prev) return null;
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
      if (!prev) return null;
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
      if (!prev) return null;
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
      if (!prev) return null;
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
      if (!prev) return null;
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
    if (!equipment || !form) return { success: false, message: "장비 정보가 없습니다." };

    console.log(form.spec);

    setIsSubmitting(true);

    try {
      const res = await patchEquipment(equipment.id, form as Parameters<typeof patchEquipment>[1]);
      return { success: res.status, message: res.message };
    } catch {
      return { success: false, message: "수정 중 오류가 발생했습니다." };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    onChange,
    onSpecChange,
    onSubmit,
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
