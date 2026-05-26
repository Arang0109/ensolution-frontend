export type LoginForm = {
  username: string;
  password: string;
  rememberedUsername: boolean;
}

export type LoginRequest = {
  username: string;
  password: string;
}

export type LoginResponse = {
  accessToken: string;
  username: string;
}