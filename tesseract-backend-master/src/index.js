import cors from "cors";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./db/index.js";
import { TodosRouter } from "./routers/to-dos.routers.js";
import { AuthRouter } from "./routers/auth-routers.js";

dotenv.config();

const api = express();
const apiPort = process.env.PORT || 3001;

api.use(cors());
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