import ApplicationsVolumeChart from "@/components/dashboard/ApplicationsVolumeChart";
import ApplicationStatusChart from "@/components/dashboard/ApplicationStatusChart";
import { Box } from "@mui/material";
import ChartKpi from "@/components/dashboard/ChartKpi";

export default function DashboardPage() {
  const charts = ["Chart 1", "Chart 2", "Chart 3"];
  return (
    // <article className="relative flex gap-3 h-full min-h-0 bg-purple-100">
    //   <section className="flex gap-2 w-[70%] h-full min-h-0">
    //     <div className="grid grid-cols-12 w-full gap-3">
    //       <div className="col-span-4">
    //         <ChartKpi chart={charts[0]} />
    //       </div>
    //       <div className="col-span-4">
    //         <ChartKpi chart={charts[1]} />
    //       </div>
    //       <div className="col-span-4">
    //         <ChartKpi chart={charts[2]} />
    //       </div>
    //       <div className="col-span-12 h-full min-h-0">
    //         <ApplicationsVolumeChart />
    //       </div>
    //     </div>
    //   </section>
    //   <section className="flex gap-2 w-[30%] h-full min-h-0">
    //     <div className="grid grid-cols-12 w-full gap-3">
    //       <div className="col-span-12">
    //         <ApplicationStatusChart />
    //       </div>
    //     </div>
    //   </section>
    // </article>

    <Box
      component="article"
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 2,
        height: "100%",
        minHeight: 0,
        width: "100%",
      }}
    >
      {/* LEFT COLUMN (70%) */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "70%",
          height: "100%",
          minHeight: 0,
          gap: 2,
        }}
      >
        {/* Top Row: KPI Cards */}
        <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
          {charts.map((chart, i) => (
            <Box key={i} sx={{ flex: 1, minWidth: 0 }}>
              <ChartKpi chart={chart} />
            </Box>
          ))}
        </Box>

        {/* Bottom Row: The Volume Chart (The "Problem Child") */}
        <Box
          sx={{
            flex: 1, // Take all remaining vertical space
            minHeight: 0, // Crucial: break the expansion loop
            position: "relative", // Needed for the absolute-lock fix
            width: "100%",
          }}
        >
          <Box sx={{ position: "absolute", inset: 0 }}>
            <ApplicationsVolumeChart />
          </Box>
        </Box>
      </Box>

      {/* RIGHT COLUMN (30%) */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "30%",
          height: "100%",
          minHeight: 0,
        }}
      >
        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            position: "relative",
          }}
        >
          <Box sx={{ position: "absolute", inset: 0 }}>
            <ApplicationStatusChart />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
