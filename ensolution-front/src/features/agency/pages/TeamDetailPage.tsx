import { useParams } from "react-router-dom";

import { useTeamDetail, useTeamActions } from "@agency/hooks";
import { TeamInfoCard, TeamMemberListCard, TeamVehicleListCard, TeamSidebar } from "@agency/components";

export const TeamDetailPage = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const { team, users, vehicles, loading } = useTeamDetail(Number(teamId));
  const { handleEdit, handleDelete } = useTeamActions(team);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-xl text-gray-600">팀을 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{team.name}</h1>
            <p className="text-gray-600 mt-1">팀 ID: {team.id}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              수정
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              삭제
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TeamInfoCard team={team} />
          <TeamMemberListCard users={users} />
          <TeamVehicleListCard vehicles={vehicles} />
        </div>

        <TeamSidebar
          team={team}
          userCount={users.length}
          vehicleCount={vehicles.length}
        />
      </div>
    </div>
  );
};
