export const PLAN_STATUS = {
  MEASURING: "측정중",
  ANALYZING: "분석중",
  COMPLETED: "분석완료",
  CANCELED: "취소",
}
export type PlanStatus = keyof typeof PLAN_STATUS;

export const PLAN_STATUS_OPTIONS =
  Object.entries(PLAN_STATUS).map(([key, value]) => ({
    label: value,
    value: key,
  })) as {
  value: PlanStatus;
  label: string;
}[];

export const PLAN_STATUS_COLORS = {
  MEASURING: "bg-blue-100 text-blue-800",
  ANALYZING: "bg-yellow-100 text-yellow-800",
  COMPLETED: "bg-green-100 text-green-800",
  CANCELED: "bg-gray-100 text-gray-800",
}