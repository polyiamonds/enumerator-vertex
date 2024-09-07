import { normalize } from "./normalize";
import { Coord, coordComparator } from "./util/coord";

export function canonizeFixed(fixed: Coord[]): Coord[] {
  return normalize(fixed).sort(coordComparator);
}
