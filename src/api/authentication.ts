import express from 'express';
import MessageResponse from '../interfaces/MessageResponse';
import User from '../models/user';

const router = express.Router();

router.post<object, MessageResponse>('/register', async (req, res) => {
  console.log("register initiated")

  try {
    const { username, email, password } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "Email already exists" });
    }

    const admin = new User({ username, email, password });
    await admin.save();

    res.status(201).send({ message: "Account has been created" });
  } catch (err: any) {
    res.status(500).send({ message: err.message });
  }
});

// make login route

// make logout route
export default router;

