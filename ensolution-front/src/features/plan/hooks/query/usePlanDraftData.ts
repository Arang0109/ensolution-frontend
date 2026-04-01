import { useStackDetailQuery } from "@stack/hooks";

export const usePlanDraftData = () => {
  const { stack, fetchStack, loading: stackLoading } = useStackDetailQuery();

  return {
    stack,
    fetchStack,
    stackLoading,
  };
};