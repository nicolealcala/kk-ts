import * as React from "react";
import { Box, CssBaseline } from "@mui/material";
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
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          p: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <DrawerHeader className="w-full" />
        <Outlet />
      </Box>
    </Box>
  );
}
