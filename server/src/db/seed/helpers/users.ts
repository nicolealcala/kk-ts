import { AuthService } from "../../../services/auth.service.js";
import type { Transaction } from "../../index.js";
import { users } from "../../schema/index.js";
import { MOCK_USERS } from "../data/users.js";

export const seedUsers = async (tx: Transaction, userRoleId: string) => {
  const userRecords = await Promise.all(
    MOCK_USERS.map(async (u) => ({
      ...u,
      passwordHash: await AuthService.hashPassword(u.password),
      roleId: userRoleId,
    })),
  );

  return tx.insert(users).values(userRecords).returning();
};
