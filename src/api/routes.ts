import express from 'express';
import authentication from './authentication';

const routes = express.Router()

routes.use('/auth', authentication);

export default routes