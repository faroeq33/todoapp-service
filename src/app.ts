import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import "dotenv/config"

import * as middlewares from './middlewares/middlewares';
import apiRoutes from './api/routes';
import { connectDB } from './database/database';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

connectDB();

app.use('/', apiRoutes);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
