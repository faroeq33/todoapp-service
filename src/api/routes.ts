import express from 'express';
import authRoutes from './authentication';
import todoRoutes from './todos';
import welcome from './welcome';

/*
 * This is the main router that will be used in the app
 */

const prefix = '/api/v1';
const router = express.Router();

router.use(prefix + `/welcome`, welcome);
router.use(prefix + '/auth', authRoutes);
router.use(prefix, todoRoutes);

export default router;
