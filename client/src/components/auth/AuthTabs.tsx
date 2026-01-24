import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setAuthError, setAuthMode } from "@/store/auth/authSlice";

export default function AuthTabs() {
  const dispatch = useAppDispatch();
  const formType = useAppSelector((state) => state.auth.formType);

  return (
    <Tabs
      value={formType}
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
        sx={{ fontWeight: "semiBold", textTransform: "none" }}
      />
      <Tab
        label="Sign up"
        value="signup"
        sx={{ fontWeight: "semiBold", textTransform: "none" }}
      />
    </Tabs>
  );
}
