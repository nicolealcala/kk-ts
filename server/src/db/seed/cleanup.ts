import type { Transaction } from "../index.js";
import {
  applications,
  applicationStatusHistory,
  events,
  experiences,
  rolePermissions,
  users,
} from "../schema/index.js";

export const cleanUpDatabase = async (tx: Transaction) => {
  await tx.delete(events);
  await tx.delete(applicationStatusHistory);
  await tx.delete(rolePermissions);
  await tx.delete(applications);
  await tx.delete(experiences);
  await tx.delete(users);
};
