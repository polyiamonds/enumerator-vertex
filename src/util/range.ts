export function* range(from: number, toExclusive: number): Generator<number> {
  let i = from;

  while (i < toExclusive) {
    yield i;
    i++;
  }
}
