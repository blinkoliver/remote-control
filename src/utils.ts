import { actions } from "./actions";

export const readableStream = (duplex: any) => {
  let data = "";
  return async () => {
    try {
      let chunk: any;
      while (null !== (chunk = duplex.read())) {
        data += chunk;
      }
      const [action, ...args] = data.split(" ");
      const [x, y] = args.map(Number);
      const result = await actions[action](x, y);
      duplex.write(`${result}\0`);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    } finally {
      data = "";
    }
  };
};

//deprecated
// interface Parsed {
//   command: string;
//   firstCoord: number | undefined;
//   secondCoord: number | undefined;
// }
// export const parseData = (string: string): Parsed => {
//   const arr = string.split(" ");
//   const command = arr[0];
//   const firstCoord = parseInt(arr[1]) || undefined;
//   const secondCoord = parseInt(arr[2]) || undefined;
//   return { command, firstCoord, secondCoord };
// };
// const connection = (ws: any) => {
//   ws.on("message", (data: Buffer) => {
//     const parseString: string = data.toString();
//     const parsedData = parseData(parseString);
//     if (!parsedData.firstCoord && !parsedData.secondCoord) {
//       actions[parsedData.command](ws);
//     } else if (parsedData.firstCoord && !parsedData.secondCoord) {
//       actions[parsedData.command](parsedData.firstCoord, ws);
//     } else {
//       actions[parsedData.command](
//         parsedData.firstCoord,
//         parsedData.secondCoord,
//         ws
//       );
//     }
//   });
// };
