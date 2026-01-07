import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { Outlet, useNavigate } from "react-router";
import Header from "./Header";
import Sidebar, { DrawerHeader } from "./Sidebar";
import { supabase } from "@/lib/config/supabaseClient";
import Loader from "../shared/Loader";
export default function RootLayout() {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const navigate = useNavigate();

  const onNavigate = React.useEffectEvent((url: string) => navigate(url));

  React.useEffect(() => {
    async function fetchSession() {
      try {
        const { error } = await supabase.auth.getSession();
        if (error) throw new Error(error.message);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        onNavigate("/auth");
      }
    }

    fetchSession();
  }, []);

  if (isLoading) return <Loader />;

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
    </Box>
  );
}
