import { Coord } from "./util/coord";

export function fromBuffer(buffer: Buffer): Coord[] {
  const result: Coord[] = [];

  if (buffer.length % 2 !== 0) {
    throw new Error("Malformed buffer");
  }

  for (let i = 0; i < buffer.length; i += 2) {
    const x = buffer.readUInt8(i);
    const y = buffer.readUInt8(i + 1);
    result.push([x, y]);
  }

  return result;
}
