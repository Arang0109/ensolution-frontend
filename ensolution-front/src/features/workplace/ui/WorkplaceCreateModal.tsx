import { Modal } from "@shared/ui";
import { WorkplaceCreateForm } from "./WorkplaceCreateForm";

interface AddWorkplaceModalProps {
  companyId: number,
  onClose: () => void;
  onSuccess: () => void;
}

export const WorkplaceCreateModal = ({
  companyId,
  onClose,
  onSuccess,
}: AddWorkplaceModalProps) => {
  return (
    <Modal>
      <WorkplaceCreateForm onClose={onClose} onSuccess={onSuccess} companyId={companyId} />
    </Modal>
  );
};
