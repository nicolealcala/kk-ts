import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle({ client });

export type Transaction = Parameters<Parameters<typeof db.transaction>[0]>[0];
