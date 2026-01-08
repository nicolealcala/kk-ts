/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import Divider from "@mui/material/Divider";
import BarChartComponent from "@/components/shared/BarChartComponent";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import type { VolumeTrendData } from "@/lib/types/dashboard";

const monthlyApplications = [
  { label: "Jan", value: 12, color: "#4F46E5" },
  { label: "Feb", value: 20, color: "#0EA5E9" },
  { label: "Mar", value: 15, color: "#10B981" },
  { label: "Apr", value: 30, color: "#F59E0B" },
  { label: "May", value: 25, color: "#EF4444" },
  { label: "Jun", value: 18, color: "#8B5CF6" },
  { label: "Jul", value: 22, color: "#3B82F6" },
  { label: "Aug", value: 28, color: "#14B8A6" },
  { label: "Sep", value: 35, color: "#F43F5E" },
  { label: "Oct", value: 40, color: "#A855F7" },
  { label: "Nov", value: 38, color: "#22C55E" },
  { label: "Dec", value: 45, color: "#EAB308" },
];

function ApplicationsVolumeChart({ data }: { data: VolumeTrendData[] }) {
  const [chartCategory, setChartCategory] = React.useState("monthly");
  return (
    <Paper
      elevation={0}
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 2,
        borderRadius: 2,
        height: "100%",
      }}
    >
      {/* TO DO: Replace with select component */}
      <Typography variant="h6" className="capitalize" sx={{ fontWeight: 600 }}>
        {chartCategory} Applications
      </Typography>
      <Divider />
      <BarChartComponent data={data || monthlyApplications} />
    </Paper>
  );
}

export default ApplicationsVolumeChart;
