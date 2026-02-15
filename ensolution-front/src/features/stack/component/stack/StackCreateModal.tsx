import { Modal } from "@shared/ui";
import { StackCreateForm } from "@stack/component";

interface StackCreateModalProps {
  workplaceId: number;
  onClose: () => void;
  onSuccess: () => void;
}

export const StackCreateModal = ({ workplaceId, onClose, onSuccess }: StackCreateModalProps) => {
  return (
    <Modal>
      <StackCreateForm onClose={onClose} onSuccess={onSuccess} workplaceId={workplaceId} />
    </Modal>
  )

};
