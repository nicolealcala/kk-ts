import { createBrowserRouter } from "react-router";
import NotFound from "@/pages/NotFound.tsx";
import RootLayout from "@/components/layout/index.tsx";
import Dashboard from "@/pages/Dashboard";
import Loader from "@/components/shared/Loader";
import SchedulesSkeleton from "@/components/schedules/SchedulesSkeleton";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/applications",
        HydrateFallback: () => <Loader />,
        lazy: async () => {
          const Applications = (await import("@/pages/Applications.tsx"))
            .default;
          return { Component: Applications };
        },
      },
      {
        path: "/schedules",
        HydrateFallback: () => <SchedulesSkeleton />,
        lazy: async () => {
          const Schedules = (await import("@/pages/Schedules.tsx")).default;
          return { Component: Schedules };
        },
      },
    ],
  },
  {
    path: "/auth",
    lazy: async () => {
      const Auth = (await import("@/pages/Auth.tsx")).default;
      return { Component: Auth };
    },
  },
  { path: "*", element: <NotFound /> },
]);

export default router;
