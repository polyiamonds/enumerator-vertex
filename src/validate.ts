import { canonizeFree } from "./canonizeFree";
import { Coord, coord } from "./util/coord";

export function validate(
  input: Coord[]
): [ReturnType<typeof canonizeFree>] | [] {
  return new Set(input.map(coord)).size === input.length
    ? [canonizeFree(input)]
    : [];
}
