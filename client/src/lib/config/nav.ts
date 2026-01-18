/**
 * This file contains navigation links to be displayed in the sidebar/menu bar
 */

import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

export const navLinks = [
  { name: "Dashboard", path: "/", icon: AutoGraphIcon },
  { name: "Applications", path: "/applications", icon: FormatListBulletedIcon },
  { name: "Schedules", path: "/schedules", icon: CalendarMonthIcon },
];
