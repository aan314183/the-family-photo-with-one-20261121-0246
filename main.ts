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

import {
  copyFileSync,
  mkdirSync,
  readFileSync,
  renameSync,
  rmSync,
  statSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_BYTES = 1_048_576;
const MAX_DIM = 1024;
const ASSET = "photo.jpg";
const OUT = process.env.OUTPUT_PATH ?? "/output/entry.png";

function fail(message: string): never {
  throw new Error(`entry validation failed: ${message}`);
}

// Read the width/height out of a whole PNG or JPEG buffer without any
// dependency: PNG keeps them in the IHDR chunk, JPEG in its first SOF
// segment. Anything else is not a photograph this bounty accepts.
function dimensions(buf: Buffer): { width: number; height: number } {
  if (buf.length >= 24 && buf.readUInt32BE(0) === 0x89504e47) {
    if (buf.readUInt32BE(4) !== 0x0d0a1a0a || buf.toString("ascii", 12, 16) !== "IHDR") {
      fail("not a well-formed PNG");
    }
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  if (buf.length >= 4 && buf[0] === 0xff && buf[1] === 0xd8) {
    let offset = 2;
    while (offset + 9 < buf.length) {
      if (buf[offset] !== 0xff) fail("corrupt JPEG marker stream");
      const marker = buf[offset + 1];
      const length = buf.readUInt16BE(offset + 2);
      if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
        return { height: buf.readUInt16BE(offset + 5), width: buf.readUInt16BE(offset + 7) };
      }
      offset += 2 + length;
    }
    fail("no JPEG start-of-frame segment found");
  }
  fail("asset is neither PNG nor JPEG");
}

const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, ASSET);

let asset: Buffer;
try {
  asset = readFileSync(src);
} catch {
  fail(`cannot read bundled asset ${ASSET}`);
}

const { width, height } = dimensions(asset);
if (width > MAX_DIM || height > MAX_DIM) {
  fail(`dimensions ${width}x${height} exceed the ${MAX_DIM}x${MAX_DIM} limit`);
}
if (asset.length === 0 || asset.length > MAX_BYTES) {
  fail(`asset is ${asset.length} bytes, outside the 1..${MAX_BYTES} range`);
}

// The output directory may not exist yet in the grading sandbox, so
// create it first. Write via a temporary sibling and rename, so a
// failed run never leaves a half-written entry behind.
const outDir = dirname(OUT);
mkdirSync(outDir, { recursive: true });
const tmp = join(outDir, `.entry-${process.pid}.tmp`);
try {
  copyFileSync(src, tmp);
  const written = statSync(tmp).size;
  if (written !== asset.length) {
    fail(`wrote ${written} bytes, expected ${asset.length}`);
  }
  renameSync(tmp, OUT);
} finally {
  try {
    rmSync(tmp, { force: true });
  } catch {
    // The temp file is already gone after a successful rename.
  }
}

const finalSize = statSync(OUT).size;
const finalDims = dimensions(readFileSync(OUT));
if (finalSize !== asset.length || finalDims.width !== width || finalDims.height !== height) {
  fail("output does not match the validated asset");
}

console.log(`wrote ${OUT} (${finalSize} bytes, ${width}x${height})`);
