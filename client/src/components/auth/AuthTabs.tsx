import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useAuth } from "@/lib/contexts/AuthContext";

export default function AuthTabs() {
  const { authMode, setAuthMode } = useAuth();
  return (
    <Tabs
      value={authMode}
      onChange={(_, v) => setAuthMode(v)}
      variant="fullWidth"
      aria-label="auth tabs"
      sx={{
        "& .MuiTab-root": {
          transition: "background 0.2s ease-in-out",
        },
        "& .MuiTab-root:hover": {
          bgcolor: "slate.extraLight",
        },
      }}
    >
      <Tab
        label="Login"
        value="login"
        sx={{ fontWeight: 600, textTransform: "none" }}
      />
      <Tab
        label="Sign up"
        value="signup"
        sx={{ fontWeight: 600, textTransform: "none" }}
      />
    </Tabs>
  );
}
