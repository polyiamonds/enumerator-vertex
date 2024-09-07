import { normalize } from "./normalize";
import { Coord } from "./util/coord";

export function rotate(input: Coord[]): Coord[] {
  return normalize(input.map(rotateCoord));
}

function rotateCoord(input: Coord): Coord {
  const [inSquareGrid, isUpper] = toInSqaureGrid(input);
  const [x, y] = fromInSquareGrid(
    rotateCoordInSquareGrid(inSquareGrid),
    isUpper
  );
  if (isUpper) {
    return [x - 1, y - 1];
  } else {
    return [x, y + 1];
  }
}

type CoordInSquareGrid = [vertex: Coord, isUpper: boolean];

function toInSqaureGrid([x, y]: Coord): CoordInSquareGrid {
  const newY = y / 2;
  const realNewY = Math.floor(newY);
  return [[x, realNewY], realNewY !== newY];
}

function fromInSquareGrid([x, y]: Coord, isUpper: boolean): Coord {
  return [x, y * 2 + +isUpper];
}

function rotateCoordInSquareGrid([x, y]: Coord): Coord {
  const previousZNewY = y;
  const previousXNewZ = x - y;
  return [previousXNewZ, previousZNewY + previousXNewZ];
}
