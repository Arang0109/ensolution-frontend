import { Link } from "react-router";

import type { LoginRequest } from "@entities/auth/model";

import { Button } from "@shared/ui";

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
        <label htmlFor="username" className="block text-xs font-medium text-neutral-700 mb-1.5">
          아이디
        </label>
        <input
          id="username"
          name="username"
          type="text"
          value={form.username}
          onChange={onChange}
          placeholder="example@company.com"
          className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all placeholder:text-neutral-300"
          required
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor="password" className="block text-xs font-medium text-neutral-700">
            비밀번호
          </label>
          <Link
            to="/forgot-password"
            className="text-xs text-neutral-500 hover:text-primary-500 transition-colors"
          >
            비밀번호 찾기
          </Link>
        </div>
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={onChange}
          placeholder="••••••••"
          className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all placeholder:text-neutral-300"
          required
        />
      </div>

      <div className="flex items-center pt-0.5">
        <input
          id="remember"
          type="checkbox"
          className="w-3.5 h-3.5 text-neutral-600 bg-white border-slate-300 rounded focus:ring-2 focus:ring-primary-400"
        />
        <label htmlFor="remember" className="ml-2 text-xs text-neutral-600">
          로그인 상태 유지
        </label>
      </div>

      <Button
        label="로그인"
        variant="primary"
        size="md"
        width="full"
        type="submit"
        disabled={isLoading}
      />
    </form>
  );
};