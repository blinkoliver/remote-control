import { WebSocketServer } from "ws";
import { httpServer } from "./httpServer";

const HTTP_PORT: number = 3000;
const PORT: number = 8080;

const wss = new WebSocketServer({
  port: PORT,
});

wss.on("connection", (ws) => {
  ws.on("message", (data) => {
    console.log("received: %s", data);
  });

  ws.send("something");
});

console.log(`Start static http server on the ${HTTP_PORT} port!`);
console.log(`Start ws server on the ${PORT} port!`);
httpServer.listen(HTTP_PORT);
