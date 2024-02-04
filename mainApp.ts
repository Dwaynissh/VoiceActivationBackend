import { Application, NextFunction, Request, Response } from "express";
import route from "./router/voiceRouter";

export const mainApp = (app: Application) => {
  try {
    app.use("/api/v1/voiceapi", route);
    app.get("/", (req: Request, res: Response) => {
      try {
        return res.status(200).json({
          message: "Database Connected...🔥🔥 Welcome to Default route😈👍",
        });
      } catch (error) {
        return res.status(404).json({
          message: "Error getting default route",
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
