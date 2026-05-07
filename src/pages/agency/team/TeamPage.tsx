import { useState } from 'react';

import { useTeams } from '@/features/agency/hooks/useTeams';
import { TeamCreateModal, TeamEditModal } from '@/features/agency/ui';
import { deleteTeam } from '@entities/agency/team/api/AgencyApi';
import { useToast } from '@app/providers/toast';
import { TeamTable } from '@/features/agency/ui';

import type { TeamResponse } from '@entities/agency/team/model';

import { Button, Breadcrumbs, FullPageLoader } from '@shared/ui';

export const TeamPage = () => {
  const { teams, loading, refetch } = useTeams();
  const { showToast } = useToast();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editTeam, setEditTeam] = useState<TeamResponse | null>(null);
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

  const breadcrumbsContents = [
    {title: "대시보드", path: "/dashboard"},
    {title: "측정장비", path: "/equipment"},
  ]

  return (
    <div className="px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-2">
        <Breadcrumbs
          contents={breadcrumbsContents}
        />

        <Button
          label="팀 추가"
          onClick={() => setShowAddModal(true)}
          variant="primary"
          size="md"
          type="button"
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
