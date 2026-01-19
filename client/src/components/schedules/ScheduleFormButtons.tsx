import Button from "@mui/material/Button";

type ScheduleFormButtonProps = {
  children: React.ReactNode;
  type: "button" | "submit";
  isLoading: boolean;
  variant?: "contained" | "outlined";
  onClick?: () => void;
};

export default function ScheduleFormButtons({
  children,
  type,
  isLoading,
  variant = "contained",
  onClick,
}: ScheduleFormButtonProps) {
  return (
    <Button
      type={type}
      fullWidth
      variant={variant}
      color="primary"
      size="large"
      loading={isLoading}
      loadingPosition="start"
      sx={{ borderRadius: 2 }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
