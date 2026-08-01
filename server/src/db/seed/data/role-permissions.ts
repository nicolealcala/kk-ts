import {
  APPLICATION_PERMISSIONS,
  EVENT_PERMISSIONS,
  EXPERIENCE_PERMISSIONS,
  PERMISSIONS,
  USER_PERMISSIONS,
} from "./permissions.js";

export const ROLE_PERMISSIONS = {
  admin: PERMISSIONS.map((p) => p.name),
  user: [
    ...USER_PERMISSIONS.map((u) => u.name),
    ...APPLICATION_PERMISSIONS.map((a) => a.name),
    ...EVENT_PERMISSIONS.map((ev) => ev.name),
    ...EXPERIENCE_PERMISSIONS.map((ex) => ex.name),
  ],
};
