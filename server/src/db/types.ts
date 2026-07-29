export type Country = {
  code: string;
  name: string;
};

export type JobLocation = {
  countryCode?: string;
  state?: string;
  city?: string;
};

export type ApplicationSource = {
  platform: string;
  url?: string;
};

export type EventLocation =
  | {
      type: "online";
      link?: string;
    }
  | {
      type: "onsite";
      address?: string;
    };

export type UserSettings = {
  theme: "light" | "dark" | "system";
  language: string;
  timezone: string;
  timeFormat?: 12 | 24;
  dateFormat?: "MDY" | "DMY" | "YMD";
};
