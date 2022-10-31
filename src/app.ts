import dotenv from "dotenv";
dotenv.config();
import logger from "./logger";
import express, { Application, Request, Response, NextFunction } from "express";
import cookieSession from "cookie-session";
import { router } from "./routes";
import { initDatabase } from "./data-access";

const main = async () => {
  const app: Application = express();
  const port = process.env.PORT;

  await initDatabase();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(
    cookieSession({
      name: "sports_complex_session",
      secret: `${process.env.SESSION_SECRET}`,
      maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
    })
  );

  app.use((req: Request, res: Response, next: NextFunction) => {
    logger(`${req.method} ${req.originalUrl} : ${JSON.stringify(req.body)}`);
    next();
  });
  app.use("/api", router);

  app.listen(port, () => {
    logger(`Listening on port ${port}`);
  });
};

main();
