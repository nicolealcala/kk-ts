import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./lib/config/router.tsx";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./lib/config/theme.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import store from "@/store";
import { Provider } from "react-redux";

// Create a RQ client
const queryClient = new QueryClient();

// Enable MSW Mocking
async function enableMocking() {
  if (import.meta.env.VITE_NODE_ENV !== "development") return;

  const { worker } = await import("./mocks/browser.ts");

  return worker.start();
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
          </ThemeProvider>
        </Provider>
      </QueryClientProvider>
    </StrictMode>,
  );
});
