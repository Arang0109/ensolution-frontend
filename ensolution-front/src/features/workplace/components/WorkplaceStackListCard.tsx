import { StackItem } from '@workplace/components';
import type { StackResponse } from '@stack/model';

import { Button } from "@shared/ui";

interface WorkplaceStackListCardProps {
  stacks: StackResponse[];
  isEditMode?: boolean;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onClick?: () => void;
}

export const WorkplaceStackListCard = ({
  stacks,
  isEditMode=false,
  searchTerm,
  onSearchChange,
  onClick,
}: WorkplaceStackListCardProps) => {
  const showAddButton = !isEditMode && typeof onClick === "function";

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-neutral-900">측정 대상 시설 목록</h2>
        {showAddButton && (
          <Button
            label="측정시설추가"
            onClick={onClick}
            variant="add"
            size="md"
            type="button"
          />
        )}
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="시설명 또는 Sems 번호로 검색..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stacks.map((stack) => (
            <StackItem key={stack.id} stack={stack} />
          ))}
          </div>
        </div>
      )}
    </div>
  );
};
