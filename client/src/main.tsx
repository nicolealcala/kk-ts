import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import DashboardPage from "./pages/Dashboard.tsx";
import ApplicationsPage from "./pages/Applications.tsx";
import SchedulesPage from "./pages/Schedules.tsx";
import NotFound from "./pages/NotFound.tsx";
import RootLayout from "./components/layout/index.tsx";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./lib/config/theme.ts";
import AuthPage from "./pages/Auth.tsx";
import AuthContextProvider from "./components/context-providers/AuthContextProvider.tsx";

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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </ThemeProvider>
  </StrictMode>
);
