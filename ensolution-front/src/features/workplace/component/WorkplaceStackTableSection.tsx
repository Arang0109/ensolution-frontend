import { StackListTable } from '@stack/component';
import type { StackResponse } from '@stack/model';

import { Button, SectionHeader, EmptyState } from "@shared/ui";

interface WorkplaceStackTableSectionProps {
  stacks: StackResponse[];
  isEditMode?: boolean;
  onClick?: () => void;
}

export const WorkplaceStackTableSection = ({
  stacks,
  isEditMode=false,
  onClick,
}: WorkplaceStackTableSectionProps) => {
  const showAddButton = !isEditMode && typeof onClick === "function";

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-md">
      <SectionHeader
        title="측정시설 목록"
        rightSlot={
          showAddButton && (
            <Button
              label="측정시설추가"
              onClick={onClick}
              variant="primary"
              size="md"
              type="button"
            />
          )
        }
      />

      {stacks.length === 0 ? (
        <EmptyState title='등록된 측정시설이 없습니다.' />
      ) : (
        <StackListTable stacks={stacks} />
      )}
    </div>
  );
};
