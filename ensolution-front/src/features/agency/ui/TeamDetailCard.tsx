import { EQUIP_TYPE_LABELS, EquipType } from "@equipment/model";
import type { TeamResponse } from "@agency/model";

interface TeamDetailCardProps {
  team: TeamResponse;
  getEquipmentName: (equipmentId: string) => string;
  onEdit: () => void;
  onDelete: () => void;
}

export const TeamDetailCard = ({
  team,
  getEquipmentName,
  onEdit,
  onDelete,
}: TeamDetailCardProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-semibold text-gray-800 mb-3">배정된 장비</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-gray-500 text-sm">{EQUIP_TYPE_LABELS[EquipType.PARTICLE_SAMPLER]}</span>
              <p className="font-medium">{getEquipmentName(team.particleSamplerId)}</p>
            </div>
            <div>
              <span className="text-gray-500 text-sm">{EQUIP_TYPE_LABELS[EquipType.GAS_SAMPLER]}</span>
              <p className="font-medium">{getEquipmentName(team.gasSamplerId)}</p>
            </div>
            <div>
              <span className="text-gray-500 text-sm">{EQUIP_TYPE_LABELS[EquipType.PITOT_TUBE]}</span>
              <p className="font-medium">{getEquipmentName(team.pitotTubeId)}</p>
            </div>
            <div>
              <span className="text-gray-500 text-sm">{EQUIP_TYPE_LABELS[EquipType.NOZZLE]}</span>
              <p className="font-medium">{getEquipmentName(team.nozzleId)}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="px-4 py-2 bg-neutral-800 text-white text-sm rounded-lg hover:bg-neutral-900 transition-colors"
          >
            수정
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}