import { WorkplaceItem } from "@company/components/WorkplaceItem";
import type { WorkplaceResponse } from "@workplace/model";

import { Button } from "@common/ui";

interface WorkplaceListCardProps {
  workplaces: WorkplaceResponse[];
  isEditMode: boolean
  onClick: () => void;
  onItemClick: (id: number) => void;
}

export const WorkplaceListCard = ({ workplaces, isEditMode, onClick, onItemClick }: WorkplaceListCardProps) => {

  return (
    <div className="bg-white border border-sand-200 rounded-lg p-6 shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-brown-900">사업장 목록</h2>
        {isEditMode ? (
          <></>
        ) : (<>
          <Button
            label="사업장 추가"
            onClick={onClick}
          />
        </>)}
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
              onClick={() => onItemClick(workplace.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};