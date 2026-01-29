import { useState, useEffect } from "react";

import { patchEquipment } from "@equipment/api/EquipmentApi";
import { EquipType } from "@equipment/model";

import { type EquipmentResponse, type EquipmentUpdateRequest, type EquipmentSpecMap, type PitotTubeSpec, type NozzleSpec } from "@equipment/model";

type EquipTypeKey = keyof typeof EquipType;

const getEquipTypeKey = (type: string): EquipTypeKey => {
  return Object.keys(EquipType).find(
    key => EquipType[key as EquipTypeKey] === type
  ) as EquipTypeKey;
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (name === "type") {
      const equipType = value as EquipTypeKey;
      setForm(prev => prev ? ({
        ...prev,
        type: EquipType[equipType],
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

  const onSpecChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const parsedValue = type === "number" ? Number(value) : value;

    setForm(prev => prev ? ({
      ...prev,
      spec: {
        ...prev.spec as Record<string, unknown>,
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

  const updateCoefficient = (index: number, field: 'coefficient' | 'velocity', value: number) => {
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
          nozzleDiameters: [...(spec.nozzleDiameters || []), { diameter: 0 }],
        },
      };
    });
  };

  const updateNozzleDiameter = (index: number, value: number) => {
    setForm(prev => {
      if (!prev) return null;
      const spec = prev.spec as NozzleSpec;
      const newDiameters = [...(spec.nozzleDiameters || [])];
      newDiameters[index] = { diameter: value };
      return {
        ...prev,
        spec: {
          ...spec,
          nozzleDiameters: newDiameters,
        },
      };
    });
  };

  const removeNozzleDiameter = (index: number) => {
    setForm(prev => {
      if (!prev) return null;
      const spec = prev.spec as NozzleSpec;
      const newDiameters = [...(spec.nozzleDiameters || [])];
      newDiameters.splice(index, 1);
      return {
        ...prev,
        spec: {
          ...spec,
          nozzleDiameters: newDiameters,
        },
      };
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!equipment || !form) return { success: false, message: "장비 정보가 없습니다." };

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
    getEquipTypeKey,
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

const getDefaultSpec = (type: EquipTypeKey): EquipmentSpecMap[typeof EquipType[EquipTypeKey]] => {
  switch (type) {
    case "PARTICLE_SAMPLER":
      return { totalVolume: 0, orificeDp: 0, yd: 0 };
    case "GAS_SAMPLER":
      return { totalVolume: 0 };
    case "PITOT_TUBE":
      return { type: "", coefficients: [] };
    case "NOZZLE":
      return { nozzleDiameters: [] };
    default:
      return {};
  }
};
