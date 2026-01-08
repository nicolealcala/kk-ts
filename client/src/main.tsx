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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a RQ client
const queryClient = new QueryClient();

// Enable MSW Mocking
async function enableMocking() {
  if (import.meta.env.VITE_NODE_ENV !== "development") return;

  const { worker } = await import("./mocks/browser.ts");

  return worker.start();
}

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

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            <RouterProvider router={router} />
          </AuthContextProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </StrictMode>
  );
});
