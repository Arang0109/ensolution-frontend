import { Modal } from "@shared/ui";
import { CompanyCreateContent } from "@workplace/component";

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
      <CompanyCreateContent onClose={onClose} onSuccess={onSuccess} companyId={companyId} />
    </Modal>
  );
};
