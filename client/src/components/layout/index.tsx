import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { Outlet, useNavigate } from "react-router";
import Header from "./Header";
import Sidebar, { DrawerHeader } from "./Sidebar";
import Loader from "../shared/Loader";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/useRedux";
import supabase from "@/lib/config/supabaseClient";
import { setAuthSession } from "@/store/auth/authSlice";
export default function RootLayout() {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const dispatch = useAppDispatch();
  const { authSession } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  const onNavigate = React.useEffectEvent((url: string) => navigate(url));

  React.useEffect(() => {
    // 1. Define a function to initialize auth
    const initializeAuth = async () => {
      // Get the current session immediately on load
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // Update Redux
      dispatch(setAuthSession(session));

      // 2. NOW we are done loading the initial check
      setIsLoading(false);
    };

    initializeAuth();

    // 3. Listen for future changes (login, logout, token refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(setAuthSession(session));

      // If a user logs out in another tab, kick them to auth
      if (!session) onNavigate("/auth");
    });

    return () => subscription.unsubscribe();
  }, [dispatch]);

  React.useEffect(() => {
    if (!isLoading && !authSession) {
      onNavigate("/auth");
    }
  }, [authSession, isLoading]);

  if (isLoading) return <Loader />;

  return (
    authSession && (
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
            p: 3,
            minHeight: 0,
            bgcolor: "slate.extraLight",
            width: "100%",
            overflow: "hidden",
            minWidth: 0,
          }}
        >
          <DrawerHeader className="w-full" />
          <Outlet />
        </Container>
      </Box>
    )
  );
}
