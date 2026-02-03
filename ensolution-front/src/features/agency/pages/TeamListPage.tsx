import { useState } from 'react';

import { Button } from '@shared/ui';
import { useTeams } from '@agency/hooks/useTeams';
import { TeamCreateModal, TeamEditModal } from '@agency/ui';
import { deleteTeam } from '@agency/api/AgencyApi';
import { useToast } from '@app/providers/toast';
import { TeamTable } from '@agency/ui';

import type { TeamResponse } from '@agency/model';

import { FullPageLoader } from '@shared/ui';

export const TeamListPage = () => {
  const { teams, loading, refetch } = useTeams();
  const { showToast } = useToast();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editTeam, setEditTeam] = useState<TeamResponse | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleRowClick = (teamId: number) => {
    setExpandedId(expandedId === teamId ? null : teamId);
  };

  const handleEdit = (team: TeamResponse) => {
    setEditTeam(team);
  };

  const handleDelete = async (team: TeamResponse) => {
    if (!confirm(`"${team.name}" 팀을 삭제하시겠습니까?`)) return;

    try {
      const res = await deleteTeam(team.id);
      if (res.status) {
        showToast('팀이 삭제되었습니다.', 'success');
        refetch();
      } else {
        showToast(res.message || '삭제 중 오류가 발생했습니다.', 'error');
      }
    } catch {
      showToast('삭제 중 오류가 발생했습니다.', 'error');
    }
  };

  if (loading) {
    return <FullPageLoader />;
  }

  return (
    <div className="px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">팀 관리</h1>
        <Button
          label="팀 추가"
          onClick={() => setShowAddModal(true)}
        />
      </div>

      {/* Team Table */}
      <div className="mt-6">
        {teams.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-lg">
              등록된 팀이 없습니다.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              팀 추가 버튼을 눌러 새로운 팀을 등록하세요.
            </p>
          </div>
        ) : (
          <TeamTable
            teams={teams}
            expandedId={expandedId}
            onRowClick={handleRowClick}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      {/* Add Team Modal */}
      {showAddModal && (
        <TeamCreateModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => refetch()}
        />
      )}

      {/* Edit Team Modal */}
      {editTeam && (
        <TeamEditModal
          team={editTeam}
          onClose={() => setEditTeam(null)}
          onSuccess={() => refetch()}
        />
      )}
    </div>
  );
};
