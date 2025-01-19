import { app } from "./app";
import "dotenv/config";
import { HOST, PORT } from "./env";
import { createServer } from "http";

const server = createServer(app);

server.listen(PORT, () => {
  console.log(`[server]: Listening at http://${HOST}:${PORT}`);
});
