import Button from "@mui/material/Button";
import { AddRounded, FileUploadOutlined } from "@mui/icons-material";
import NoDocumentIllustration from "../illustrations/NoDocumentIllustration";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

function EmptyApplications() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        alignItems: "center",
        pb: 4,
      }}
    >
      <NoDocumentIllustration />
      <Typography variant="body1" fontWeight={600} gutterBottom>
        No applications yet
      </Typography>

      <Typography color="textSecondary" gutterBottom>
        Add an application record to get started
      </Typography>
      <Stack direction="row" spacing={2} mt={2}>
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
      </Stack>
    </Box>
  );
}

export default EmptyApplications;
