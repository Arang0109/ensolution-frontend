import { MenuCardItem, type MenuCard } from "@common/ui";

import { HiOfficeBuilding } from "react-icons/hi";
import { MdBuild } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { MdDashboard, MdTrendingUp, MdSecurity } from "react-icons/md";

export const HomePage = () => {

  const menuCards: MenuCard[] = [
    {
      title: "의뢰업체 관리",
      description: "의뢰업체, 사업장, 시설 정보를 통합 관리합니다",
      icon: <HiOfficeBuilding style={{color: '#525252'}} />,
      path: "/client",
      color: "from-neutral-800 to-neutral-900",
    },
    {
      title: "측정물질 관리",
      description: "공정시험법 상 측정물질을 통합 관리합니다",
      icon: <MdBuild style={{color: '#525252'}} />,
      path: "/pollutant",
      color: "from-neutral-800 to-neutral-900",
    },
    {
      title: "내정보",
      description: "프로필 정보를 확인하고 수정합니다.",
      icon: <FaUserCircle style={{color: '#525252'}} />,
      path: "/me",
      color: "from-neutral-800 to-neutral-900",
    },
  ];

  return (
    <div className="space-y-8">
      {/* 헤더 섹션 */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">
          ENsolution 관리 시스템
        </h1>
        <p className="text-neutral-600 text-lg">
          효율적인 업무 관리를 위한 통합 솔루션
        </p>
      </div>

      {/* 카드 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto container">
        {menuCards.map((card) => (
          <MenuCardItem key={card.path} {...card} />
        ))}
      </div>

      {/* 추가 정보 섹션 */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-slate-200/50 mt-8">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">빠른 안내</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="text-3xl text-neutral-600">
              <MdDashboard />
            </div>
            <h3 className="font-semibold text-neutral-800">실시간 모니터링</h3>
            <p className="text-sm text-neutral-600">
              시설 상태를 실시간으로 확인하고 관리하세요
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-3xl text-neutral-600">
              <MdTrendingUp />
            </div>
            <h3 className="font-semibold text-neutral-800">효율적 관리</h3>
            <p className="text-sm text-neutral-600">
              업체와 시설 정보를 한 곳에서 통합 관리
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-3xl text-neutral-600">
              <MdSecurity />
            </div>
            <h3 className="font-semibold text-neutral-800">안전한 시스템</h3>
            <p className="text-sm text-neutral-600">
              보안이 강화된 안전한 관리 환경 제공
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
