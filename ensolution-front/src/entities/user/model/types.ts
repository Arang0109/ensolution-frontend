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
  modifiedAt: Date;
}

export interface UserResponse {
  username: string;
  teamId: number;
  grade: string;
  department: string;
  name: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  createdAt: Date;
  modifiedAt: Date;
}

export interface UserUpdateRequest {
  teamId: number;
  grade: string;
  department: string;
  name: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
}

export interface Team {
  id: number;
  teamName: string;
}
