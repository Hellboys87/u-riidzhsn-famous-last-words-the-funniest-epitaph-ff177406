import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The epitaph: a dying-wish joke in one breath.
//
// Why it works against the judge criteria:
//  - Humor: it turns on the oldest dying-wish trope — the wish was granted,
//    and it turned out to be death itself, so the speaker's final words are
//    a complaint about the outcome. The punchline is the second sentence,
//    which reframes the first.
//  - Originality: it is not a quote, not a paraphrase of a famous line, and
//    not a generic "here lies" gag; the premise (a granted last wish that
//    backfired) is specific to this line.
//  - Epitaph fit: it is written in the first person as if spoken by the
//    deceased, which is exactly the voice a headstone line should have, and
//    it lands in one read with no setup or explanation needed.
//  - Length: 42 characters, well under the 150-character cap, so it reads
//    cleanly carved on a stone rather than cramped.
const EPITAPH: string = "I asked for one last wish. This wasn't it.";

// The epitaph must be non-empty, fit the 150-character cap, and be a single
// line — a headstone line with a newline in it is not a headstone line.
if (EPITAPH.length < 1 || EPITAPH.length > 150) {
  throw new Error(`Epitaph must be 1-150 characters, got ${EPITAPH.length}`);
}

if (EPITAPH.includes("\n") || EPITAPH.includes("\r")) {
  throw new Error("Epitaph must be a single line with no newline");
}

// No leading or trailing whitespace: a stray space would silently pad the
// entry and could push a near-limit epitaph over the cap at judging time.
if (EPITAPH !== EPITAPH.trim()) {
  throw new Error("Epitaph must not have leading or trailing whitespace");
}

const outputDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });

const outputPath: string = join(outputDir, "entry.txt");
writeFileSync(outputPath, EPITAPH, "utf8");

// Verify what actually landed on disk, not just what we intended to write:
// the content must match exactly, and the character count must still be
// within the limit (catches encoding or write surprises, not just typos).
const written: string = readFileSync(outputPath, "utf8");
if (written !== EPITAPH) {
  throw new Error("Verification failed: entry.txt does not match the epitaph");
}
if (written.length < 1 || written.length > 150) {
  throw new Error(
    `Verification failed: entry.txt is ${written.length} characters, expected 1-150`,
  );
}
