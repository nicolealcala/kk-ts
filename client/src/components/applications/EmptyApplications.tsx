import Button from "@mui/material/Button";
import { AddRounded, FileUploadOutlined } from "@mui/icons-material";
import NoDocumentIllustration from "../illustrations/NoDocumentIllustration";
import { Box } from "@mui/material";

function EmptyApplications() {
  return (
    <Box className="flex flex-col justify-center items-center-safe rounded-xl bg-white h-full w-full border-3 border-dashed">
      <NoDocumentIllustration />
      <p>
        <strong>No applications yet</strong>
      </p>
      <p className="opacity-70">Insert an application record to get started</p>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          size="large"
          sx={{
            marginTop: 4,
            borderRadius: 3,
          }}
          startIcon={<AddRounded />}
        >
          New record
        </Button>

        <Button
          variant="outlined"
          size="large"
          sx={{
            marginTop: 4,
            borderRadius: 3,
          }}
          startIcon={<FileUploadOutlined />}
        >
          Upload CSV
        </Button>
      </Box>
    </Box>
  );
}

export default EmptyApplications;
