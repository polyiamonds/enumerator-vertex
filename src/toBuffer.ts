import { Coord } from "./util/coord";

export function toBuffer(input: Coord[]): Buffer {
  const buffer = Buffer.alloc(input.length * 2);

  input.forEach((coord, index) => {
    const [x, y] = coord;

    if (
      x < 0 ||
      x > 255 ||
      y < 0 ||
      y > 255 ||
      x !== Math.floor(x) ||
      y !== Math.floor(y)
    ) {
      throw new Error(
        `x and y values must be 8-bit unsigned integers (0-255). Got x: ${x}, y: ${y}`
      );
    }

    buffer.writeUInt8(x, index * 2);
    buffer.writeUInt8(y, index * 2 + 1);
  });

  return buffer;
}
