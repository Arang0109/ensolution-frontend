import type {
  LoginForm, LoginRequest
} from "@entities/auth/model";

export const mapLoginFormToRequest = (
  form: LoginForm
): LoginRequest => {
  return {
    username: form.username,
    password: form.password
  }
}