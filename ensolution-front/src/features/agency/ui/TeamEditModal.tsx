import { Modal } from '@shared/ui';
import { TeamEditForm } from '@agency/ui';

import type { TeamResponse } from '@agency/model';

interface TeamEditModalProps {
  team: TeamResponse;
  onClose: () => void;
  onSuccess: () => void;
}

export const TeamEditModal = ({ team, onClose, onSuccess }: TeamEditModalProps) => {
  return (
    <Modal>
      <TeamEditForm team={team} onClose={onClose} onSuccess={onSuccess} />
    </Modal>
  )
};
