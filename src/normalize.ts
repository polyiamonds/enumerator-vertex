import { Coord } from "./util/coord";

export function normalize(input: Coord[]): Coord[] {
  const minX = Math.min(...input.map((coord) => coord[0]));
  const minY = Math.min(...input.map((coord) => coord[1]));
  const ySub = minY - +(minY % 2 !== 0);
  return input.map(([x, y]) => [x - minX, y - ySub]);
}
