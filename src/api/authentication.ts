import express from 'express';
import MessageResponse from '../interfaces/MessageResponse';

const router = express.Router();

router.post<object, MessageResponse>('/login', (req, res) => {
  console.log(req.body)
  res.json({ message: "Welcome to the todoapp service" });
});

export default router;
