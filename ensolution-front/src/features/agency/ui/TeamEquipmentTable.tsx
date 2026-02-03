import { TableContainer } from "@shared/ui";
import type { TeamResponse } from "@agency/model";
import type { EquipmentResponse } from "@equipment/model";

interface TeamEquipmentTableProps {
  team: TeamResponse;
  getEquipment: (equipmentId: string) => EquipmentResponse | undefined;
}

export const TeamEquipmentTable = ({ team, getEquipment }: TeamEquipmentTableProps) => {  
  
  const equipmentRows = [
    { label: "입자상 시료채취장비", id: team.particleSamplerId },
    { label: "가스상 시료채취장비", id: team.gasSamplerId },
    { label: "피토우관", id: team.pitotTubeId },
    { label: "노즐", id: team.nozzleId },
  ];
  
  return (
    <TableContainer>
      <thead className="bg-gray-50">
        <tr className="bg-slate-100">
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            관리번호
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            별칭
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            모델명
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            S/N
          </th>
        </tr>
      </thead>

      <tbody className="bg-white divide-y divide-gray-200">
        {equipmentRows.map(({ label, id }) => {
          const equipment = id ? getEquipment(id) : undefined;

          return (
            <tr key={label}>
              <th
                scope="row"
                className="px-6 py-4 text-sm font-medium text-gray-900 bg-slate-100"
              >
                {label}
              </th>
              <td className="px-6 py-4 text-sm">
                {equipment?.managementNumber ?? ""}
              </td>
              <td className="px-6 py-4 text-sm">
                {equipment?.alias ?? ""}
              </td>
              <td className="px-6 py-4 text-sm">
                {equipment?.modelName ?? ""}
              </td>
              <td className="px-6 py-4 text-sm">
                {equipment?.serialNumber ?? ""}
              </td>
            </tr>
          );
        })}
      </tbody>

    </TableContainer>
  )
}