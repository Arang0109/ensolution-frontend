import { useState } from 'react';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: 로그인 로직 구현
    setTimeout(() => setIsLoading(false), 1000);
  };

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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-brown-700 mb-1.5">
                이메일
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@company.com"
                className="w-full px-3 py-2 text-sm bg-white border border-sand-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-400 focus:border-transparent transition-all placeholder:text-brown-300"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-xs font-medium text-brown-700">
                  비밀번호
                </label>
                <button
                  type="button"
                  className="text-[11px] text-terracotta-600 hover:text-terracotta-700 font-medium"
                >
                  비밀번호 찾기
                </button>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 text-sm bg-white border border-sand-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-400 focus:border-transparent transition-all placeholder:text-brown-300"
                required
              />
            </div>

            <div className="flex items-center pt-0.5">
              <input
                id="remember"
                type="checkbox"
                className="w-3.5 h-3.5 text-brown-600 bg-white border-sand-300 rounded focus:ring-2 focus:ring-brown-400"
              />
              <label htmlFor="remember" className="ml-2 text-xs text-brown-600">
                로그인 상태 유지
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-brown-500 to-terracotta-600 text-white text-sm font-medium py-2.5 rounded-lg hover:from-brown-600 hover:to-terracotta-700 focus:outline-none focus:ring-2 focus:ring-brown-400 focus:ring-offset-2 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-1.5"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  로그인 중...
                </span>
              ) : (
                '로그인'
              )}
            </button>
          </form>

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
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 bg-white border border-sand-300 text-brown-700 text-sm font-medium py-2.5 rounded-lg hover:bg-sand-50 focus:outline-none focus:ring-2 focus:ring-brown-300 transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google로 계속하기
            </button>
          </div>

          {/* 푸터 */}
          <footer className="mt-6 text-center">
            <p className="text-xs text-brown-600">
              계정이 없으신가요?{' '}
              <button className="text-terracotta-600 hover:text-terracotta-700 font-semibold">
                회원가입
              </button>
            </p>
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
