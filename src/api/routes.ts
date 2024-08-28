import express from 'express';
import authRoutes from './authentication';
import todoRoutes from './todos';
import welcome from './welcome';

/*
 * This is the main router that will be used in the app
 */

const apiVersion = '/api/v1';
const router = express.Router();

router.use(apiVersion + `/welcome`, welcome);
router.use(apiVersion + '/auth', authRoutes);
router.use(apiVersion, todoRoutes);

export default router;
