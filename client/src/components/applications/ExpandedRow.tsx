import Stack from "@mui/material/Stack";
import type { ApplicationRow } from "./Columns";
import MarkdownPreview from "@uiw/react-markdown-preview";
import Chip from "@mui/material/Chip";

type ExpandedRowProps = {
  row: ApplicationRow;
};
export default function ExpandedRow({ row }: ExpandedRowProps) {
  return (
    <>
      <Stack py={1.5} px={2} gap={2}>
        <Chip
          label="ABOUT THE JOB"
          size="small"
          sx={{
            width: "fit-content",
            bgcolor: "primary.extraLight",
            color: "black",
            fontWeight: 600,
          }}
        />
        {row.original.jobDescription && (
          <MarkdownPreview
            source={row.original.jobDescription}
            style={{
              padding: 0,
              backgroundColor: "transparent",
              font: "inherit",
            }}
          />
        )}
      </Stack>
    </>
  );
}
