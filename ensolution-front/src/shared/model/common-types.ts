export type FieldType = "text" | "number" | "date";

export type ComponentSize = "sm" | "md" | "lg" | "xl" | "full";

export type Cycle = 'MONTHLY_1' | 'MONTHLY_2' | 'BIMONTHLY' | 'QUARTERLY' | 'SEMI_ANNUAL' | 'ANNUAL';

export type PlanStatus = 'MEASURING' | 'ANALYZING' | 'COMPLETED' | 'CANCELED';

export type Team = 1 | 2 | 3 | 4;

export type ValidationErrors = Record<string, string>;

export interface ActionResult {
  success: boolean;
  message: string;
}