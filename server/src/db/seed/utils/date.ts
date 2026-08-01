export const getPreviousWeekday = (weekday: number) => {
  const date = new Date();

  date.setHours(12, 0, 0, 0);

  const currentWeekday = date.getDay();

  const daysSinceMonday = (currentWeekday + 6) % 7;

  date.setDate(date.getDate() - daysSinceMonday - 7);

  date.setDate(date.getDate() + weekday);

  return date;
};

export const getCurrentWeekday = (weekday: number) => {
  const date = new Date();

  date.setHours(12, 0, 0, 0);

  const currentWeekday = date.getDay();

  const daysSinceMonday = (currentWeekday + 6) % 7;

  date.setDate(date.getDate() - daysSinceMonday);

  date.setDate(date.getDate() + weekday);

  return date;
};

export const setTime = (date: Date, hours: number, minutes: number) => {
  const result = new Date(date);

  result.setHours(hours, minutes, 0, 0);

  return result;
};
