import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Typography from "@mui/material/Typography";
import type { OpenDrawerValues } from "@/lib/types/forms";

type ApplicationTableHeaderProps = {
  totalCount?: number;
  setOpenDrawer: React.Dispatch<React.SetStateAction<OpenDrawerValues>>;
};
export default function ApplicationTableHeader({
  totalCount,
  setOpenDrawer,
}: ApplicationTableHeaderProps) {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Typography
        variant="h5"
        component="h1"
        alignSelf="end"
        fontWeight="semiBold"
      >
        {totalCount} applications
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddRoundedIcon />}
        onClick={() => setOpenDrawer("create")}
      >
        Add new
      </Button>
    </Stack>
  );
}
