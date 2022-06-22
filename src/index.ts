import { WebSocketServer } from "ws";
import { httpServer } from "./httpServer";
import { parseData } from "./utils";
import { actions } from "./actions";
import Jimp from "jimp";

const HTTP_PORT: number = 3000;
const PORT: number = 8080;

const wss = new WebSocketServer({
  port: PORT,
});

wss.on("connection", (ws) => {
  ws.on("message", (data: Buffer) => {
    const parseString: string = data.toString();
    const parsedData = parseData(parseString);
    if (!parsedData.firstCoord && !parsedData.secondCoord) {
      actions[parsedData.command](ws);
    } else if (parsedData.firstCoord && !parsedData.secondCoord) {
      actions[parsedData.command](parsedData.firstCoord, ws);
    } else {
      actions[parsedData.command](
        parsedData.firstCoord,
        parsedData.secondCoord,
        ws
      );
    }
  });
});

console.log(`Start static http server on the ${HTTP_PORT} port!`);
console.log(`Start ws server on the ${PORT} port!`);
httpServer.listen(HTTP_PORT);
