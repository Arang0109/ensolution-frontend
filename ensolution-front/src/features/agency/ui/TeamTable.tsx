import { Fragment } from "react";

import { useEquipments } from '@equipment/hooks';
import type { TeamResponse } from "@agency/model";
import { TeamDetailCard } from "@agency/ui";
import type { EquipmentResponse } from "@equipment/model";

import { TableContainer } from "@shared/ui";

interface TeamTableProps {
  teams: TeamResponse[];
  expandedId: number | null;
  onRowClick: (teamId: number) => void;
  onEdit: (team: TeamResponse) => void;
  onDelete: (team: TeamResponse) => void;
}

export const TeamTable = ({
  teams,
  expandedId,
  onRowClick,
  onEdit,
  onDelete
}: TeamTableProps) => {
  const { equipments } = useEquipments();

  const getEquipment = (equipmentId: string): EquipmentResponse | undefined => {
    return equipments.find(eq => eq.id === equipmentId);
  };

  return (
    <TableContainer>
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
            사수
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            부사수
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
              </tr>
              {isExpanded && (
                <tr>
                  <td colSpan={5} className="px-6 py-4 bg-gray-50">
                    <TeamDetailCard
                      team={team}
                      getEquipment={getEquipment}
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
    </TableContainer>
  );
}