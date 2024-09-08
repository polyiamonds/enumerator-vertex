import { SymmetryGroup } from "@prisma/client";
import { canonizeFixed } from "./canonizeFixed";
import { flipX } from "./flipX";
import { rotate } from "./rotate";
import { toBuffer } from "./toBuffer";
import { bufferEqual } from "./util/bufferEqual";
import { Coord } from "./util/coord";

export function canonizeFree(
  fixed: Coord[]
): [buffer: Buffer, symmetryGroup: SymmetryGroup] {
  const canonized = canonizeFixed(fixed);
  const c60 = canonizeFixed(rotate(fixed));
  const c120 = canonizeFixed(rotate(c60));
  const c180 = canonizeFixed(rotate(c120));
  const c240 = canonizeFixed(rotate(c180));
  const c300 = canonizeFixed(rotate(c240));
  const flipped = canonizeFixed(flipX(fixed));
  const f60 = canonizeFixed(rotate(flipped));
  const f120 = canonizeFixed(rotate(f60));
  const f180 = canonizeFixed(rotate(f120));
  const f240 = canonizeFixed(rotate(f180));
  const f300 = canonizeFixed(rotate(f240));
  const canonizedBuffer = toBuffer(canonized);
  const c60Buffer = toBuffer(c60);
  const c120Buffer = toBuffer(c120);
  const c180Buffer = toBuffer(c180);
  const c240Buffer = toBuffer(c240);
  const c300Buffer = toBuffer(c300);
  const flippedBuffer = toBuffer(flipped);
  const f60Buffer = toBuffer(f60);
  const f120Buffer = toBuffer(f120);
  const f180Buffer = toBuffer(f180);
  const f240Buffer = toBuffer(f240);
  const f300Buffer = toBuffer(f300);
  const buffer = [
    canonizedBuffer,
    c60Buffer,
    c120Buffer,
    c180Buffer,
    c240Buffer,
    c300Buffer,
    flippedBuffer,
    f60Buffer,
    f120Buffer,
    f180Buffer,
    f240Buffer,
    f300Buffer,
  ].sort(Buffer.compare)[0];
  if (bufferEqual(canonizedBuffer, c60Buffer)) {
    if (
      bufferEqual(canonizedBuffer, flippedBuffer) ||
      bufferEqual(canonizedBuffer, f120Buffer) ||
      bufferEqual(canonizedBuffer, f240Buffer)
    ) {
      return [buffer, "All"];
    }
    return [buffer, "Rotation6Fold"];
  } else if (bufferEqual(canonizedBuffer, c180Buffer)) {
    if (
      bufferEqual(canonizedBuffer, flippedBuffer) ||
      bufferEqual(canonizedBuffer, f120Buffer) ||
      bufferEqual(canonizedBuffer, f240Buffer)
    ) {
      return [buffer, "Rotation2FoldMirrorAll"];
    }
    return [buffer, "Rotation2Fold"];
  } else if (
    bufferEqual(canonizedBuffer, flippedBuffer) ||
    bufferEqual(canonizedBuffer, f120Buffer) ||
    bufferEqual(canonizedBuffer, f240Buffer)
  ) {
    if (bufferEqual(canonizedBuffer, c120Buffer)) {
      return [buffer, "Rotation3FoldMirror30"];
    }
    return [buffer, "Mirror30"];
  } else if (bufferEqual(canonizedBuffer, c120Buffer)) {
    if (bufferEqual(canonizedBuffer, c180Buffer)) {
      return [buffer, "Rotation3FoldMirror0"];
    }
    return [buffer, "Rotation3Fold"];
  } else if (
    bufferEqual(canonizedBuffer, f180Buffer) ||
    bufferEqual(canonizedBuffer, f300Buffer) ||
    bufferEqual(canonizedBuffer, f60Buffer)
  ) {
    return [buffer, "Mirror0"];
  }
  return [buffer, "None"];
}
