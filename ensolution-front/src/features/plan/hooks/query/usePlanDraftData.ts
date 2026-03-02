import { useStackDetailQuery } from "@stack/hooks";

export const usePlanDraftData = () => {
  const { stack, fetchStack } = useStackDetailQuery();

  return {
    stack,
    fetchStack,
  };
};