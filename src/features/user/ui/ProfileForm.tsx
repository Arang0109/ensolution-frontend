import { useState } from "react";

import type { UserResponse } from "@/entities/user/model";
import type { TeamResponse } from "@/entities/agency/team/model";

import { Button, InputField } from "@shared/ui";

interface ProfileFormProps {
  form: UserResponse;
  teams: TeamResponse[];
  isSubmitting: boolean;
  onChange: (
    name: string,
    value: string
  ) => void;
  onTeamChange: (teamId: number) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const ProfileForm = ({
  form,
  isSubmitting,
  onChange,
  onSubmit
}: ProfileFormProps) => {
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  return (
    <>
      <form onSubmit={onSubmit} className="space-y-6">
        {/* 읽기 전용 필드 */}
        <div className="space-y-4 pb-6 border-b border-slate-200">
          <InputField
            label="아이디"
            value={form.username}
            disabled={true}
            readOnly={true}
          />
        </div>

        {/* 수정 가능한 필드 - 그리드 레이아웃 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <InputField
            label="이름"
            name="name"
            value={form.name}
            onChange={(value) => onChange("name", value)}
          />
          <InputField
            label="이메일"
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={(value) => onChange("email", value)}
          />
          <InputField
            label="이름"
            name="phoneNumber"
            type="tel"
            value={form.phoneNumber}
            onChange={(value) => onChange("phoneNumber", value)}
          />
          <InputField
            label="생년월일"
            name="birthDate"
            type="date"
            value={form.birthDate}
            onChange={(value) => onChange("birthDate", value)}
          />
          <InputField
            label="부서"
            name="department"
            value={form.department}
            onChange={(value) => onChange("department", value)}
          />
          <InputField
            label="직급"
            name="grade"
            value={form.grade}
            onChange={(value) => onChange("grade", value)}
          />
        </div>

        {/* 버튼 */}
        <div className="pt-6 flex gap-4">
          <Button
            label="프로필 저장"
            type="submit"
            disabled={isSubmitting}
            width="full"
          />
          <Button
            label="비밀번호 변경"
            variant="secondary"
            onClick={() => setShowPasswordChange(!showPasswordChange)}
            width="full"
          />
        </div>
      </form>

      {/* 비밀번호 변경 섹션 */}
      {showPasswordChange && (
        <div className="mt-6 pt-6 border-t border-slate-200">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">비밀번호 변경</h3>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <InputField
                  label="현재 비밀번호"
                  value=""
                  name="currentPassword"
                  type="password"
                />
              </div>
              <InputField
                  label="새 비밀번호"
                  value=""
                  name="newPassword"
                  type="password"
                />
                <InputField
                  id="confirmPassword"
                  label="비밀번호 확인"
                  value=""
                  name="confirmPassword"
                  type="password"
                />
            </div>
            <Button
              label="비밀번호 변경하기"
              type="submit"
              disabled={isSubmitting}
              width="full"
            />
          </form>
        </div>
      )}
    </>
  );
}