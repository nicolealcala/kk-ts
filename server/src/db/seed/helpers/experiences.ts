import type { Transaction } from "../../index.js";
import { experiences } from "../../schema/index.js";
import { MOCK_EXPERIENCES } from "../data/experiences.js";

export const seedExperiences = async (tx: Transaction, userId: string) => {
  const experienceRecords = MOCK_EXPERIENCES.map((ex) => ({
    ...ex,
    userId,
  }));

  return tx.insert(experiences).values(experienceRecords);
};
