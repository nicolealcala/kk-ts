import { db } from "../index.js";
import { cleanUpDatabase } from "./cleanup.js";
import {
  seedPermissions,
  seedRolePermissions,
  seedRoles,
} from "./helpers/references.js";
import { createLookup } from "./utils/map.js";
import { seedUsers } from "./helpers/users.js";
import { seedApplications } from "./helpers/applications.js";
import { seedExperiences } from "./helpers/experiences.js";
import { seedEvents } from "./helpers/events.js";

const seed = async () => {
  console.log("🌱 Seeding database...");

  await db.transaction(async (tx) => {
    await cleanUpDatabase(tx);

    const [dbRoles, dbPermissions] = await Promise.all([
      seedRoles(tx),
      seedPermissions(tx),
    ]);

    const roleByNameLookup = createLookup(dbRoles, "name");
    const permissionByNameLookup = createLookup(dbPermissions, "name");

    await seedRolePermissions(tx, roleByNameLookup, permissionByNameLookup);

    const userRole = roleByNameLookup.get("user");

    if (!userRole) throw new Error("User role not found");

    const seededUsers = await seedUsers(tx, userRole.id);
    const userByEmailLookup = createLookup(seededUsers, "email");
    const johnDoe = userByEmailLookup.get("johndoe@example.com");

    if (!johnDoe) throw new Error("John Doe was not seeded.");

    const [seededApplications, _] = await Promise.all([
      seedApplications(tx, johnDoe.id),
      seedExperiences(tx, johnDoe.id),
    ]);

    const applicationByCompany = createLookup(seededApplications, "company");

    await seedEvents(tx, johnDoe.id, applicationByCompany);
  });

  console.log("✅ Database seeded successfully");
};

seed().catch((error) => {
  console.error("❌ Failed to seed database");
  console.error(error);
  process.exit(1);
});
