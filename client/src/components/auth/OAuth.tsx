import Button from "@mui/material/Button";
import GoogleIconColored from "../icons/Google";
import { useAppSelector } from "@/utils/hooks/useRedux";

export default function OAuth() {
  const { authMode } = useAppSelector((state) => state.auth);
  return (
    <Button
      fullWidth
      variant="contained"
      startIcon={<GoogleIconColored />}
      size="large"
      onClick={() => {
        console.log("Google login clicked!"); // TO DO
      }}
      color="inherit"
      sx={{
        bgcolor: "slate.extraLight",
        borderRadius: 50,
        "&:hover": {
          bgcolor: "slate.light",
        },
      }}
    >
      {authMode === "login" ? "Login" : "Sign up"} with Google
    </Button>
  );
}
