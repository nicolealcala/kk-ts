import Button from "@mui/material/Button";
// import Divider from "@mui/material/Divider";
import GoogleIconColored from "../icons/Google";
// import Typography from "@mui/material/Typography";
import { useAuth } from "@/lib/contexts/AuthContext";
import React from "react";

function OAuth() {
  const { authMode } = useAuth();
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

export default React.memo(OAuth);
