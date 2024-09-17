import { Request } from 'express-serve-static-core';
import express from 'express';
import MessageResponse from '../interfaces/MessageResponse';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { TUser } from '../models/UserModel';
import { hasEmptyFields } from '../helpers/hasEmptyFields';
import { ErrorHelper } from '../helpers/ErrorHelper';

const router = express.Router();

router.post('/register', async (req: Request<{}, MessageResponse, TUser>, res) => {
  console.log("register initiated")

  // validate user input, for email, password, and username
  if (hasEmptyFields(req.body)) {
    return res.status(400).send({ message: "Missing email, password or username fields. Check if you have any typos" });
  }

  try {
    const userInput: TUser = req.body;

    const admin = new User(userInput);
    await admin.save();

    res.status(201).send({ message: "Account has been created" });
  } catch (error) {
    if (ErrorHelper.isDuplicate(error)) {
      return res
        .status(400)
        .json({
          message: 'A user with this this unique key already exists!',
        });
    }

    // logs the error to the console, so it won't expose the error to the user
    console.log(error);

    res
      .status(500)
      .json({ message: 'Internal server error' });
  }
});

// make login route
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

// make logout route
export default router;

