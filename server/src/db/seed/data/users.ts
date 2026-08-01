import type { UserSettings } from "../../schema/types.js";

const DEFAULT_USER_SETTINGS: UserSettings = {
  theme: "system",
  language: "en-PH",
  timezone: "Asia/Manila",
  timeFormat: 12,
  dateFormat: "MDY",
};

export const MOCK_USERS = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    password: "Password123!",
    settings: DEFAULT_USER_SETTINGS,
    country: { code: "PH", name: "Philippines" },
  },
];
