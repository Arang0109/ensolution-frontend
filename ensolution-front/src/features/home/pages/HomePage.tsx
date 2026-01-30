import { MdTrendingUp, MdFactory, MdManageAccounts } from "react-icons/md";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { GiChimney } from "react-icons/gi";
import { AiOutlineBarChart, AiOutlineCalendar, AiOutlineFile, AiOutlineTeam, AiOutlineInbox } from "react-icons/ai";
import { CardItem } from "@shared/ui";

export const HomePage = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-6">

      {/* 메인 그리드 영역 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {/* 실시간 모니터링 */}
        <CardItem
          title="장비 교정 알림"
          description="2달 이내에 교정이 필요한 장비 리스트 반환"
          backgroudColor="bg-slate-300"
          icon={<MdTrendingUp />}
        />
        <CardItem
          title="측정대행 의뢰기관"
          path="/company"
          icon={<HiBuildingOffice2 />}
        />

        <CardItem
          title="측정대상 사업장"
          path="/workplace"
          icon={<MdFactory />}
        />
        
        <CardItem
          title="측정시설"
          path="/stack"
          icon={<GiChimney />}
        />
        <CardItem
          title="측정장비"
          path="/equipment"
          icon={<AiOutlineInbox />}
        />
        <CardItem
          title="오늘의 일정 넣기"
          description="팀별 일정 간단하게 표시"
          colSpan={2}
          backgroudColor="bg-slate-200"
          icon={<MdManageAccounts />}
        />
        <CardItem
          title="측정인력"
          path="/team"
          icon={<AiOutlineTeam />}
        />
        <CardItem
          title="측정일정"
          path="/company"
          icon={<AiOutlineCalendar />}
        />
        <CardItem
          title="문서, 보고서"
          path="/company"
          icon={<AiOutlineFile />}
        />
        <CardItem
          title="통계"
          path="/company"
          icon={<AiOutlineBarChart />}
        />
        <CardItem
          title="업무 처리 효율 극대화"
          description="측정 데이터를 신속하고 정확하게 통합 관리할 수 있습니다."
          backgroudColor="bg-slate-300"
          icon={<MdManageAccounts />}
        />
      </div>
    </div>
  );
};
