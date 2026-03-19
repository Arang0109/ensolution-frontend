import { Fragment } from "react/jsx-runtime";

import { TableContainer } from "@shared/ui";
import type { TeamResponse } from "@entities/agency/team/model";
import type { EquipmentResponse } from "@/entities/agency/equipment/model";

interface TeamEquipmentTableProps {
  team: TeamResponse;
  getEquipment: (equipmentId: string) => EquipmentResponse | undefined;
}

export const TeamEquipmentTable = ({ team, getEquipment }: TeamEquipmentTableProps) => {  
  
  const tableHeaderRows = [
    {title: "-"},
    {title: "별칭"},
    {title: "관리번호"},
    {title: "모델명"},
    {title: "S/N"},
  ];

  const equipmentRows = [
    { label: "입자상 시료채취장비", id: team.particleSamplerId },
    { label: "가스상 시료채취장비", id: team.gasSamplerId },
    { label: "피토우관", id: team.pitotTubeId },
    { label: "노즐", id: team.nozzleId },
  ];

  const tdClassName = `
    px-1 py-2
    whitespace-nowrap
    text-center
    text-xs md:text-sm
    text-gray-600`
  
  return (
    <TableContainer>
      <thead>
        <tr className="bg-gray-300">
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

      <tbody className="bg-white divide-y divide-gray-200">
        {equipmentRows.map(({ label, id }) => {
          const eq = id ? getEquipment(id) : undefined;

          return (
            <tr key={label}>
              <th className={tdClassName}>
                {label}
              </th>

              <td className={tdClassName}>{eq?.alias ?? "-"}</td>
              <td className={tdClassName}>{eq?.managementNumber ?? "-"}</td>
              <td className={tdClassName}>{eq?.modelName ?? "-"}</td>
              <td className={tdClassName}>{eq?.serialNumber ?? "-"}</td>
            </tr>
          );
        })}
      </tbody>

    </TableContainer>
  )
}