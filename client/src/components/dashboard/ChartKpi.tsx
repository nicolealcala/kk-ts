import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import AreaChartComponent from "../shared/AreaChartComponent";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import type {
  ChartData,
  KPIChartType,
  KPISentiment,
} from "@/lib/types/dashboard";

type ChartKpiProps = {
  title: KPIChartType;
  value: string;
  sentiment: KPISentiment;
  data: ChartData[];
};

const CHART_COLORS = {
  funnelYield: {
    color: "#813fff",
    areaGradients: [
      { offset: 0, stopColor: "#c4b4ff" },
      { offset: 100, stopColor: "#ddd6ff" },
    ],
  },
  topSource: {
    color: "#05df72",
    areaGradients: [
      { offset: 0, stopColor: "#b9f8cf" },
      { offset: 100, stopColor: "#dcfce7" },
    ],
  },
  avgWaitTime: {
    color: "#ffa137",
    areaGradients: [
      { offset: 0, stopColor: "#ffdda5" },
      { offset: 100, stopColor: "#fff0d3" },
    ],
  },
};

export default function ChartKpi({
  title,
  value,
  sentiment,
  data,
}: ChartKpiProps) {
  const config = CHART_COLORS[title];

  const formatTitle = title
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());

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
        {formatTitle}
      </Typography>
      <Divider />
      <Box display="flex" alignItems="end" gap={2} height={100}>
        <Box
          sx={{
            width: "45%",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            {value}
          </Typography>
          <KpiChip sentiment={sentiment} />
        </Box>
        <AreaChartComponent
          data={data}
          areaGradients={config.areaGradients}
          color={config.color}
        />
      </Box>
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
