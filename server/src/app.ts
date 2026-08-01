import "dotenv/config";
import express, { type Application } from "express";

const app: Application = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use("/", (req, res) => res.send("Hello World"));

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
