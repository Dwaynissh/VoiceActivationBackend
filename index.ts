import express, { Application, application } from "express";
import cors from "cors";
import env from "dotenv";
import expressSession from "express-session";
import { dbConfig } from "./utils/dbConfig";
import { mainApp } from "./mainApp";
env.config();

const app: Application = express();
const port: number = parseInt(process.env.PORT!);

app.use(express.json());
app.use(cors());

mainApp(app);

const server = app.listen(port, () => {
  console.clear();
  console.log("Server running and active....🔥🔥");
  console.log();
  dbConfig();
});

process.on("uncaughtException", (error: Error) => {
  console.log("error: ", error);

  process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
  console.log("error: ", reason);

  server.close(() => {
    process.exit(1);
  });
});
