import { createBrowserRouter } from "react-router";
import NotFound from "@/pages/NotFound.tsx";
import RootLayout from "@/components/layout/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        lazy: async () => {
          const Dashboard = (await import("@/pages/Dashboard.tsx")).default;
          return { Component: Dashboard };
        },
      },
      {
        path: "/applications",
        lazy: async () => {
          const Applications = (await import("@/pages/Applications.tsx"))
            .default;
          return { Component: Applications };
        },
      },
      {
        path: "/schedules",
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
