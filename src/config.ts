import * as dotenv from 'dotenv'

dotenv.config()

export const SCHEME = process.env.HTTP || 'http';// todo: add https
export const HOST = process.env.HOST || 'localhost';
export const PORT = process.env.PORT || 5000;
export const MONGO_PORT = process.env.MONGO_PORT;
export const MONGO_USERNAME = process.env.MONGO_USERNAME || 'mongoadmin';
export const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
export const DB_URL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${HOST}:${MONGO_PORT} `;
export const SERVER_URL = `${SCHEME}://${HOST}:${PORT}`
