import type { TeamResponse } from "@agency/model";
import type { EquipmentResponse } from "@equipment/model";
import { TeamEquipmentTable } from "./TeamEquipmentTable";

import { Button } from "@shared/ui";

interface TeamDetailCardProps {
  team: TeamResponse;
  getEquipment: (equipmentId: string) => EquipmentResponse | undefined;
  onEdit: () => void;
  onDelete: () => void;
}

export const TeamDetailCard = ({
  team,
  getEquipment,
  onEdit,
  onDelete,
}: TeamDetailCardProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start gap-4">
        <h4 className="font-semibold text-gray-800 mb-3">시료채취장비</h4>

        <div className="flex gap-2">
          <Button label="수정" onClick={onEdit} />
          <Button label="삭제" variant="danger" onClick={onDelete} />
        </div>
        
      </div>
      <TeamEquipmentTable
          team={team}
          getEquipment={getEquipment}
        />
    </div>
  );
}