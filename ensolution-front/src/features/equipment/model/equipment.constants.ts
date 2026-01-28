export const EquipType = {
  PARTICLE_SAMPLER: "PARTICLE_SAMPLER",
  GAS_SAMPLER: "GAS_SAMPLER",
  PITOT_TUBE: "PITOT_TUBE",
  NOZZLE: "NOZZLE",
  OTHER: "OTHER",
} as const;
export type EquipType = typeof EquipType[keyof typeof EquipType];

export const PitotTubeType = {
  DUST: "DUST",
  FINE_DUST: "FINE_DUST",
  MERCURY: "MERCURY",
} as const;
export type PitotTubeType = typeof PitotTubeType[keyof typeof PitotTubeType];

export const EQUIP_TYPE_OPTIONS: { value: EquipType; label: string }[] = [
  { value: EquipType.PARTICLE_SAMPLER, label: "입자상 시료채취장비" },
  { value: EquipType.GAS_SAMPLER, label: "가스상 시료채취장비" },
  { value: EquipType.PITOT_TUBE, label: "피토우관" },
  { value: EquipType.NOZZLE, label: "노즐" },
  { value: EquipType.OTHER, label: "기타" },
];

export const EQUIP_TYPE_TABS: { id: EquipType; label: string }[] = [
  { id: EquipType.PARTICLE_SAMPLER, label: '입자상' },
  { id: EquipType.GAS_SAMPLER, label: '가스상' },
  { id: EquipType.PITOT_TUBE, label: '피토우관' },
  { id: EquipType.NOZZLE, label: '노즐' },
  { id: EquipType.OTHER, label: '기타' },
];

export const EQUIP_TYPE_LABELS: Record<EquipType, string> = {
  [EquipType.PARTICLE_SAMPLER]: '입자상',
  [EquipType.GAS_SAMPLER]: '가스상',
  [EquipType.PITOT_TUBE]: '피토우관',
  [EquipType.NOZZLE]: '노즐',
  [EquipType.OTHER]: '기타',
};