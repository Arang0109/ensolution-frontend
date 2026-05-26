import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@app/providers/auth";

import axios, { AxiosError } from "axios";
import { loginApi } from "@/entities/auth/api/authApi";
import type { LoginForm } from "@entities/auth/model";
import { mapLoginFormToRequest } from "@entities/auth/model";

import type { ApiResponseMessage } from "@/shared/model";
import { useToast } from "@app/providers/toast";

const REMEMBER_ID_KEY = "rememberedUsername";

const getRememberedUsername = () => localStorage.getItem(REMEMBER_ID_KEY);

export function useLoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { showToast } = useToast();
  const { login } = useAuth();

  const [form, setForm] = useState<LoginForm>({
    username: getRememberedUsername() ?? "",
    password: "",
    rememberedUsername: getRememberedUsername() !== null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (form.rememberedUsername) {
      localStorage.setItem(REMEMBER_ID_KEY, form.username);
    } else {
      localStorage.removeItem(REMEMBER_ID_KEY);
    }

    const payload = mapLoginFormToRequest(form);

    try {
      const res = await loginApi(payload);

      if (res.status) {
        login(res.data.accessToken);
        showToast("로그인되었습니다.", "success");
        navigate("/dashboard", { replace: true });
        return { success: true };
      }

      showToast(res.message || "로그인에 실패했습니다.", "error");
      return { success: false, message: res.message };
    } catch (error: unknown) {
      let message = "로그인 실패";

      if (axios.isAxiosError(error)) {
        const apiError = error as AxiosError<ApiResponseMessage<null>>;
        message = apiError.response?.data?.message || message;
      }

      showToast(message, "error");
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    onSubmit,

    handleChange,

    isLoading,
  };
}