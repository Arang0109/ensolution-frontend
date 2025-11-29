export interface Users {
  id: number;
  teamId: number;
  username: string;
  password: string;
  name: string;
  grade: string;
  department: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  username: string;
}
