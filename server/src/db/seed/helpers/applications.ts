import type { Transaction } from "../../index.js";
import { applications } from "../../schema/index.js";
import { MOCK_APPLICATIONS } from "../data/applications.js";

export const seedApplications = async (tx: Transaction, userId: string) => {
  const applicationRecords = MOCK_APPLICATIONS.map((a) => ({
    ...a,
    userId,
  }));

  return tx.insert(applications).values(applicationRecords).returning();
};
