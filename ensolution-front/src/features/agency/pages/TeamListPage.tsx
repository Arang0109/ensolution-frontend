import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useTeams } from "@agency/hooks/useTeams";
import { TeamCard } from "@agency/components/TeamCard";

export const TeamListPage = () => {
  const navigate = useNavigate();
  const { teams, loading } = useTeams();
  const [showAddModal, setShowAddModal] = useState(false);

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">팀 관리</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-neutral-800 to-neutral-900 text-white rounded-lg hover:from-neutral-900 hover:to-neutral-950 transition-colors flex items-center gap-2 shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          팀 추가
        </button>
      </div>

      {teams.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-500 text-lg">등록된 팀이 없습니다.</p>
          <p className="text-gray-400 text-sm mt-2">새 팀을 추가해보세요.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {teams.map((team) => (
            <TeamCard
              key={team.id}
              team={team}
              onClick={() => navigate(`/agency/team/${team.id}`)}
            />
          ))}
        </div>
      )}

      {/* TODO: 팀 추가 모달 구현 */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">팀 추가</h2>
            <p className="text-gray-600 mb-4">팀 추가 기능은 추후 구현 예정입니다.</p>
            <button
              onClick={() => setShowAddModal(false)}
              className="w-full px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
