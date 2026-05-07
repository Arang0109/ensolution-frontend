import type {
  MeasurementField,
  MeasurementType,
} from "@/entities/plan/model";

export interface BasicInfoDocResponse {
  referenceNumber: string;
  measureDate: string;
  receivedDate: string;
  analysisDate: string;
  measurementField: MeasurementField;
  measurementType: MeasurementType;

  measureStartTime: string;
  measureEndTime: string;
  measurementPointCnt: number;
}