import { Fragment } from "react";

import type { EquipmentResponse } from "@/entities/agency/equipment/model";
import { EquipmentDetailSpec } from "@/features/equipment/ui";

import { TableContainer } from "@shared/ui";

interface EquipmentTableProps {
  equipments: EquipmentResponse[];
  expandedId: string | null;
  onRowClick: (equipmentId: string) => void;
  onEdit: (equipment: EquipmentResponse) => void;
}

const tableHeaderRows = [
  { title: "관리번호" },
  { title: "모델명" },
  { title: "별칭" },
  { title: "제조사" },
  { title: "S/N" },
  { title: "최근 교정일" },
  { title: "교정주기" },
];

export const EquipmentTable = ({ equipments, expandedId, onRowClick, onEdit }: EquipmentTableProps) => {
  return (
    <TableContainer>
      <thead>
        <tr className="bg-gray-300">
          <th className="w-10"></th>
          {tableHeaderRows.map((row) => (
            <th
              key={row.title}
              className="
                whitespace-nowrap
                text-center font-medium
                text-gray-800 uppercase tracking-wider
                p-2 md:py-3
                text-xs md:text-sm">
              {row.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-400">
        {equipments.map((equipment) => {
          const isExpanded = expandedId === equipment.id;
          return (
            <Fragment key={equipment.id}>
              <tr
                onClick={() => onRowClick(equipment.id)}
                className="hover:bg-blue-gray-50 cursor-pointer"
              >
                <td className="p-1 text-center align-middle text-gray-500">
                  <span className="flex justify-center items-center h-full">
                    <svg
                      className={`w-3 h-3 md:w-4 md:h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </td>
                {[
                  equipment.managementNumber || '-',
                  equipment.modelName || '-',
                  equipment.alias || '-',
                  equipment.manufacturer || '-',
                  equipment.serialNumber || '-',
                  equipment.lastCalibrationDate || '-',
                  equipment.calibrationCycle ? `${equipment.calibrationCycle}개월` : '-',
                ].map((col, idx) => (
                  <td
                    key={idx}
                    className="px-1 py-2 whitespace-nowrap text-center text-xs md:text-sm text-gray-600"
                  >
                    {col}
                  </td>
                ))}
              </tr>
              {isExpanded && (
                <tr>
                  <td colSpan={9} className="px-6 py-4 bg-gray-50">
                    <EquipmentDetailSpec equipment={equipment} onEdit={() => onEdit(equipment)} />
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