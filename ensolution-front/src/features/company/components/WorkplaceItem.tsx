import { formatBizNumber } from "@common/utils/formatters";
import { GRADE_LABELS } from '@common/constants';
import type { Grade } from '@common/model/common.types';

interface WorkplaceItemProps {
  workplace: {
    id: number;
    name: string;
    address: string;
    bizNumber: string;
    businessCategory: string;
    grade: Grade;
    remark?: string | null;
  };
  onClick: () => void;
}

export const WorkplaceItem = ({ workplace, onClick }: WorkplaceItemProps) => {
  return (
    <div
      onClick={onClick}
      className="
      border border-sand-200 rounded-lg p-4
      hover:shadow-md hover:border-brown-400 transition-all cursor-pointer"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-800">{workplace.name}</h3>
      </div>

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