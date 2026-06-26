import cors from "cors";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./db/index.js";
import { TodosRouter } from "./routers/to-dos.routers.js";
import { AuthRouter } from "./routers/auth-routers.js";
import { CalendarRouter } from "./routers/calendar-routers.js";

dotenv.config();

const api = express();
const apiPort = process.env.PORT

api.use(cors({
  origin: [
    "http://localhost:3000","http://127.0.0.1:3000",
    "https://legendary-fiesta-g4qjpw6ggw5j3vj95-3000.app.github.dev"
   ],
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));


api.use(express.json());
api.use(express.urlencoded({ extended: false }));
api.use(morgan("dev"));

api.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

api.use("/v1", TodosRouter);
api.use("/v1/auth", AuthRouter);
api.use("/v1/calendar", CalendarRouter);

connectDB().then(() => {
  api.listen(apiPort, () => {
    console.log(`API RUNNING ON PORT ${apiPort} 🚀`);
  });
});