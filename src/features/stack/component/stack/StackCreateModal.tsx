import { Modal } from "@shared/ui";
import { StackCreateContent } from "@/features/stack/component";

interface StackCreateModalProps {
  workplaceId: number;
  onClose: () => void;
  onSuccess: () => void;
}

export const StackCreateModal = ({ workplaceId, onClose, onSuccess }: StackCreateModalProps) => {
  return (
    <Modal>
      <StackCreateContent onClose={onClose} onSuccess={onSuccess} workplaceId={workplaceId} />
    </Modal>
  )

};
