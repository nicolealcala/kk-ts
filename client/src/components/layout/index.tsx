import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { Outlet } from "react-router";
import Header from "./Header";
import Sidebar, { DrawerHeader } from "./Sidebar";
import Loader from "../shared/Loader";
import { ToastContainer, Slide } from "react-toastify";

export default function RootLayout() {
  const [open, setOpen] = React.useState(true);

  return (
    <Box sx={{ display: "flex", maxWidth: "100vw" }}>
      <CssBaseline />
      <Header open={open} setOpen={setOpen} />

      {/* Left Sidebar */}
      <Sidebar open={open} />

      {/* Page Content */}
      <Container
        component="main"
        maxWidth={false}
        disableGutters
        sx={{
          position: "relative",
          height: "100dvh",
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
          bgcolor: "slate.extraLight",
          width: "100%",
          overflow: "hidden",
          minWidth: 0,
        }}
      >
        <DrawerHeader className="w-full" />
        <Box sx={{ flex: 1, minHeight: 0 }}>
          <React.Suspense fallback={<Loader />}>
            <Outlet />
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Slide}
              closeButton={true}
            />
          </React.Suspense>
        </Box>
      </Container>
    </Box>
  );
}
