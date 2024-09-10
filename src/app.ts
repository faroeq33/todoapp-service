import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
// import "dotenv/config"

import * as middlewares from './middlewares/middlewares';
import apiRoutes from './api/routes';
import Database from './database/database';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

// in order to test the app with a testing suite, we only need to use the real database when the environment is DEV or PRODUCTION, in package.json we have a script called test that sets the NODE_ENV to TEST
if (process.env.NODE_ENV === 'DEV' || process.env.NODE_ENV === 'PRODUCTION') {
	Database.getInstance()
}

app.use('/', apiRoutes);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

// In order to write automated tests, we need to export the app instance.
export default app;
