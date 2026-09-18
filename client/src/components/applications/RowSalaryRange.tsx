import { formatCurrency } from "@/utils/currency";
import Typography from "@mui/material/Typography";
import Span from "../shared/typography/Span";

type RowSalaryRangeProps = {
  compensationMin?: number | null;
  compensationMax?: number | null;
  currency?: string;
  payFrequency?: string;
};

export default function RowSalaryRange({
  compensationMin,
  compensationMax,
  currency,
  payFrequency,
}: RowSalaryRangeProps) {
  if (!compensationMin && !compensationMax)
    return (
      <Typography variant="body2" color="text.disabled">
        N/A
      </Typography>
    );

  const min = compensationMin
    ? formatCurrency(compensationMin, currency)
    : false;

  const max = compensationMax
    ? formatCurrency(compensationMax, currency)
    : false;

  const due = payFrequency ? `(${payFrequency})` : "";
  return (
    <Typography variant="body2" fontFamily="Inter">
      {min} {min && "-"} {max}{" "}
      <Span variant="caption" fontWeight={400} color="textDisabled">
        {due}
      </Span>
    </Typography>
  );
}
