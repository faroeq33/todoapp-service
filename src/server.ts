import app from './app';
import { PORT, SERVER_URL } from './config';

app.listen(PORT, () => {
  console.log(`current environment: ${process.env.NODE_ENV}`);
  console.log(`Listening: ${SERVER_URL}`);
});
