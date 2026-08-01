export const createLookup = <T, K extends keyof T>(records: T[], key: K) => {
  return new Map(records.map((r) => [r[key], r]));
};
