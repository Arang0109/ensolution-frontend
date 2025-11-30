import { formatBizNumber } from "@/common/utils/formatters";

interface WorkplaceItemProps {
  workplace: {
    id: number;
    name: string;
    address: string;
    bizNumber: string;
    businessCategory: string;
    grade: string;
    remark?: string | null;
  };
  gradeLabel: Record<string, string>;
  onClick: () => void;
}

export const WorkplaceItem = ({ workplace, gradeLabel, onClick }: WorkplaceItemProps) => {
  return (
    <div
      onClick={onClick}
      className="border border-sand-200 rounded-lg p-4 hover:shadow-md hover:border-brown-400 transition-all cursor-pointer"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-800">{workplace.name}</h3>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
          ID: {workplace.id}
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-2">{workplace.address}</p>

      <div className="flex gap-4 text-xs text-gray-500">
        <span>사업자번호: {formatBizNumber(workplace.bizNumber)}</span>
        <span>업종: {workplace.businessCategory}</span>
        <span
          className={`px-2 py-0.5 rounded ${
            workplace.grade === "TYPE_1"
              ? "bg-brown-100 text-brown-800"
              : workplace.grade === "TYPE_2"
              ? "bg-brown-100 text-brown-700"
              : workplace.grade === "TYPE_3"
              ? "bg-sand-200 text-brown-800"
              : workplace.grade === "TYPE_4"
              ? "bg-terracotta-100 text-terracotta-800"
              : "bg-terracotta-200 text-terracotta-900"
          }`}
        >
          사업장 규모 : {gradeLabel[workplace.grade] ?? workplace.grade}
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