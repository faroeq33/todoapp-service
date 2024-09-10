import app from './app';
import { urlObject } from './config/config';

const { port, scheme, host } = urlObject;

const url = `${scheme}://${host}:${port}`;

app.listen(port, () => {
  console.log(`Listening: ${url}`);
});
