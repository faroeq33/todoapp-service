import app from "./app";
import { config } from "./config";

app.listen(config.SERVER_PORT, () => {
  console.log(`current environment: ${config.NODE_ENV}`);
  console.log(`Listening: ${config.SERVER_URL}`);
});
