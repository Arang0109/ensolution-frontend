import { Modal } from "@shared/ui";
import { CompanyAddForm } from "./CompanyAddForm";

interface CompanyAddModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const CompanyAddModal = ({ onClose, onSuccess }: CompanyAddModalProps) => {
  return (
    <Modal>
      <CompanyAddForm onClose={onClose} onSuccess={onSuccess} />
    </Modal>
  );
};