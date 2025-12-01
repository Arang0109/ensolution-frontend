import { Link, Outlet, useNavigate } from 'react-router';
import { logoutApi } from '@auth/api/authApi';
import { useToast } from '@/common/hooks';
import { Dropdown } from '@/common/ui';

export const MainLayout = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-sand-50 via-brown-50 to-sand-100">
      <header className="bg-white/90 backdrop-blur-sm shadow-md border-b border-sand-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* 로고 */}
            <Link
              to="/home"
              className="text-2xl font-bold text-brown-900 no-underline hover:text-brown-700 transition"
            >
              ENsolution
            </Link>

            {/* 네비게이션 & 로그아웃 */}
            <div className="flex items-center gap-6">
              <nav className="flex items-center gap-4">
                <Link
                  to="/home"
                  className="text-brown-700 hover:text-brown-900 font-medium transition no-underline"
                >
                  홈
                </Link>
                <Link
                  to="/me"
                  className="text-brown-700 hover:text-brown-900 font-medium transition no-underline"
                >
                  내정보
                </Link>
                <Dropdown
                  label="관리"
                  items={[
                    { label: '측정대행 의뢰업체', path: '/company' },
                    { label: '측정대상 사업장', path: '/workplace' },
                    { label: '측정시설', path: '/stack' },
                    { label: '측정물질', path: '/pollutant' },
                  ]}
                />
              </nav>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-brown-600 text-white rounded-lg font-medium hover:bg-brown-700 transition-all shadow-sm hover:shadow-md"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};
