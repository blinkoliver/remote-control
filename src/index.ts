import { WebSocketServer, createWebSocketStream } from "ws";
import { httpServer } from "./httpServer";
import { readableStream } from "./utils";

const HTTP_PORT: number = 3000;
const PORT: number = 8080;

const wss = new WebSocketServer({
  port: PORT,
});

const connection = async (ws: any) => {
  const duplex = createWebSocketStream(ws, {
    encoding: "utf8",
    decodeStrings: false,
  });
  ws.isAlive = true;
  ws.on("pong", () => {
    ws.isAlive = true;
  });
  duplex.on("readable", readableStream(duplex));
};

const interval = setInterval(() => {
  wss.clients.forEach((ws: any) => {
    if (ws.isAlive === false) return ws.terminate();
    ws.isAlive = false;
    ws.ping();
  });
}, 60000);
const close = () => {
  clearInterval(interval);
};

wss.on("connection", connection);
wss.on("close", close);

console.log(`Start static http server on the ${HTTP_PORT} port!`);
console.log(`Start ws server on the ${PORT} port!`);
httpServer.listen(HTTP_PORT);
