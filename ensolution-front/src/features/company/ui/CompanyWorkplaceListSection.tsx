import { WorkplaceListTable } from "@workplace/ui";
import type { WorkplaceResponse } from "@workplace/model";

import { Button, SectionHeader, EmptyState } from "@shared/ui";

interface CompanyWorkplaceListSectionProps {
  workplaces: WorkplaceResponse[];
  isEditMode: boolean
  onClick?: () => void;
}

export const CompanyWorkplaceListSection = ({ workplaces, isEditMode=false, onClick }: CompanyWorkplaceListSectionProps) => {

  const showAddButton = !isEditMode && typeof onClick === "function";

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-md">
      <SectionHeader
        title="사업장 목록"
        rightSlot={
          showAddButton && (
            <Button
              label="사업장추가"
              onClick={onClick}
              variant="primary"
              size="md"
              type="button"
            />
          )
        }
      />

      {workplaces.length === 0 ? (
        <EmptyState title="등록된 사업장이 없습니다." />
      ) : (
        <WorkplaceListTable workplaces={workplaces} />
      )}
    </div>
  );
};