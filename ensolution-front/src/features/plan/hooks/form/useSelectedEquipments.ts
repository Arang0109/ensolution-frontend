import { useEquipments } from "@/features/equipment/hooks";
import { EquipType } from "@/entities/agency/equipment/model";

import type { EquipmentEditForm } from "@/entities/plan/model";

export const useSelectedEquipments = (equipment: EquipmentEditForm) => {
  const { equipments, loading } = useEquipments();

  const particleSamplers = equipments.filter(e => e.type === EquipType.PARTICLE_SAMPLER);
  const gasSamplers = equipments.filter(e => e.type === EquipType.GAS_SAMPLER);
  const pitotTubes = equipments.filter(e => e.type === EquipType.PITOT_TUBE);
  const nozzles = equipments.filter(e => e.type === EquipType.NOZZLE);

  const selectedPS = particleSamplers.find(e => e.id === equipment.particleSamplerId);
  const selectedGS = gasSamplers.find(e => e.id === equipment.gasSamplerId);
  const selectedPT = pitotTubes.find(e => e.id === equipment.pitotTubeId);
  const selectedNZ = nozzles.find(e => e.id === equipment.nozzleId);

  return {
    particleSamplers,
    gasSamplers,
    pitotTubes,
    nozzles,
    selectedPS,
    selectedGS,
    selectedPT,
    selectedNZ,
    loading,
  };
};
