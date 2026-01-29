import { Link } from "react-router";

import type { WorkplaceResponse } from "@workplace/model";

import { formatBizNumber } from "@shared/lib";
import { GRADE_LABELS } from '@/shared/model';

interface WorkplaceItemProps {
  workplace: WorkplaceResponse;
}

export const WorkplaceItem = ({ workplace }: WorkplaceItemProps) => {
  return (
    <div
      className="
      border border-slate-200 rounded-lg p-4
      hover:shadow-md hover:border-neutral-400 transition-all cursor-pointer"
    >
      <Link to={`/client/workplace/${workplace.id}`}>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-800">{workplace.name}</h3>
        </div>
      </Link>

      <p className="text-sm text-gray-600 mb-2">{workplace.address}</p>

      <div className="flex gap-4 text-xs text-gray-500">
        <span>사업자번호: {formatBizNumber(workplace.bizNumber)}</span>
        <span>업종: {workplace.businessCategory}</span>
        <span>
          사업장 규모 : {GRADE_LABELS[workplace.grade] ?? workplace.grade}
        </span>
      </div>

      {workplace.remark && (
        <p className="text-xs text-gray-500 mt-2 pt-2 border-t border-gray-100">
          {workplace.remark}
        </p>
      )}
    </div>
  );
};