import { useQueryClient as useQueryClientPackage } from "@tanstack/react-query";

export const useQueryClient = () => {
  const queryClient = useQueryClientPackage();

  const invalidateQueries = (queryKey: readonly unknown[]) =>
    queryClient.invalidateQueries({
      queryKey,
    });

  return { queryClient, invalidateQueries };
};
