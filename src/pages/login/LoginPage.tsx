import { LoginForm, SignupHint, SocialLoginButton } from "@/features/auth/components";
import { Footer } from "@widgets/index";

export const LoginPage = () => {
  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-neutral-50 to-slate-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-md border border-slate-200 p-8">
          {/* 헤더 */}
          <header className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-neutral-900">
              Easywork
            </h1>
            <p className="mt-1 text-xs text-neutral-600/80">환경측정 업무를 더 쉽고 빠르게</p>
          </header>

          {/* 로그인 폼 */}
          <LoginForm />

          {/* 구분선 */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-[11px]">
              <span className="px-2 bg-white/95 text-neutral-500">또는</span>
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
      </div>
    </div>
    <Footer />
    </>
  );
};