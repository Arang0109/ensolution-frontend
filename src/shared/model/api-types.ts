export interface ApiResponseMessage<T> {
  status: boolean;
  message: string;
  data: T;
}

export interface FieldErrorResponse {
  field: string;
  message: string;
}