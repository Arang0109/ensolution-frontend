import type { PollutantResponse } from "@/features/pollutant/model/pollutant-types";

import { TableContainer } from "@shared/ui";

interface PollutantTableProps {
  pollutants: PollutantResponse[];
}

export const PollutantTable = ({
  pollutants,
}: PollutantTableProps) => {
    return (
    <TableContainer>
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
            측정물질명
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
            측정방법
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
            시험기기
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
            공정시험법
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
            채취시간 (분)
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
            요구 채취량
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {pollutants.map((pollutant) => (
          <tr
            key={pollutant.id}
            className="cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <td className="px-6 py-4 text-sm font-medium text-gray-900">
              {`${pollutant.nameKr} (${pollutant.nameEn})`}
            </td>
            <td className="px-6 py-4 text-sm text-gray-600 truncate max-w-xs">
              {pollutant.method}
            </td>
            <td className="px-6 py-4 text-sm text-gray-600">
              {pollutant.equipmentName}
            </td>
            <td className="px-6 py-4 text-sm text-gray-600">
              {pollutant.testMethodName}
            </td>
            <td className="px-6 py-4 text-sm text-gray-600">
              {pollutant.samplingTime}
            </td>
            <td className="px-6 py-4 text-sm text-gray-600">
              {pollutant.samplingVolume}
            </td>
          </tr>
        ))}
      </tbody>
    </TableContainer>
  );
};