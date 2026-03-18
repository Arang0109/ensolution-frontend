import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@app/providers/auth";

import axios, { AxiosError } from "axios";
import { loginApi } from "@/entities/auth/api/authApi";

import type { ApiResponseMessage } from "@/shared/model";
import { useToast } from "@app/providers/toast";

import type { LoginRequest } from "@entities/auth/model";

export function useLoginForm() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { login } = useAuth();

  const [form, setForm] = useState<LoginRequest>({
    username: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await loginApi(form);

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
    isLoading,
    onChange,
    onSubmit,
  };
}