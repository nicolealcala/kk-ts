export const USER_PERMISSIONS = [
  { name: "user.read", description: "View user profile information." },
  { name: "user.update", description: "Update user profile information." },
  { name: "user.delete", description: "Delete user accounts." },
] as const;

export const APPLICATION_PERMISSIONS = [
  { name: "application.create", description: "Create job applications." },
  { name: "application.read", description: "View job applications." },
  {
    name: "application.update",
    description: "Update job applications.",
  },
  { name: "application.delete", description: "Delete job applications." },
] as const;

export const EXPERIENCE_PERMISSIONS = [
  { name: "experience.create", description: "Create work experiences." },
  { name: "experience.read", description: "View work experiences." },
  {
    name: "experience.update",
    description: "Update work experiences.",
  },
  { name: "experience.delete", description: "Delete work experiences." },
] as const;

export const EVENT_PERMISSIONS = [
  { name: "event.create", description: "Create events." },
  { name: "event.read", description: "View events." },
  {
    name: "event.update",
    description: "Update events.",
  },
  { name: "event.delete", description: "Delete events." },
] as const;

export const PERMISSIONS = [
  ...USER_PERMISSIONS,
  ...APPLICATION_PERMISSIONS,
  ...EXPERIENCE_PERMISSIONS,
  ...EVENT_PERMISSIONS,
];
