import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { relations } from "./schema/relations.js";

export const db = drizzle(process.env.DATABASE_URL!, { relations });

export type Transaction = Parameters<Parameters<typeof db.transaction>[0]>[0];
