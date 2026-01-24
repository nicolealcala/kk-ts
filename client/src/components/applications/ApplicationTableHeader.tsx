import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Typography from "@mui/material/Typography";

type ApplicationTableHeaderProps = {
  totalCount?: number;
};
export default function ApplicationTableHeader({
  totalCount,
}: ApplicationTableHeaderProps) {
  return (
    <Stack direction="row" justifyContent="space-between" mb={3}>
      <Typography
        variant="h5"
        component="h1"
        alignSelf="end"
        fontWeight="semiBold"
      >
        {totalCount} applications
      </Typography>
      <Button variant="contained" startIcon={<AddRoundedIcon />}>
        Add new
      </Button>
    </Stack>
  );
}
