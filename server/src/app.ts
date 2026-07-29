import "dotenv/config";
import express, { type Application } from "express";
import { db } from "./db/index.js";
import dashboardRoutes from "./routes/dashboard-routes.js";

const app: Application = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use("/", dashboardRoutes);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
