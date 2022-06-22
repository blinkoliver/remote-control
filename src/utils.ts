interface Parsed {
  command: string;
  firstCoord: number | undefined;
  secondCoord: number | undefined;
}
export const parseData = (string: string): Parsed => {
  const arr = string.split(" ");
  const command = arr[0];
  const firstCoord = parseInt(arr[1]) || undefined;
  const secondCoord = parseInt(arr[2]) || undefined;
  return { command, firstCoord, secondCoord };
};
