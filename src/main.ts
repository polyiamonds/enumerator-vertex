import { fromBuffer } from "./fromBuffer";
import { prisma } from "./prisma";
import { toBuffer } from "./toBuffer";
import { Coord } from "./util/coord";
import { range } from "./util/range";
import { validate } from "./validate";

export async function main(upTo: number): Promise<void> {
  const {
    _max: { n: last },
  } = await prisma.polyiamond.aggregate({ _max: { n: true } });

  for (const i of range(last ?? 1, upTo + 1)) {
    if (i === 1) {
      const trivialOnlySolution: Coord[] = [[0, 1]];
      const buffer = toBuffer(trivialOnlySolution);
      await prisma.polyiamond.upsert({
        where: { canonized_form: buffer },
        create: { n: i, canonized_form: buffer, symmetry_group: "All" },
        update: {},
      });
    } else {
      while (true) {
        const job = await prisma.polyiamond.findFirst({
          where: { n: i - 1, is_processed_for_next: false },
        });
        if (!job) break;
        await prisma.$transaction(async (tx) => {
          const previous = fromBuffer(job.canonized_form);
          for (const [buffer, symmetryGroup] of Array.from(
            new Array(previous.length)
          ).flatMap((_, i) => [
            ...validate([
              ...previous,
              previous[i][1] % 2 === 0
                ? [previous[i][0] + 1, previous[i][1] + 1]
                : [previous[i][0] - 1, previous[i][1] - 1],
            ]),
            ...validate([...previous, [previous[i][0], previous[i][1] + 1]]),
            ...validate([...previous, [previous[i][0], previous[i][1] - 1]]),
          ])) {
            await prisma.polyiamond.upsert({
              where: { n: i, canonized_form: buffer },
              create: {
                n: i,
                canonized_form: buffer,
                symmetry_group: symmetryGroup,
              },
              update: {},
            });
          }
          await prisma.polyiamond.update({
            where: { canonized_form: job.canonized_form },
            data: { is_processed_for_next: true },
          });
        });
      }
    }
  }
}
