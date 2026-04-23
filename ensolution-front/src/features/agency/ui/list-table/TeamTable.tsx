import { Fragment, useState } from "react";

import { useEquipments } from '@/features/equipment/hooks';
import type { TeamResponse } from "@entities/agency/team/model";
import { TeamDetailCard } from "@/features/agency/ui";
import type { EquipmentResponse } from "@/entities/agency/equipment/model";
import { TeamDetailInfoModal } from "@/features/agency/ui";

import { TableContainer } from "@shared/ui";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface TeamTableProps {
  teams: TeamResponse[];
  onEdit: (team: TeamResponse) => void;
  onDelete: (team: TeamResponse) => void;
}

export const TeamTable = ({
  teams,
  onEdit,
  onDelete
}: TeamTableProps) => {
  const [selectedTeam, setSelectedTeam] = useState<TeamResponse | null>(null);
  const { equipments } = useEquipments();

  const getEquipment = (equipmentId: string): EquipmentResponse | undefined => {
    return equipments.find(eq => eq.id === equipmentId);
  };

  const tableHeaderRows = [
    {title: "팀"},
    {title: "차량번호"},
    {title: "사수"},
    {title: "부사수"},
  ];

  const tableBodyRows = teams.map((team) => ({
    id: team.id,
    columns: [
      team.name,
      team.vehicleNumber || "-",
      team.mentor || "-",
      team.mentee || "-",
    ],
    original: team,
  }));

  return (
    <>
    <TableContainer>
      <thead>
        <tr className="bg-gray-300">
          <th className="w-10"></th>
          {tableHeaderRows.map((row) => {
            return (
              <Fragment key={row.title}>
                <th className="
                  text-center font-medium
                text-gray-800 uppercase tracking-wider
                  py-2 md:py-3
                  text-xs md:text-sm">
                  {row.title}
                </th>
              </Fragment>
            )
          })}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-400">
        {tableBodyRows.map((row) => (
          <Fragment key={row.id}>
            <tr
              onClick={() => setSelectedTeam(row.original)}
              className="hover:bg-blue-gray-50 cursor-pointer"
            >
              <td className="p-1 text-center align-middle text-gray-500">
                <span className="flex justify-center items-center h-full">
                  <MagnifyingGlassIcon className="w-3 h-3 md:w-4 md:h-4" />
                </span>
              </td>

              {row.columns.map((col, idx) => (
                <td
                  key={idx}
                  className="
                    px-1 py-2
                    whitespace-nowrap
                    text-center
                    text-xs md:text-sm
                    text-gray-600">
                  {col}
                </td>
              ))}
            </tr>
          </Fragment>
        ))}
      </tbody>
    </TableContainer>

    {selectedTeam && (
      <TeamDetailInfoModal onClose={() => setSelectedTeam(null)}>
        <TeamDetailCard
          team={selectedTeam}
          getEquipment={getEquipment}
          onEdit={() => onEdit(selectedTeam)}
          onDelete={() => onDelete(selectedTeam)}
        />
      </TeamDetailInfoModal>
    )}
    </>
  );
}