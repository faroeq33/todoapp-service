import { Request } from 'express-serve-static-core';
import express from 'express';
import MessageResponse from '../interfaces/MessageResponse';
import { TUser } from '../models/UserModel';
import { AuthController } from '../controllers/AuthController';

const router = express.Router();

router.post('/register', async (req: Request<{}, MessageResponse, TUser>, res) => {
  const response = await AuthController.register(req.body);

  res
    .status(response.statusCode)
    .send({
      message: response.message,
    });
}
);

// make login route
router.post('/login', async (req, res) => {
  const response = await AuthController.login(req.body);

  res
    .status(response.statusCode)
    .send({
      message: response.message,
    });
});


// make logout route
export default router;

