import { WebSocketServer } from "ws";
import { httpServer } from "./httpServer";
import { parseData } from "./utils";
import Jimp from "jimp";
import robot from "robotjs";

const HTTP_PORT: number = 3000;
const PORT: number = 8080;

const wss = new WebSocketServer({
  port: PORT,
});

const actions: any = {
  mouse_up: (y: number): void => {
    const mousePos = robot.getMousePos();
    robot.moveMouseSmooth(mousePos.x, mousePos.y - y);
  },
  mouse_down: (y: number): void => {
    const mousePos = robot.getMousePos();
    robot.moveMouseSmooth(mousePos.x, mousePos.y + y);
  },
  mouse_left: (x: number): void => {
    const mousePos = robot.getMousePos();
    robot.moveMouseSmooth(mousePos.x - x, mousePos.y);
  },
  mouse_right: (x: number): void => {
    const mousePos = robot.getMousePos();
    robot.moveMouseSmooth(mousePos.x + x, mousePos.y);
  },
  mouse_position: () => {
    const mousePos = robot.getMousePos();
    console.log(mousePos);
  },
  // draw_circle: console.log("action"),
  // draw_rectangle: console.log("action"),
  // draw_square: console.log("action"),
};

wss.on("connection", (ws) => {
  ws.on("message", (data: Buffer) => {
    const parseString: string = data.toString();
    const parsedData = parseData(parseString);
    actions[parsedData.command](parsedData.firstCoord);
    if (parsedData.command === "mouse_position") {
      ws.send(
        `mouse_position {${robot.getMousePos().x} px},{${
          robot.getMousePos().y
        } px}`
      );
    }
  });
});

console.log(`Start static http server on the ${HTTP_PORT} port!`);
console.log(`Start ws server on the ${PORT} port!`);
httpServer.listen(HTTP_PORT);
