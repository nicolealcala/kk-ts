import Typography, { type TypographyProps } from "@mui/material/Typography";

export default function Span({ children, fontWeight, color }: TypographyProps) {
  return (
    <Typography
      variant="body1"
      component="span"
      color={color || "initial"}
      fontWeight={fontWeight || "medium"}
    >
      {children}
    </Typography>
  );
}
