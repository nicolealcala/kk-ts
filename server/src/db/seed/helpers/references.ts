import { sql } from "drizzle-orm";
import type { Transaction } from "../../index.js";
import { permissions, rolePermissions, roles } from "../../schema/index.js";
import { ROLES } from "../data/roles.js";
import { PERMISSIONS } from "../data/permissions.js";
import { ROLE_PERMISSIONS } from "../data/role-permissions.js";

export const seedRoles = async (tx: Transaction) => {
  return tx
    .insert(roles)
    .values(ROLES)
    .onConflictDoUpdate({
      target: roles.name,
      set: { description: sql`excluded.description` },
    })
    .returning();
};

export const seedPermissions = async (tx: Transaction) => {
  return tx
    .insert(permissions)
    .values(PERMISSIONS)
    .onConflictDoUpdate({
      target: permissions.name,
      set: {
        description: sql`excluded.description`,
      },
    })
    .returning();
};

export const seedRolePermissions = async (
  tx: Transaction,
  roleByNameLookup: Map<
    string,
    {
      id: string;
      name: string;
    }
  >,
  permissionByNameLookup: Map<
    string,
    {
      id: string;
      name: string;
    }
  >,
) => {
  const records = Object.entries(ROLE_PERMISSIONS).flatMap(
    ([roleName, permissionNames]) => {
      const role = roleByNameLookup.get(roleName);

      if (!role) {
        throw new Error(`Role not found: ${roleName}`);
      }

      return permissionNames.map((permissionName) => {
        const permission = permissionByNameLookup.get(permissionName);

        if (!permission) {
          throw new Error(`Permission not found: ${permissionName}`);
        }

        return {
          roleId: role.id,
          permissionId: permission.id,
        };
      });
    },
  );

  return tx.insert(rolePermissions).values(records).onConflictDoNothing();
};
