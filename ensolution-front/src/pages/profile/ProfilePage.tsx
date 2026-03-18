import { FullPageLoader, FullPageError } from "@shared/ui";

import { useUserProfileForm } from "@user/hooks";
import { useTeams } from "@agency/hooks";

import { ProfileForm } from "@user/ui";

export const ProfilePage = () => {
  const { form, loading: profileLoading, isSubmitting, onChange, onSubmit, onTeamChange, refetch } = useUserProfileForm();
  const { teams, loading: teamsLoading } = useTeams();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const result = await onSubmit(e);
    if (result.success) {
      alert(result.message || "프로필이 성공적으로 수정되었습니다.");
      refetch();
    } else {
      alert(result.message || "프로필 수정에 실패했습니다.");
    }
  };

  if (profileLoading || teamsLoading) { return <FullPageLoader />; }
  if (!form) { return <FullPageError message="프로필 정보를 불러올 수 없습니다." />; }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-neutral-50 to-slate-100 p-4">
      <div className="max-w-5xl mx-auto py-8">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/50 p-8">
          {/* 헤더 */}
          <header className="mb-8">
            <h1 className="text-2xl font-bold text-neutral-900">내 프로필</h1>
            <p className="mt-1 text-sm text-neutral-600/80">회원 정보를 확인하고 수정할 수 있습니다.</p>
          </header>

          {/* 프로필 폼 */}
          <ProfileForm 
            form={form}
            teams={teams}
            isSubmitting={isSubmitting}
            onChange={onChange}
            onTeamChange={onTeamChange}
            onSubmit={handleSubmit}
          />

          {/* 가입일 정보 */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-xs text-neutral-500/70">
              가입일: {new Date(form.createdAt).toLocaleDateString("ko-KR")}
            </p>
            <p className="text-xs text-neutral-500/70 mt-1">
              최종 수정일: {new Date(form.modifiedAt).toLocaleDateString("ko-KR")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
