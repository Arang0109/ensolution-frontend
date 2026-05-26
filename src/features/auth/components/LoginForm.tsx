import { Link } from "react-router";

import { useLoginForm } from "@auth/hooks";

import { Button } from "@shared/ui";

export const LoginForm = () => {

  const {
    form,
    onSubmit,

    handleChange,

    isLoading
  } = useLoginForm();

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
          autoComplete="username"
          value={form.username}
          onChange={handleChange}
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
          autoComplete="current-password"
          value={form.password}
          onChange={handleChange}
          placeholder="••••••••"
          className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all placeholder:text-neutral-300"
          required
        />
      </div>

      <div className="flex items-center pt-0.5">
        <input
          id="remember"
          name="rememberedUsername"
          type="checkbox"
          checked={form.rememberedUsername}
          onChange={handleChange}
          className="w-3.5 h-3.5 text-neutral-600 bg-white border-slate-300 rounded focus:ring-2 focus:ring-primary-400"
        />
        <label htmlFor="remember" className="ml-2 text-xs text-neutral-600">
          아이디 기억하기
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