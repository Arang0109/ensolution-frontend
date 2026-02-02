import { Fragment } from "react";

import type { EquipmentResponse } from "@equipment/model";
import { EquipmentDetailSpec } from "@equipment/ui";

import { TableContainer } from "@shared/ui";

interface EquipmentTableProps {
  equipments: EquipmentResponse[];
  expandedId: string | null;
  onRowClick: (equipmentId: string) => void;
  onEdit: (equipment: EquipmentResponse) => void;
}

export const EquipmentTable = ({ equipments, expandedId, onRowClick, onEdit }: EquipmentTableProps) => { 
  return (
    <TableContainer>
      <thead className="bg-gray-50">
        <tr>
          <th className="w-10 px-4 py-3"></th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            관리번호
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            모델명
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            별칭
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            제조사
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            S/N
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            최근 교정일
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            교정주기
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {equipments.map((equipment) => {
          const isExpanded = expandedId === equipment.id;
          return (
            <Fragment key={equipment.id}>
              <tr
                onClick={() => onRowClick(equipment.id)}
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
                  {equipment.managementNumber || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {equipment.modelName || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {equipment.alias || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {equipment.manufacturer || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {equipment.serialNumber || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {equipment.lastCalibrationDate || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {equipment.calibrationCycle ? `${equipment.calibrationCycle}개월` : '-'}
                </td>
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
  )
}