import Button from "@mui/material/Button";
import GoogleIconColored from "../icons/Google";
import { useAppSelector } from "@/store/hooks";

export default function OAuth() {
  const formType = useAppSelector((state) => state.auth.formType);

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
      {formType === "login" ? "Login" : "Sign up"} with Google
    </Button>
  );
}
