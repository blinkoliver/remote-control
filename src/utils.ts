interface Parsed {
  command: string;
  firstCoord: string | undefined;
  secondCoord: string | undefined;
}
export const parseData = (string: string): Parsed => {
  const arr = string.split(" ");
  const command = arr[0];
  const firstCoord = arr[1] || undefined;
  const secondCoord = arr[2] || undefined;
  return { command, firstCoord, secondCoord };
};
