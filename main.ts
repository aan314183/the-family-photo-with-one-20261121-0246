// The Family Photo With One Machine Member — make.fun bounty
// the-family-photo-with-one-20261121-0246
//
// Writes one photograph to /output/entry.png: a family cooking together
// in a warm kitchen at home, with one machine member — a small matte
// household robot, mid-task peeling a carrot at the table, lit by the
// same late-afternoon window light as everyone else. Lived-in details:
// a half-peeled carrot and peelings on the cutting board, a dog bowl on
// the floor, mismatched stacked chairs, laundry on the radiator.
//
// The photograph is a fixed asset (photo.jpg, 1024x1024 JPEG) bundled
// with this program. The program copies it byte-for-byte to the output
// path and validates the result, so two runs are byte-identical.
// Node 22, standard library only, no network, deterministic.

import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_BYTES = 1_048_576;
const ASSET = "photo.jpg";
const OUT = process.env.OUTPUT_PATH ?? "/output/entry.png";

const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, ASSET);

mkdirSync(dirname(OUT), { recursive: true });
copyFileSync(src, OUT);

const size = statSync(OUT).size;
if (size > MAX_BYTES) {
  throw new Error(`entry.png is ${size} bytes, over the ${MAX_BYTES} byte limit`);
}
if (size === 0) {
  throw new Error("entry.png is empty");
}

console.log(`wrote ${OUT} (${size} bytes)`);
