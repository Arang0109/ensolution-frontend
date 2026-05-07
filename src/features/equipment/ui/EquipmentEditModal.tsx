import { Modal } from "@shared/ui";
import { EquipmentEditForm } from "@/features/equipment/ui";

import type { EquipmentResponse } from "@/entities/agency/equipment/model";

interface EquipmentEditModalProps {
  equipment: EquipmentResponse;
  onClose: () => void;
  onSuccess: () => void;
}


export const EquipmentEditModal = ({ equipment, onClose, onSuccess }: EquipmentEditModalProps) => {

  return (
    <Modal size="lg">
      <EquipmentEditForm equipment={equipment} onClose={onClose} onSuccess={onSuccess} />
    </Modal>
  );
};