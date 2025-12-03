import type { TeamResponse } from "@agency/model/agency.types";

interface TeamSidebarProps {
  team: TeamResponse;
  userCount: number;
  vehicleCount: number;
}

export const TeamSidebar = ({ team, userCount, vehicleCount }: TeamSidebarProps) => {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">통계</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">팀원 수</span>
            <span className="text-2xl font-bold text-blue-600">{userCount}명</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">차량 수</span>
            <span className="text-2xl font-bold text-green-600">{vehicleCount}대</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">팀 정보</h3>
        <div className="space-y-2">
          <div>
            <p className="text-sm text-gray-600">팀 이름</p>
            <p className="font-medium">{team.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">팀 ID</p>
            <p className="font-medium">#{team.id}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
