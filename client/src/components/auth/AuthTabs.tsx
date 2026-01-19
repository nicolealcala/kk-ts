import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/useRedux";
import { setAuthError, setAuthMode } from "@/store/auth/authSlice";

export default function AuthTabs() {
  const dispatch = useAppDispatch();
  const { authMode } = useAppSelector((state) => state.auth);

  return (
    <Tabs
      value={authMode}
      onChange={(_, v) => {
        dispatch(setAuthError(null));
        dispatch(setAuthMode(v));
      }}
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
