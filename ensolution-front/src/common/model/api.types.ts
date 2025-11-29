export interface ApiResponseMessage<T> {
  success: boolean;
  message: string;
  data: T;
}