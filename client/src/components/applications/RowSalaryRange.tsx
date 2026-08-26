import { formatCurrency } from "@/utils/currency";
import Typography from "@mui/material/Typography";

type RowSalaryRangeProps = {
  compensationMin?: number | null;
  compensationMax?: number | null;
  currency?: string;
};

export default function RowSalaryRange({
  compensationMin,
  compensationMax,
  currency,
}: RowSalaryRangeProps) {
  if (!compensationMin && !compensationMax)
    return (
      <Typography variant="body1" color="text.secondary" fontStyle="italic">
        Not Disclosed
      </Typography>
    );

  const min = compensationMin
    ? formatCurrency(compensationMin, currency)
    : false;

  const max = compensationMax
    ? formatCurrency(compensationMax, currency)
    : false;

  return (
    <Typography variant="body1">
      {min} {min && "-"} {max}
    </Typography>
  );
}
