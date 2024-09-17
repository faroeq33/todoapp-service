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
/*
router.post('/login', async (req, res) => {
  console.log("login initiated")

  try {
    const userInput = req.body as TUser;

    const dbUser = await User.findOne({ email: userInput.email });
    if (!dbUser) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    // check if password is correct
    const isPasswordValid = await bcrypt.compare(userInput.password, dbUser.password);

    if (!isPasswordValid) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    // create a token
    const token = await jwt.sign({ _id: dbUser._id }, process.env.JWT_SECRET as string, {
      expiresIn: "12h",
    });
    res.send({ token, expiresIn: 43200 });
  } catch (err: any) {
    res.status(500).send({ message: err.message });
  }
});
*/

// make logout route
export default router;

