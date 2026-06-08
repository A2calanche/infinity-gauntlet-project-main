import cors from "cors";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./db/index.js";
import { TodosRouter } from "./routers/to-dos.routers.js";
import { AuthRouter } from "./routers/auth-routers.js";

dotenv.config();

const api = express();
const apiPort = process.env.PORT

api.use(cors({
  origin: [
    "http://localhost:3000",
    "https://legendary-fiesta-g4qjpw6ggw5j3vj95-3000.app.github.dev"
  ],
  credentials: true,
}));
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false,
};

api.use(cors(corsOptions));
api.options("/{*PATH}", cors(corsOptions));
api.use(express.json());
api.use(express.urlencoded({ extended: false }));
api.use(morgan("dev"));
api.use("/v1", TodosRouter);
api.use("/v1/auth", AuthRouter);

connectDB().then(() => {
  api.listen(apiPort, () => {
    console.log(`API RUNNING ON PORT ${apiPort} 🚀`);
  });
});