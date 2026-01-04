import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { Outlet } from "react-router";
import Header from "./Header";
import Sidebar, { DrawerHeader } from "./Sidebar";

export default function RootLayout() {
  const [open, setOpen] = React.useState(false);

  return (
    <Box sx={{ display: "flex", maxWidth: "100vw" }}>
      <CssBaseline />
      <Header open={open} setOpen={setOpen} />

      {/* Left Sidebar */}
      <Sidebar open={open} />

      {/* Page Content */}
      <Container
        component="main"
        maxWidth="xl"
        disableGutters
        sx={{
          position: "relative",
          height: "100dvh",
          display: "flex",
          flexDirection: "column",
          p: 3,
          minHeight: 0,
          backgroundColor: "#f8fafc",
          width: "100%",
          overflow: "hidden",
          minWidth: 0,
        }}
      >
        <DrawerHeader className="w-full" />
        <Outlet />
      </Container>

      {/* <main className="relative flex flex-col h-dvh w-full min-h-0 bg-green-100 p-3 overflow-hidden">
        <DrawerHeader className="w-full" />
        <Outlet />
      </main> */}
    </Box>
  );
}
