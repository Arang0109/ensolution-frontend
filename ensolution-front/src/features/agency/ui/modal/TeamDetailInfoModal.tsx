import { Modal } from "@shared/ui";
import { IconButton } from "@shared/ui";

import { X } from "lucide-react";

interface TeamDetailInfoModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export const TeamDetailInfoModal = ({ children, onClose }: TeamDetailInfoModalProps) => {
  return (
    <Modal onClose={onClose} size="xl">
      <div className="flex justify-end mb-2">
        <IconButton
          icon={<X />}
          size='md'
          onClick={onClose}
        />
      </div>
      <hr/>
      {children}
    </Modal>
  )
};