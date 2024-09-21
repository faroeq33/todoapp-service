import { Router } from "express";
import { Request } from "express-serve-static-core";
import { TUser } from "../models/UserModel";
import { AuthController } from "../controllers/AuthController";
import { MessageResponse } from "../interfaces/MessageResponse";

const authRouter = Router();

authRouter.post(
  "/register",
  async (req: Request<{}, MessageResponse, TUser>, res) => {
    const response = await AuthController.register(req.body);

    res.status(response.statusCode).send({
      message: response.message,
    });
  }
);

// make login route
authRouter.post("/login", async (req, res) => {
  const response = await AuthController.login(req.body);

  return res.status(response.statusCode).send({
    ...response,
  });
});

// make logout route
export { authRouter };
