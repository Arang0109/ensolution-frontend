import { useCompanies } from "@company/hooks";
import { useWorkplaces } from "@workplace/hooks";
import { useStacks, useStackDetail } from "@stack/hooks";
import { useTeams } from "@agency/hooks";
import { useUsers } from "@auth/hooks";
import { useEquipments } from "@equipment/hooks";

export const usePlanRegisterData = () => {
  const { companies } = useCompanies();
  const { workplaces } = useWorkplaces();
  const { stacks } = useStacks();
  const { stack, fetchStack } = useStackDetail();

  const { teams } = useTeams();
  const { users } = useUsers();
  const { equipments } = useEquipments();

  return {
    companies,
    workplaces,
    stacks,

    stack,
    fetchStack,

    teams,
    users,
    equipments,
  };
};