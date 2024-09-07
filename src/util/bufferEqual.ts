export function bufferEqual(a: Buffer, b: Buffer): boolean {
  return a.compare(b) === 0;
}
