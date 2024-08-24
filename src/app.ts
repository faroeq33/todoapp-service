import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import "dotenv/config"
import cors from 'cors';

import * as middlewares from './middlewares';
import api from './api';
import MessageResponse from './interfaces/MessageResponse';
import mongoose from 'mongoose';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

// Write mongoose connection
let uri = "";
if (process.env.NODE_ENV === "production") {
  if (!process.env.MONGODB_CONNECTIONSTRING) {
    throw new Error("MONGODB_CONNECTIONSTRING is not defined");
  }
  uri = process.env.MONGODB_CONNECTIONSTRING;
  ;
} else {
  uri = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;
}
console.log("connectionstring", uri)

mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB...", err));


app.get<object, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'Welcome to the todoapp service',
  });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
