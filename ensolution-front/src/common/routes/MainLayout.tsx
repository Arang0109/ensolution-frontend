import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router';
import { logoutApi } from '@auth/api/authApi';
import { useToast } from '@/common/hooks';
import { Dropdown } from '@/common/ui';

export const MainLayout = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutApi();
      localStorage.removeItem('accessToken');
      showToast('로그아웃되었습니다.', 'success');
      navigate('/');
    } catch (error) {
      console.error('로그아웃 실패:', error);
      showToast('로그아웃에 실패했습니다.', 'error');
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sand-50 via-brown-50 to-sand-100">
      <header className="bg-white/90 backdrop-blur-sm shadow-md border-b border-sand-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* 로고 */}
            <Link
              to="/dashboard"
              className="text-2xl font-bold text-brown-900 no-underline hover:text-brown-700 transition"
              onClick={closeMobileMenu}
            >
              ENsolution
            </Link>

            {/* 데스크탑 네비게이션 */}
            <div className="hidden lg:flex items-center gap-6">
              <nav className="flex items-center gap-4">
                <Dropdown
                  label="측정대행 의뢰업체"
                  items={[
                    { label: '의뢰업체', path: '/client/company' },
                    { label: '측정대상 사업장', path: '/client/workplace' },
                    { label: '측정시설', path: '/client/stack' },
                  ]}
                />
                <Dropdown
                  label="측정 관리"
                  items={[
                    { label: '측정팀', path: '/agency/team' },
                    { label: '차량', path: '/agency/vehicle' },
                  ]}
                />
                <Dropdown
                  label="실험실"
                  items={[
                    { label: '측정물질', path: '/lab/pollutant' },
                  ]}
                />
                <Dropdown
                  label="일정"
                  items={[
                    { label: '측정일정', path: '/schedule' },
                  ]}
                />
                <Link
                  to="/me"
                  className="text-brown-700 hover:text-brown-900 font-medium transition no-underline"
                >
                  내정보
                </Link>
              </nav>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-brown-600 text-white rounded-lg font-medium hover:bg-brown-700 transition-all shadow-sm hover:shadow-md"
              >
                로그아웃
              </button>
            </div>

            {/* 모바일 햄버거 버튼 */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-brown-700 hover:text-brown-900 focus:outline-none"
              aria-label="메뉴 열기"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* 모바일 메뉴 */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-sand-200 pt-4">
              <nav className="flex flex-col gap-3">
                <Link
                  to="/home"
                  className="text-brown-700 hover:text-brown-900 font-medium transition no-underline py-2"
                  onClick={closeMobileMenu}
                >
                  홈
                </Link>

                {/* 측정대행 의뢰업체 */}
                <div className="space-y-2">
                  <div className="text-brown-900 font-semibold text-sm">측정대행 의뢰업체</div>
                  <div className="pl-4 space-y-2">
                    <Link
                      to="/client/company"
                      className="block text-brown-600 hover:text-brown-900 transition no-underline py-1"
                      onClick={closeMobileMenu}
                    >
                      의뢰업체
                    </Link>
                    <Link
                      to="/client/workplace"
                      className="block text-brown-600 hover:text-brown-900 transition no-underline py-1"
                      onClick={closeMobileMenu}
                    >
                      측정대상 사업장
                    </Link>
                    <Link
                      to="/client/stack"
                      className="block text-brown-600 hover:text-brown-900 transition no-underline py-1"
                      onClick={closeMobileMenu}
                    >
                      측정시설
                    </Link>
                  </div>
                </div>

                {/* 측정대행업체 */}
                <div className="space-y-2">
                  <div className="text-brown-900 font-semibold text-sm">측정대행업체</div>
                  <div className="pl-4 space-y-2">
                    <Link
                      to="/agency/team"
                      className="block text-brown-600 hover:text-brown-900 transition no-underline py-1"
                      onClick={closeMobileMenu}
                    >
                      측정팀
                    </Link>
                    <Link
                      to="/agency/vehicle"
                      className="block text-brown-600 hover:text-brown-900 transition no-underline py-1"
                      onClick={closeMobileMenu}
                    >
                      차량
                    </Link>
                  </div>
                </div>

                {/* 실험실 */}
                <div className="space-y-2">
                  <div className="text-brown-900 font-semibold text-sm">실험실</div>
                  <div className="pl-4 space-y-2">
                    <Link
                      to="/lab/pollutant"
                      className="block text-brown-600 hover:text-brown-900 transition no-underline py-1"
                      onClick={closeMobileMenu}
                    >
                      측정물질
                    </Link>
                  </div>
                </div>

                <Link
                  to="/me"
                  className="text-brown-700 hover:text-brown-900 font-medium transition no-underline py-2"
                  onClick={closeMobileMenu}
                >
                  내정보
                </Link>

                <button
                  onClick={() => {
                    handleLogout();
                    closeMobileMenu();
                  }}
                  className="mt-2 px-4 py-2 bg-brown-600 text-white rounded-lg font-medium hover:bg-brown-700 transition-all shadow-sm hover:shadow-md text-left"
                >
                  로그아웃
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};
