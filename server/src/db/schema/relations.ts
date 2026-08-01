import { defineRelations } from "drizzle-orm";
import * as schema from "./index.js";

export const relations = defineRelations(schema, (r) => ({
  users: {
    role: r.one.roles({
      from: r.users.roleId,
      to: r.roles.id,
    }),
    applications: r.many.applications(),
    experiences: r.many.experiences(),
    events: r.many.events(),
  },
  roles: {
    users: r.many.users(),
    permissions: r.many.permissions({
      from: r.roles.id.through(r.rolePermissions.roleId),
      to: r.permissions.id.through(r.rolePermissions.permissionId),
    }),
  },
  permissions: {
    roles: r.many.roles(),
  },
  rolePermissions: {
    role: r.one.roles({
      from: r.rolePermissions.roleId,
      to: r.roles.id,
    }),
    permission: r.one.permissions({
      from: r.rolePermissions.permissionId,
      to: r.permissions.id,
    }),
  },
  applications: {
    user: r.one.users({
      from: r.applications.userId,
      to: r.users.id,
    }),
    events: r.many.events(),
    statusHistory: r.many.applicationStatusHistory(),
  },
  experiences: {
    user: r.one.users({
      from: r.experiences.userId,
      to: r.users.id,
    }),
  },
  events: {
    user: r.one.users({
      from: r.events.userId,
      to: r.users.id,
    }),
    application: r.one.applications({
      from: r.events.applicationId,
      to: r.applications.id,
    }),
  },
  applicationStatusHistory: {
    application: r.one.applications({
      from: r.applicationStatusHistory.applicationId,
      to: r.applications.id,
    }),
  },
}));
