import express from 'express';
import authRoutes from './authentication';
import todoRoutes from './todos';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/', todoRoutes);

export default router;
