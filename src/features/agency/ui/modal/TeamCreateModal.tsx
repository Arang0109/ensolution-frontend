import { Modal } from "@shared/ui";
import { TeamCreateForm } from "@/features/agency/ui";

interface TeamCreateModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const TeamCreateModal = ({ onClose, onSuccess }: TeamCreateModalProps) => {
  return (
    <Modal>
      <TeamCreateForm onClose={onClose} onSuccess={onSuccess} />
    </Modal>
  )
};