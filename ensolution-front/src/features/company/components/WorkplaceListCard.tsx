import { WorkplaceItem } from "@company/components/WorkplaceItem";
import type { WorkplaceResponse } from "@workplace/model";

import { Button } from "@common/ui";

interface WorkplaceListCardProps {
  workplaces: WorkplaceResponse[];
  isEditMode: boolean
  onClick: () => void;
}

export const WorkplaceListCard = ({ workplaces, isEditMode, onClick }: WorkplaceListCardProps) => {

  return (
    <div className="bg-white border border-sand-200 rounded-lg shadow-md">
      <div className="flex justify-between items-center bg-gradient-to-r from-brown-50 to-sand-50 px-6 py-4 border-b border-sand-200">
        <h2 className="text-xl font-semibold text-brown-900 flex items-center gap-2">
          <span className="w-1 h-6 bg-brown-600 rounded-full"></span>
          사업장 목록
        </h2>
        {isEditMode ? (
          <></>
        ) : (<>
          <Button label="사업장 추가" onClick={onClick} />
        </>)}
      </div>

      {workplaces.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">등록된 사업장이 없습니다.</p>
        </div>
      ) : (
        <div className="space-y-3 m-6">
          {workplaces.map(workplace => (
            <WorkplaceItem
              key={workplace.id}
              workplace={workplace}
            />
          ))}
        </div>
      )}
    </div>
  );
};