export const METHOD_LABELS = {
  FIELD_MEASUREMENT: "현장측정",
  ABSORPTION_SOLUTION: "흡수액",
  CARTRIDGE: "카트리지",
  ADSORPTION_TUBE: "흡착관",
  TEDLAR_BAG: "테드라백",
  HEAVY_METAL: "중금속",
  DUST: "먼지",
  MERCURY: "수은",
} as const;
export type Method = keyof typeof METHOD_LABELS;

export const METHOD_LABELS_OPTIONS =
  Object.entries(METHOD_LABELS).map(([value, label]) => ({
    value,
    label,
  })) as {
    value: Method;
    label: string;
  }[];