import { Coord } from "./util/coord";

export function flipX(input: Coord[]): Coord[] {
  return input.map(flipXCoord);
}

function flipXCoord([x, y]: Coord): Coord {
  const x0Mul2 = Math.floor((y - 1) / 2);
  return [-x + x0Mul2, y];
}
