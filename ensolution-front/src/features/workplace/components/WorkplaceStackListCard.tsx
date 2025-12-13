import { useNavigate } from 'react-router-dom';
import { GRADE_LABELS } from '@common/constants';
import type { Grade } from '@common/model/common.types';

interface StackItem {
  id: number;
  name: string;
  semsNumber: string;
  grade: Grade;
  remark?: string | null;
}

interface WorkplaceStackListCardProps {
  stacks: StackItem[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddStack?: () => void;
}

export const WorkplaceStackListCard = ({
  stacks,
  searchTerm,
  onSearchChange,
  onAddStack,
}: WorkplaceStackListCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-sand-200 rounded-lg p-6 shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-brown-900">측정 대상 시설 목록</h2>
        <button
          onClick={onAddStack}
          className="px-3 py-1.5 bg-gradient-to-r from-brown-500 to-brown-600 text-white text-sm rounded-lg hover:from-brown-600 hover:to-brown-700 transition-colors shadow-md"
        >
          시설 추가
        </button>
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="시설명 또는 Sems 번호로 검색..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-2 border border-sand-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
        />
      </div>

      {stacks.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">
            {searchTerm ? '검색 결과가 없습니다.' : '등록된 측정 대상 시설이 없습니다.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {stacks.map((stack) => (
            <div
              key={stack.id}
              onClick={() => navigate(`/stack/${stack.id}`)}
              className="border border-sand-200 rounded-lg p-4 hover:shadow-md hover:border-brown-400 transition-all cursor-pointer"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-800">{stack.name}</h3>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  ID: {stack.id}
                </span>
              </div>
              <div className="flex gap-4 text-xs text-gray-500">
                <span>Sems 번호: {stack.semsNumber}</span>
                <span className="px-2 py-0.5 rounded bg-brown-100 text-brown-800">
                  배출시설 규모: {GRADE_LABELS[stack.grade] ?? stack.grade}
                </span>
              </div>
              {stack.remark && (
                <p className="text-xs text-gray-500 mt-2 pt-2 border-t border-gray-100">
                  {stack.remark}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
