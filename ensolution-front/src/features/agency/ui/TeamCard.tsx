import type { TeamResponse } from "@/features/agency/model/agency-types";

interface TeamCardProps {
  team: TeamResponse;
  onClick?: () => void;
}

export const TeamCard = ({ team, onClick }: TeamCardProps) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">{team.name}</h3>
      </div>

      <div className="flex items-center text-blue-600">
        <span className="text-sm">자세히 보기</span>
        <svg
          className="w-4 h-4 ml-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  );
};
