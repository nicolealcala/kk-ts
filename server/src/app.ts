import "dotenv/config";
import express, { type Application } from "express";
import authRoutes from "./routes/authRouter.js";
import cookieParser from "cookie-parser";
import { AppError } from "./lib/customErrors.js";
import verifyToken from "./middleware/authMiddleware.js";
import cors from "cors";

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

const isProduction = process.env.NODE_ENV === "production";
const allowedOrigin = process.env.CLIENT_URL;

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (origin !== allowedOrigin)
        return callback(new Error("CORS Policy violation"), false);

      return callback(null, true);
    },
    credentials: true,
  }),
);

app.use("/api/auth", authRoutes(isProduction));

app.use("/api/dashboard", verifyToken(), (req, res) => {
  res.send("Hello World!");
});

app.use((req, _, next) => {
  const error = new AppError(`Resource not found: ${req.originalUrl}`, 404);
  next(error);
});

app.use(
  (
    err: any,
    _: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error("Error caught in middleware", err.message);

    const statusCode = err?.statusCode || 500;
    const responseMessage =
      statusCode === 500 ? "Internal Server Error" : err.message;

    res.status(statusCode).json({ error: responseMessage });
  },
);

app.listen(PORT, () => {
  console.log(`⚡️[Server]: Server is running at http://localhost:${PORT}`);
});
