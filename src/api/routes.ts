import express from 'express';
import authRoutes from './authentication';
import todoRoutes from './todos';
/*
 * This is the main router that will be used in the app
 */

const router = express.Router();

router.use(`/api/v1/auth`, authRoutes);
router.use(`/api/v1`, todoRoutes);


export default router;
