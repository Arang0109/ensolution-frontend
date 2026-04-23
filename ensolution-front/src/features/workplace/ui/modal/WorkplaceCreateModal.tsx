import { Modal } from "@shared/ui";
import { WorkplaceCreateContent } from "@/features/workplace/ui";

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
    <Modal size="xl">
      <WorkplaceCreateContent onClose={onClose} onSuccess={onSuccess} companyId={companyId} />
    </Modal>
  );
};
