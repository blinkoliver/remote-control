import robot from "robotjs";
import Jimp from "jimp";

export const actions: any = {
  mouse_up: (y: number, ws: any): void => {
    const mousePos = robot.getMousePos();
    robot.moveMouseSmooth(mousePos.x, mousePos.y - y);
    ws.send(`mouse_up_to${y}px\0`);
  },
  mouse_down: (y: number, ws: any): void => {
    const mousePos = robot.getMousePos();
    robot.moveMouseSmooth(mousePos.x, mousePos.y + y);
    ws.send(`mouse_down_to${y}px\0`);
  },
  mouse_left: (x: number, ws: any): void => {
    const mousePos = robot.getMousePos();
    robot.moveMouseSmooth(mousePos.x - x, mousePos.y);
    ws.send(`mouse_left_to${x}px\0`);
  },
  mouse_right: (x: number, ws: any): void => {
    const mousePos = robot.getMousePos();
    robot.moveMouseSmooth(mousePos.x + x, mousePos.y);
    ws.send(`mouse_right_to${x}px\0`);
  },
  mouse_position: (ws: any): void => {
    const mousePos = robot.getMousePos();
    ws.send(`mouse_position ${mousePos.x}px,${mousePos.y}px\0`);
  },
  draw_circle: (r: number, ws: any): void => {
    const mousePos = robot.getMousePos();
    robot.setMouseDelay(10);
    for (let i = 0; i <= Math.PI * 2; i += 0.01) {
      const x = mousePos.x + r * Math.cos(i);
      const y = mousePos.y + r * Math.sin(i);
      robot.mouseToggle("down");
      robot.dragMouse(x, y);
    }
    robot.mouseToggle("up");
    ws.send(`draw_circle_with${r}px_radius\0`);
  },
  draw_rectangle: (x: number, y: number, ws: any): void => {
    const mousePos = robot.getMousePos();
    const rectangle = [
      { x: mousePos.x + x, y: mousePos.y },
      { x: mousePos.x + x, y: mousePos.y + y },
      { x: mousePos.x, y: mousePos.y + y },
      { x: mousePos.x, y: mousePos.y },
    ];
    robot.setMouseDelay(500);
    robot.mouseToggle("down");
    rectangle.forEach((el) => {
      robot.mouseToggle("down");
      robot.dragMouse(el.x, el.y);
    });
    robot.mouseToggle("up");
    ws.send(`draw_rectangle_with${x}_and${y}px_length\0`);
  },
  draw_square: (x: number, ws: any): void => {
    const mousePos = robot.getMousePos();
    const square = [
      { x: mousePos.x + x, y: mousePos.y },
      { x: mousePos.x + x, y: mousePos.y + x },
      { x: mousePos.x, y: mousePos.y + x },
      { x: mousePos.x, y: mousePos.y },
    ];
    robot.setMouseDelay(500);
    robot.mouseToggle("down");
    square.forEach((el) => {
      robot.mouseToggle("down");
      robot.dragMouse(el.x, el.y);
    });
    robot.mouseToggle("up");
    ws.send(`draw_square_with${x}px_length\0`);
  },
  prnt_scrn: (ws: any) => {
    var size = 200;
    const mousePos = robot.getMousePos();
    const screenCapture = robot.screen.capture(
      mousePos.x,
      mousePos.y,
      size,
      size
    );
    const redDot =
      "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";
    // ws.send(`prnt_scrn ${screenCapture.image.toString("base64")}\0`);
    // const test = Jimp.read(screenCapture.image);
    // console.log(test);

    ws.send(`prnt_scrn ${redDot}\0`);
    ws.send(`prnt_scrn\0`);
  },
};
