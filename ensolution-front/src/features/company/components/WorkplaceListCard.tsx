import { useNavigate } from "react-router-dom";
import { WorkplaceItem } from "./WorkplaceItem";

interface WorkplaceListCardProps {
  workplaces: Array<{
    id: number;
    name: string;
    address: string;
    bizNumber: string;
    businessCategory: string;
    grade: string;
    remark?: string | null;
  }>;
  onAdd?: () => void;
  gradeLabel: Record<string, string>;
}

export const WorkplaceListCard = ({ workplaces, onAdd, gradeLabel }: WorkplaceListCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-sand-200 rounded-lg p-6 shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-brown-900">사업장 목록</h2>
        <button
          onClick={onAdd}
          className="px-3 py-1.5 bg-gradient-to-r from-brown-500 to-brown-600 text-white text-sm rounded-lg hover:from-brown-600 hover:to-brown-700 transition-colors shadow-md"
        >
          사업장 추가
        </button>
      </div>

      {workplaces.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">등록된 사업장이 없습니다.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {workplaces.map(workplace => (
            <WorkplaceItem
              key={workplace.id}
              workplace={workplace}
              gradeLabel={gradeLabel}
              onClick={() => navigate(`/workplace/${workplace.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};