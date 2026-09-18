export type Country = {
  code: string;
  name: string;
};

export type JobLocation = {
  country?: string | null | undefined;
  countryCode?: string | null | undefined;
  state?: string | null | undefined;
  city?: string | null | undefined;
};

export type ApplicationSource = {
  platform: string;
  url?: string | null | undefined;
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
