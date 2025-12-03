import type { TeamResponse } from "@agency/model/agency.types";

interface TeamInfoCardProps {
  team: TeamResponse;
}

export const TeamInfoCard = ({ team }: TeamInfoCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">팀 정보</h2>
      <div className="space-y-3">
        <div className="flex items-center">
          <span className="text-gray-600 w-24">팀 ID:</span>
          <span className="font-medium">{team.id}</span>
        </div>
        <div className="flex items-center">
          <span className="text-gray-600 w-24">팀 이름:</span>
          <span className="font-medium">{team.name}</span>
        </div>
      </div>
    </div>
  );
};
