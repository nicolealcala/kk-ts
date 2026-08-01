import type { Transaction } from "../../index.js";
import { users } from "../../schema/index.js";
import { MOCK_USERS } from "../data/users.js";

export const seedUsers = async (tx: Transaction, userRoleId: string) => {
  const userRecords = MOCK_USERS.map((u) => ({
    ...u,
    roleId: userRoleId,
  }));

  return tx.insert(users).values(userRecords).returning();
};
