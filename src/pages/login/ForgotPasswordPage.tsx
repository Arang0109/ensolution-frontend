import { useState } from "react";
import { Link } from "react-router";

import { Button } from "@shared/ui";
import { Footer } from "@widgets/index";

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-neutral-50 to-slate-100 p-4">
        <div className="w-full max-w-md">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-md border border-slate-200 p-8">
            <header className="mb-8 text-center">
              <h1 className="text-2xl font-bold text-neutral-900">비밀번호 찾기</h1>
              <p className="mt-1 text-xs text-neutral-600/80">
                가입 시 사용한 이메일 주소를 입력하시면 재설정 링크를 보내드립니다
              </p>
            </header>

            {submitted ? (
              <div className="text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-sm text-neutral-700">
                  <span className="font-medium">{email}</span>으로 재설정 링크를 발송했습니다.
                </p>
                <p className="text-xs text-neutral-500">메일이 오지 않으면 스팸함을 확인해 주세요.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-neutral-700 mb-1.5">
                    이메일
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@company.com"
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all placeholder:text-neutral-300"
                    required
                  />
                </div>

                <Button
                  label="재설정 링크 받기"
                  variant="primary"
                  size="md"
                  width="full"
                  type="submit"
                />
              </form>
            )}

            <footer className="mt-6 text-center">
              <Link
                to="/"
                className="text-xs text-neutral-500 hover:text-primary-500 transition-colors"
              >
                로그인으로 돌아가기
              </Link>
            </footer>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
