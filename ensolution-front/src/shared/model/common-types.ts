export type FieldType = "text" | "number" | "date";

export type ComponentSize = "sm" | "md" | "lg" | "xl" | "xxl" | "full";

export type Team = 1 | 2 | 3 | 4;

export type ValidationErrors = Record<string, string>;

export interface ActionResult {
  success: boolean;
  message: string;
}