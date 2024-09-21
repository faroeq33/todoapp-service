import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import * as middlewares from "./middlewares/middlewares";
import { Database } from "./database/database";
import { config as env } from "./config";
import { mainRouter } from "./api/routes";

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

// in order to test the app with a testing suite, we only need to use the real database when the environment is DEV or PRODUCTION, in package.json we have a script called test that sets the NODE_ENV to TEST
if (env.NODE_ENV === "DEV" || env.NODE_ENV === "PRODUCTION") {
  Database.getInstance();
}

app.use("/", mainRouter);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

// In order to write automated tests, we need to export the app instance.
export { app };
