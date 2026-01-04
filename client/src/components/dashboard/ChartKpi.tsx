import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import AreaChartComponent, {
  type GradientStops,
} from "../shared/AreaChartComponent";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
// import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
// import IconButton from "@mui/material/IconButton";

type ChartKpiProps = {
  title: string;
  value: string;
  areaGradients: GradientStops[];
  color: string;
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
          <KpiChip />
        </Box>
        <AreaChartComponent
          areaGradients={chart.areaGradients}
          color={chart.color}
        />
      </Box>
    </Paper>
  );
}

function KpiChip() {
  return (
    <Chip
      label="50.1%"
      onDelete={() => {}}
      deleteIcon={<ArrowOutwardRoundedIcon />}
      size="small"
      sx={{
        borderRadius: 1.5,
        color: "success.dark",
        bgcolor: "success.extraLight",
        mt: 1,
        "& .MuiChip-label": {
          pr: 1,
          fontWeight: 600,
          fontSize: "12px",
        },
        "& .MuiChip-deleteIcon": {
          pointerEvents: "none",
          fontSize: "13px",
          color: "success.dark",
          mr: 0.75,
        },
      }}
    />
    // <>
    //   <IconButton size="small" sx={{ bgcolor: "success.extraLight", mr: 0.5 }}>
    //     <ArrowUpwardRoundedIcon
    //       color="success"
    //       sx={{ width: 12, height: 12, fontSize: "12px" }}
    //     />
    //   </IconButton>
    //   <Typography
    //     variant="overline"
    //     sx={{ color: "success.main", fontWeight: 500 }}
    //   >
    //     50.1%
    //   </Typography>
    // </>
  );
}
