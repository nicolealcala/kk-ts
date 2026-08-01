import type { Transaction } from "../../index.js";
import { events } from "../../schema/index.js";
import { MOCK_EVENTS } from "../data/events.js";

export const seedEvents = async (
  tx: Transaction,
  userId: string,
  applicationLookup: Map<string, { id: string }>,
) => {
  const applicationCompanyByEventTitle: Record<string, string> = {
    "Technical Interview": "IBM",
    "Coding Assessment": "IBM",
    "Final Interview": "IBM",
    "Follow up with Recruiters": "Accenture",
  };

  const eventRecords = MOCK_EVENTS.map((e) => {
    const company = applicationCompanyByEventTitle[e.title];

    return {
      ...e,
      userId,
      applicationId: company ? applicationLookup.get(company)?.id : undefined,
    };
  });

  return tx.insert(events).values(eventRecords).returning();
};
