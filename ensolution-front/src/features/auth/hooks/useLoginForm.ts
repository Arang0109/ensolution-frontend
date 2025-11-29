import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "@auth/api/authApi";
import axios, { AxiosError } from "axios";
import type { LoginRequest } from "@auth/model";
import type { ApiResponseMessage } from "@/common/model";

export function useLoginForm() {
  const navigate = useNavigate();
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
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("username", res.data.username);
        navigate("/home", { replace: true });
        return { success: true };
      }

      return { success: false, message: res.message };
    } catch (error: unknown) {
      let message = "로그인 실패";

      if (axios.isAxiosError(error)) {
        const apiError = error as AxiosError<ApiResponseMessage<null>>;
        message = apiError.response?.data?.message || message;
      }

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