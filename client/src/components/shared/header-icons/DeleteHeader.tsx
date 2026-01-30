import Box from "@mui/material/Box";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

export default function DeleteHeader() {
  return (
    <Box
      p={1}
      sx={{
        bgcolor: "error.extraLight",
        maxWidth: "max-content",
        borderRadius: 2,
        aspectRatio: 1 / 1,
      }}
    >
      <DeleteOutlineRoundedIcon color="error" />
    </Box>
  );
}
