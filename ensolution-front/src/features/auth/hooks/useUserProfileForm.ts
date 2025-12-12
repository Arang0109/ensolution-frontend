import { useState, useEffect } from "react";
import { getProfile, patchProfile } from "@auth/api/userApi";
import type { UserResponse, UserUpdateRequest } from "@auth/model";

export const useUserProfileForm = () => {
  const [form, setForm] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /** 프로필 정보 불러오기 */
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await getProfile();
      if (res.status && res.data) {
        setForm({
          ...res.data,
          birthDate: res.data.birthDate
            ? res.data.birthDate.toString().slice(0, 10)
            : ""
        });
      }
    } finally {
      setLoading(false);
    }
  };

  /** input 변경 */
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => prev ? { ...prev, [name]: value } : prev);
  };

  /** 저장(수정 API 요청) */
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form) return { success: false };

    setIsSubmitting(true);
    try {
      const req: UserUpdateRequest = {
        teamId: form.teamId,
        grade: form.grade,
        department: form.department,
        name: form.name,
        email: form.email,
        phoneNumber: form.phoneNumber,
        birthDate: form.birthDate,
      };

      const res = await patchProfile(req);
      return { success: res.status, message: res.message };
    } catch {
      return { success: false, message: "수정 중 오류가 발생했습니다." };
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  /** 팀 ID 변경 핸들러 */
  const onTeamChange = (value: number) => {
    setForm((prev) =>
      prev ? { ...prev, teamId: value } : prev
    );
  };

  return {
    form,
    loading,
    isSubmitting,
    onChange,
    onSubmit,
    onTeamChange,
    refetch: fetchProfile
  };
};