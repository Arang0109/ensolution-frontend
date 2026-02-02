import { Modal } from "@shared/ui";
import { WorkplaceCreateForm } from "./WorkplaceCreateForm";

interface AddWorkplaceModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const WorkplaceCreateModal = ({
  onClose,
  onSuccess,
}: AddWorkplaceModalProps) => {
  return (
    <Modal>
      <WorkplaceCreateForm onClose={onClose} onSuccess={onSuccess} />
    </Modal>
  );
};
