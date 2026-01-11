import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import type { KPIChartType, KPISentiment } from "@/lib/types/dashboard";
import Stack from "@mui/material/Stack";
import QueryStatsRoundedIcon from "@mui/icons-material/QueryStats";
import AlignVerticalBottomRoundedIcon from "@mui/icons-material/AlignVerticalBottomRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

type ChartKpiProps = {
  title: KPIChartType;
  value: string;
  sentiment: KPISentiment;
};

export default function Kpi({ title, value, sentiment }: ChartKpiProps) {
  const formatTitle = title
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());

  const icon =
    title === "funnelYield" ? (
      <QueryStatsRoundedIcon color="inherit" fontSize="small" />
    ) : title === "topSource" ? (
      <AlignVerticalBottomRoundedIcon color="inherit" fontSize="small" />
    ) : (
      <AccessTimeRoundedIcon color="inherit" fontSize="small" />
    );

  const renderValue =
    title === "funnelYield"
      ? `${value}%`
      : title === "topSource"
      ? value
      : `${value} Days`;
  return (
    <Paper
      elevation={0}
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 2,
        borderRadius: 2,
        height: "100%",
      }}
    >
      <Typography
        variant="body2"
        sx={{ mb: 1 }}
        color="textSecondary"
        display="flex"
        gap={1}
        alignItems="end"
      >
        {icon} {formatTitle}
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <Stack direction="row" alignItems="end" gap={1.5}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          {renderValue}
        </Typography>
        <KpiChip sentiment={sentiment} />
      </Stack>
    </Paper>
  );
}

function KpiChip({ sentiment = "positive" }: { sentiment: KPISentiment }) {
  const chipStyles = {
    positive: {
      bgcolor: "success.extraLight",
      color: "success.dark",
    },
    negative: {
      bgcolor: "error.extraLight",
      color: "error.dark",
    },
    neutral: {
      bgcolor: "text.muted",
      color: "text.secondary",
    },
  };
  return (
    <Chip
      label="50.1%"
      onDelete={() => {}}
      deleteIcon={
        sentiment !== "neutral" ? (
          <ArrowOutwardRoundedIcon
            sx={{ transform: sentiment === "positive" ? "" : "rotate(90deg)" }}
          />
        ) : (
          <ArrowForwardRoundedIcon />
        )
      }
      size="small"
      sx={{
        borderRadius: 1.5,
        ...chipStyles[sentiment],
        mb: 0.5,
        "& .MuiChip-label": {
          pr: 1,
          fontWeight: 600,
          fontSize: "12px",
        },
        "& .MuiChip-deleteIcon": {
          pointerEvents: "none",
          fontSize: "13px",
          color: chipStyles[sentiment].color,
          mr: 0.75,
        },
      }}
    />
  );
}
