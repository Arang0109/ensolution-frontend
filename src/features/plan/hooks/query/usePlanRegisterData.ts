import { useCompanies } from "@/features/company/hooks";
import { useWorkplaces } from "@/features/workplace/hooks";
import { useStackListQuery, useStackDetailQuery } from "@/features/stack/hooks";
import { useTeams } from "@/features/agency/hooks";
import { useUsers } from "@/features/user/hooks";
import { useEquipments } from "@/features/equipment/hooks";

export const usePlanRegisterData = () => {
  const { companies } = useCompanies();
  const { workplaces } = useWorkplaces();
  const { stacks } = useStackListQuery();
  const { stack, fetchStack } = useStackDetailQuery();

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