import Box from "@mui/material/Box";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
export default function WarningIcon() {
  return (
    <Box
      p={1}
      sx={{
        bgcolor: "warning.extraLight",
        width: 40,
        height: 40,
        borderRadius: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pb: 1.5,
      }}
    >
      <WarningAmberRoundedIcon color="warning" />
    </Box>
  );
}
