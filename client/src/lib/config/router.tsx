import { createBrowserRouter } from "react-router";

import AuthPage from "@/pages/Auth.tsx";
import DashboardPage from "@/pages/Dashboard.tsx";
import ApplicationsPage from "@/pages/Applications.tsx";
import SchedulesPage from "@/pages/Schedules.tsx";
import NotFound from "@/pages/NotFound.tsx";
import RootLayout from "@/components/layout/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "/applications", element: <ApplicationsPage /> },
      { path: "/schedules", element: <SchedulesPage /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
  { path: "*", element: <NotFound /> },
]);

export default router;
