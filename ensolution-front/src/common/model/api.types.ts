export interface ApiResponseMessage<T> {
  status: boolean;
  message: string;
  data: T;
}