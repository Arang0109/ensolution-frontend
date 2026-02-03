import { Modal } from "@shared/ui";
import { EquipmentCreateForm } from "@equipment/ui";

interface EquipmentCreateModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const EquipmentCreateModal = ({ onClose, onSuccess }: EquipmentCreateModalProps) => {

  return (
    <Modal size="lg">
      <EquipmentCreateForm onClose={onClose} onSuccess={onSuccess} />
    </Modal>
  );
};