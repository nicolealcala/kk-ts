import Button from "@mui/material/Button";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import NoDocumentIllustration from "../svg/NoDocumentIllustration";
import { Box } from "@mui/material";

function EmptyApplications() {
  return (
    <Box className="flex flex-col justify-center items-center-safe rounded-xl bg-white h-full w-full border-3 border-dashed">
      <NoDocumentIllustration />
      <p>
        <strong>No applications yet</strong>
      </p>
      <p className="opacity-70">Insert an application record to get started</p>
      <Button
        variant="contained"
        size="large"
        sx={{
          marginTop: 4,
          borderRadius: 3,
        }}
        startIcon={<AddRoundedIcon />}
      >
        Add application
      </Button>
    </Box>
  );
}

export default EmptyApplications;
