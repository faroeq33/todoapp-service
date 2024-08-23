import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import auth from './authentication';

const router = express.Router();

router.get<object, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/auth', auth);

export default router;
