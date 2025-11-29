import { LoginForm, SignupHint, SocialLoginButton } from "@auth/ui";
import { useLoginForm } from "@/features/auth/hooks/useLoginForm";

export const LoginPage = () => {

  const { form, isLoading, onChange, onSubmit } = useLoginForm();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sand-50 via-brown-50 to-sand-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-sand-200/50 p-8">
          {/* 헤더 */}
          <header className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-brown-500 to-terracotta-600 rounded-xl mb-3 shadow-md">
              <span className="text-lg font-bold text-white">E</span>
            </div>
            <h1 className="text-2xl font-bold text-brown-900">
              Easywork
            </h1>
            <p className="mt-1 text-xs text-brown-600/80">환경측정 업무를 더 쉽고 빠르게</p>
          </header>

          {/* 로그인 폼 */}
          <LoginForm
            form={form}
            isLoading={isLoading}
            onChange={onChange}
            onSubmit={onSubmit}
          />

          {/* 구분선 */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-sand-200"></div>
            </div>
            <div className="relative flex justify-center text-[11px]">
              <span className="px-2 bg-white/95 text-brown-500">또는</span>
            </div>
          </div>

          {/* 소셜 로그인 */}
          <div>
            <SocialLoginButton />
          </div>

          {/* 푸터 */}
          <footer className="mt-6 text-center">
            <SignupHint />
          </footer>
        </div>

        {/* 추가 정보 */}
        <p className="mt-6 text-center text-[11px] text-brown-500/70">
          © 2024 Easywork. All rights reserved.
        </p>
      </div>
    </div>
  );
};
