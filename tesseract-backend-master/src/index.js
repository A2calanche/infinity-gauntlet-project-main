import cors from "cors";
import express from "express";
import { initDB } from "./db/index.js";
import { TodosRouter } from "./routers/to-dos.routers.js";
import morgan from "morgan";
const api = express();

const apiPort = process.env["APP_ENV"] || 3001;

api.use(cors());
api.use(express.json());
api.use(express.urlencoded({ extended: false }));
api.use(morgan("dev"));
api.use("/v1", TodosRouter);

api.listen(apiPort, () => {
  console.log(`API RUNNNIG ON PORT ${apiPort}`);
  initDB().then(() => console.log("DB INITIALIZED :)"));
});
