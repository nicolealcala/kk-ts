import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import DashboardPage from "./pages/Dashboard.tsx";
import ApplicationsPage from "./pages/Applications.tsx";
import SchedulesPage from "./pages/Schedules.tsx";
import NotFound from "./pages/NotFound.tsx";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <RootLayout />,
  //   children: [
  //     { index: true, element: <Dashboard /> },
  //     { path: "/applications", element: <Applications /> },
  //     { path: "/schedule", element: <Schedules /> },
  //     // { path: "/resume", element: <Resume /> },
  //     // { path: "/cover-letter", element: <CoverLetter /> },
  //   ],
  // },
  { path: "/", element: <DashboardPage /> },
  { path: "/applications", element: <ApplicationsPage /> },
  { path: "/schedules", element: <SchedulesPage /> },
  // {
  //   path: "/auth",
  //   element: <Auth />,
  // },
  { path: "*", element: <NotFound /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
