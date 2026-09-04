export const applicationKeys = {
  all: ["applications"] as const,

  lists: () => [...applicationKeys.all, "list"] as const,

  list: (urlQuery: string, keys: string[] = []) =>
    [...applicationKeys.lists(), urlQuery, ...keys] as const,

  details: () => [...applicationKeys.all, "detail"] as const,

  detail: (id: string) => [...applicationKeys.details(), id] as const,
};
