import { useState, Fragment } from 'react';

import { Button } from '@shared/ui';
import { useTeams } from '@agency/hooks/useTeams';
import { useEquipments } from '@equipment/hooks/useEquipments';
import { TeamAddModal, TeamEditModal } from '@agency/ui';
import { EquipType, EQUIP_TYPE_LABELS } from '@equipment/model';
import { deleteTeam } from '@agency/api/AgencyApi';
import { useToast } from '@app/providers/toast';

import type { TeamResponse } from '@agency/model';

export const TeamListPage = () => {
  const { teams, loading, refetch } = useTeams();
  const { equipments } = useEquipments();
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

  const getEquipmentName = (equipmentId: string) => {
    if (!equipmentId) return '-';
    const equipment = equipments.find(eq => eq.id === equipmentId);
    if (!equipment) return '-';
    return equipment.alias || equipment.equipmentName || equipment.managementNumber;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">팀 관리</h1>
        <Button label="팀 추가" onClick={() => setShowAddModal(true)} />
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
            getEquipmentName={getEquipmentName}
          />
        )}
      </div>

      {/* Add Team Modal */}
      {showAddModal && (
        <TeamAddModal
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

interface TeamTableProps {
  teams: TeamResponse[];
  expandedId: number | null;
  onRowClick: (teamId: number) => void;
  onEdit: (team: TeamResponse) => void;
  onDelete: (team: TeamResponse) => void;
  getEquipmentName: (equipmentId: string) => string;
}

const TeamTable = ({ teams, expandedId, onRowClick, onEdit, onDelete, getEquipmentName }: TeamTableProps) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="w-10 px-4 py-3"></th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              팀 이름
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              차량 번호
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {EQUIP_TYPE_LABELS[EquipType.PARTICLE_SAMPLER]}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {EQUIP_TYPE_LABELS[EquipType.GAS_SAMPLER]}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {teams.map((team) => {
            const isExpanded = expandedId === team.id;
            return (
              <Fragment key={team.id}>
                <tr
                  onClick={() => onRowClick(team.id)}
                  className={`hover:bg-gray-50 cursor-pointer transition-colors ${isExpanded ? 'bg-gray-50' : ''}`}
                >
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    <svg
                      className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {team.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {team.vehicleNumber || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getEquipmentName(team.particleSamplerId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getEquipmentName(team.gasSamplerId)}
                  </td>
                </tr>
                {isExpanded && (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 bg-gray-50">
                      <TeamDetailPanel
                        team={team}
                        getEquipmentName={getEquipmentName}
                        onEdit={() => onEdit(team)}
                        onDelete={() => onDelete(team)}
                      />
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

interface TeamDetailPanelProps {
  team: TeamResponse;
  getEquipmentName: (equipmentId: string) => string;
  onEdit: () => void;
  onDelete: () => void;
}

const TeamDetailPanel = ({ team, getEquipmentName, onEdit, onDelete }: TeamDetailPanelProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-semibold text-gray-800 mb-3">배정된 장비</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-gray-500 text-sm">{EQUIP_TYPE_LABELS[EquipType.PARTICLE_SAMPLER]}</span>
              <p className="font-medium">{getEquipmentName(team.particleSamplerId)}</p>
            </div>
            <div>
              <span className="text-gray-500 text-sm">{EQUIP_TYPE_LABELS[EquipType.GAS_SAMPLER]}</span>
              <p className="font-medium">{getEquipmentName(team.gasSamplerId)}</p>
            </div>
            <div>
              <span className="text-gray-500 text-sm">{EQUIP_TYPE_LABELS[EquipType.PITOT_TUBE]}</span>
              <p className="font-medium">{getEquipmentName(team.pitotTubeId)}</p>
            </div>
            <div>
              <span className="text-gray-500 text-sm">{EQUIP_TYPE_LABELS[EquipType.NOZZLE]}</span>
              <p className="font-medium">{getEquipmentName(team.nozzleId)}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="px-4 py-2 bg-neutral-800 text-white text-sm rounded-lg hover:bg-neutral-900 transition-colors"
          >
            수정
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};
