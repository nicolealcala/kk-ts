import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

type FormHeaderProps = {
  isSubmitting: boolean;
  isMultiple: boolean;
  title: string;
  onBack: () => void;
};

export default function FormHeader({
  isSubmitting,
  isMultiple,
  onBack,
  title,
}: FormHeaderProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        bgcolor: "white",
        py: 1.25,
        px: 3,
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Button
        type="button"
        startIcon={<ArrowBackRoundedIcon />}
        onClick={onBack}
      >
        Back to {title}
      </Button>

      <Button
        type="submit"
        variant="contained"
        disabled={isSubmitting}
        startIcon={
          isSubmitting ? <CircularProgress color="inherit" size={20} /> : null
        }
        sx={{ px: 4 }}
      >
        {isSubmitting ? "Saving" : isMultiple ? "Save all" : "Save"}
      </Button>
    </Box>
  );
}
