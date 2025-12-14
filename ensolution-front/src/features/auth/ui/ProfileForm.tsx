import Select from "react-select";
import { useState } from "react";

import type { UserResponse } from "@auth/model";
import type { TeamResponse } from "@agency/model";

interface ProfileFormProps {
  form: UserResponse;
  teams: TeamResponse[];
  isSubmitting: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTeamChange: (teamId: number) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const ProfileForm = ({
  form,
  teams,
  isSubmitting,
  onChange,
  onTeamChange,
  onSubmit
}: ProfileFormProps) => {
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  type TeamOption = {
    value: number;
    label: string;
  };

  const teamOptions: TeamOption[] = teams.map(({id, name}) => ({
    value: id,
    label: name
  }));

  // 선택된 값 찾기
  const selectedTeam = teamOptions.find(
    (option) => option.value === Number(form.teamId)
  );

  return (
    <>
      <form onSubmit={onSubmit} className="space-y-6">
        {/* 읽기 전용 필드 */}
        <div className="space-y-4 pb-6 border-b border-sand-200">
          <div>
            <label className="block text-sm font-medium text-brown-700 mb-1">
              아이디
            </label>
            <input
              type="text"
              value={form.username}
              disabled
              className="w-full px-4 py-2 bg-sand-50 border border-sand-200 rounded-lg text-brown-900 cursor-not-allowed"
            />
          </div>
        </div>

        {/* 수정 가능한 필드 - 그리드 레이아웃 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-brown-700 mb-1">
              이름
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={onChange}
              required
              className="w-full px-4 py-2 border border-sand-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-brown-700 mb-1">
              이메일
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              required
              className="w-full px-4 py-2 border border-sand-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-brown-700 mb-1">
              전화번호
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              value={form.phoneNumber}
              onChange={onChange}
              required
              className="w-full px-4 py-2 border border-sand-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="birthDate" className="block text-sm font-medium text-brown-700 mb-1">
              생년월일
            </label>
            <input
              id="birthDate"
              name="birthDate"
              type="date"
              value={form.birthDate}
              onChange={onChange}
              required
              className="w-full px-4 py-2 border border-sand-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="department" className="block text-sm font-medium text-brown-700 mb-1">
              부서
            </label>
            <input
              id="department"
              name="department"
              type="text"
              value={form.department}
              onChange={onChange}
              required
              className="w-full px-4 py-2 border border-sand-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="grade" className="block text-sm font-medium text-brown-700 mb-1">
              직급
            </label>
            <input
              id="grade"
              name="grade"
              type="text"
              value={form.grade}
              onChange={onChange}
              required
              className="w-full px-4 py-2 border border-sand-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-transparent"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="teamId" className="block text-sm font-medium text-brown-700 mb-1">
              팀
            </label>
            <Select<TeamOption>
              id="teamId"
              value={selectedTeam}
              onChange={(option) => option && onTeamChange(option.value)}
              options={teamOptions}
              placeholder="팀을 선택하세요"
              className="react-select-container"
              classNamePrefix="react-select"
              styles={{
                control: (base, state) => ({
                  ...base,
                  borderColor: state.isFocused ? '#92400e' : '#e7d4c0',
                  boxShadow: state.isFocused ? '0 0 0 2px rgba(146, 64, 14, 0.2)' : 'none',
                  '&:hover': {
                    borderColor: '#92400e'
                  },
                  padding: '2px',
                  borderRadius: '0.5rem'
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected
                    ? '#92400e'
                    : state.isFocused
                    ? '#fef3e2'
                    : 'white',
                  color: state.isSelected ? 'white' : '#78350f',
                  '&:active': {
                    backgroundColor: '#92400e'
                  }
                })
              }}
            />
          </div>
        </div>

        {/* 버튼 */}
        <div className="pt-6 flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-brown-600 text-white py-2 rounded-lg font-medium hover:bg-brown-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "저장 중..." : "프로필 저장"}
          </button>
          <button
            type="button"
            onClick={() => setShowPasswordChange(!showPasswordChange)}
            className="px-6 py-2 border-2 border-brown-500 text-brown-700 rounded-lg font-medium hover:bg-brown-50 transition-all"
          >
            비밀번호 변경
          </button>
        </div>
      </form>

      {/* 비밀번호 변경 섹션 */}
      {showPasswordChange && (
        <div className="mt-6 pt-6 border-t border-sand-200">
          <h3 className="text-lg font-semibold text-brown-900 mb-4">비밀번호 변경</h3>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="currentPassword" className="block text-sm font-medium text-brown-700 mb-1">
                  현재 비밀번호
                </label>
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  className="w-full px-4 py-2 border border-sand-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-brown-700 mb-1">
                  새 비밀번호
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  className="w-full px-4 py-2 border border-sand-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-brown-700 mb-1">
                  비밀번호 확인
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className="w-full px-4 py-2 border border-sand-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-transparent"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-brown-600 text-white py-2 rounded-lg font-medium hover:bg-brown-700 transition-all"
            >
              비밀번호 변경하기
            </button>
          </form>
        </div>
      )}
    </>
  );
}