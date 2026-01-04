import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import AreaChartComponent, {
  type GradientStops,
} from "../shared/AreaChartComponent";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

type Sentiment = "positive" | "negative" | "neutral";

export type ChartKpiProps = {
  title: string;
  value: string;
  areaGradients: GradientStops[];
  color: string;
  sentiment: Sentiment;
};
export default function ChartKpi({ chart }: { chart: ChartKpiProps }) {
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
      <Typography variant="body2" sx={{ mb: 1 }}>
        {chart.title}
      </Typography>
      <Divider />
      <Box display="flex" alignItems="end" gap={2} height={100}>
        <Box
          sx={{
            width: "45%",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            {chart.value}
          </Typography>
          <KpiChip sentiment={chart.sentiment} />
        </Box>
        <AreaChartComponent
          areaGradients={chart.areaGradients}
          color={chart.color}
        />
      </Box>
    </Paper>
  );
}

function KpiChip({ sentiment = "positive" }: { sentiment: Sentiment }) {
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
        mt: 1,
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
