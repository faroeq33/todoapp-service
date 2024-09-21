import { Router } from "express";
import { authRouter } from "./authentication";
import { todosRouter } from "./todos";
/*
 * This is the main router that will be used in the app
 */

const mainRouter = Router();

mainRouter.use(`/api/v1/auth`, authRouter);
mainRouter.use(`/api/v1`, todosRouter);

export { mainRouter };
