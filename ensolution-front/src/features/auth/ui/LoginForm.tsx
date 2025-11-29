import type { LoginRequest } from "@auth/model";

interface LoginFormProps {
  form: LoginRequest;
  isLoading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const LoginForm = ({
  form,
  isLoading,
  onChange,
  onSubmit,
}: LoginFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="username" className="block text-xs font-medium text-brown-700 mb-1.5">
          아이디
        </label>
        <input
          id="username"
          name="username"
          type="text"
          value={form.username}
          onChange={onChange}
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
          name="password"
          type="password"
          value={form.password}
          onChange={onChange}
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
  );
};