import cors from "cors";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/index.js";
import { TodosRouter } from "./routers/to-dos.routers.js";
import { AuthRouter } from "./routers/auth-routers.js";
import { CalendarRouter } from "./routers/calendar-routers.js";

dotenv.config();

const api = express();
const apiPort = process.env.PORT
const corsOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(",").map((o) => o.trim())
  : [];

api.use(cors({
  origin: corsOrigins,
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));


api.use(express.json());
api.use(express.urlencoded({ extended: false }));
api.use(cookieParser());
api.use(morgan("dev"));

api.use("/v1/auth", AuthRouter);
api.use("/v1/calendar", CalendarRouter);
api.use("/v1", TodosRouter);

connectDB().then(() => {
  api.listen(apiPort, () => {
    console.log(`API RUNNING ON PORT ${apiPort} 🚀`);
  });
});