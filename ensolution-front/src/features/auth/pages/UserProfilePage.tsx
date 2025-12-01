import { useUserProfileForm } from "@/features/auth/hooks/index";
import Select from "react-select";
import { useState } from "react";

export const UserProfilePage = () => {
  const { form, loading, isSubmitting, onChange, onSubmit, onTeamChange, refetch } = useUserProfileForm();
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const result = await onSubmit(e);
    if (result.success) {
      alert(result.message || "프로필이 성공적으로 수정되었습니다.");
      refetch();
    } else {
      alert(result.message || "프로필 수정에 실패했습니다.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-brown-600">로딩 중...</div>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-brown-600">프로필 정보를 불러올 수 없습니다.</div>
      </div>
    );
  }

  const teamMap: Record<number, string> = {
    1: "1팀",
    2: "2팀",
    3: "3팀",
    4: "4팀",
  };

  const teamOptions = Object.entries(teamMap).map(([key, label]) => ({
    value: Number(key),
    label,
  }));

  // 선택된 값 찾기
  const selectedTeam = teamOptions.find(
    (option) => option.value === Number(form.teamId)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-sand-50 via-brown-50 to-sand-100 p-4">
      <div className="max-w-5xl mx-auto py-8">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-sand-200/50 p-8">
          {/* 헤더 */}
          <header className="mb-8">
            <h1 className="text-2xl font-bold text-brown-900">내 프로필</h1>
            <p className="mt-1 text-sm text-brown-600/80">회원 정보를 확인하고 수정할 수 있습니다.</p>
          </header>

          {/* 프로필 폼 */}
          <form onSubmit={handleSubmit} className="space-y-6">
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
                <Select
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
                className="flex-1 bg-gradient-to-r from-brown-500 to-terracotta-600 text-white py-3 rounded-lg font-medium hover:from-brown-600 hover:to-terracotta-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "저장 중..." : "프로필 저장"}
              </button>
              <button
                type="button"
                onClick={() => setShowPasswordChange(!showPasswordChange)}
                className="px-6 py-3 border-2 border-brown-500 text-brown-700 rounded-lg font-medium hover:bg-brown-50 transition-all"
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

          {/* 가입일 정보 */}
          <div className="mt-6 pt-6 border-t border-sand-200">
            <p className="text-xs text-brown-500/70">
              가입일: {new Date(form.createdAt).toLocaleDateString("ko-KR")}
            </p>
            <p className="text-xs text-brown-500/70 mt-1">
              최종 수정일: {new Date(form.updatedAt).toLocaleDateString("ko-KR")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
