import type { SalaryRange } from "@/lib/types/applications";
import { formatCurrency } from "@/utils/currency";
import Typography from "@mui/material/Typography";

type ApplicationSalaryRangeProps = {
  salary?: SalaryRange;
};

export default function ApplicationSalaryRange({
  salary,
}: ApplicationSalaryRangeProps) {
  if (!salary?.minAmount && !salary?.maxAmount)
    return (
      <Typography variant="body1" color="text.secondary" fontStyle="italic">
        Not Disclosed
      </Typography>
    );

  const min = salary?.minAmount
    ? formatCurrency(salary.minAmount, salary.currency)
    : false;

  const max = salary?.maxAmount
    ? formatCurrency(salary.maxAmount, salary.currency)
    : false;

  return (
    <Typography variant="body1">
      {min} {min && "-"} {max}
    </Typography>
  );
}
