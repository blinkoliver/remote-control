import robot from "robotjs";
import Jimp from "jimp";

export const actions: any = {
  mouse_up: (y: number): string => {
    const mousePos = robot.getMousePos();
    robot.moveMouseSmooth(mousePos.x, mousePos.y - y);
    return `mouse_up_to${y}px\0`;
  },
  mouse_down: (y: number): string => {
    const mousePos = robot.getMousePos();
    robot.moveMouseSmooth(mousePos.x, mousePos.y + y);
    return `mouse_down_to${y}px\0`;
  },
  mouse_left: (x: number): string => {
    const mousePos = robot.getMousePos();
    robot.moveMouseSmooth(mousePos.x - x, mousePos.y);
    return `mouse_left_to${x}px\0`;
  },
  mouse_right: (x: number): string => {
    const mousePos = robot.getMousePos();
    robot.moveMouseSmooth(mousePos.x + x, mousePos.y);
    return `mouse_right_to${x}px\0`;
  },
  mouse_position: (): string => {
    const mousePos = robot.getMousePos();
    return `mouse_position ${mousePos.x}px,${mousePos.y}px\0`;
  },
  draw_circle: (r: number): string => {
    const mousePos = robot.getMousePos();
    robot.setMouseDelay(10);
    for (let i = 0; i <= Math.PI * 2; i += 0.01) {
      const x = mousePos.x + r * Math.cos(i);
      const y = mousePos.y + r * Math.sin(i);
      robot.mouseToggle("down");
      robot.dragMouse(x, y);
    }
    robot.mouseToggle("up");
    return `draw_circle_with${r}px_radius\0`;
  },
  draw_rectangle: (x: number, y: number): string => {
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
    return `draw_rectangle_with${x}_and${y}px_length\0`;
  },
  draw_square: (x: number): string => {
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
    return `draw_square_with${x}px_length\0`;
  },
  prnt_scrn: async () => {
    const mousePos = robot.getMousePos();
    const size = 200;
    const screenCaptureBitmap = robot.screen.capture(
      mousePos.x - size,
      mousePos.y - size,
      size * 2,
      size * 2
    );
    const img = new Jimp(size * 2, size * 2, (err: any, img: any) => {
      if (err) {
        return `out_of_range\0`;
      }
    });
    let pos = 0;
    img.scan(0, 0, img.bitmap.width, img.bitmap.height, (x, y, idx) => {
      img.bitmap.data[idx + 2] = screenCaptureBitmap.image.readUInt8(pos++);
      img.bitmap.data[idx + 1] = screenCaptureBitmap.image.readUInt8(pos++);
      img.bitmap.data[idx + 0] = screenCaptureBitmap.image.readUInt8(pos++);
      img.bitmap.data[idx + 3] = screenCaptureBitmap.image.readUInt8(pos++);
    });
    const base64 = await img.getBase64Async(img.getMIME());
    return `prnt_scrn ${base64.replace("data:image/png;base64,", "")}\0`;
  },
};
