import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const EPITAPH: string = "I asked for one last wish. This wasn't it.";

if (EPITAPH.length < 1 || EPITAPH.length > 150) {
  throw new Error(`Epitaph must be 1-150 characters, got ${EPITAPH.length}`);
}

if (EPITAPH.includes("\n") || EPITAPH.includes("\r")) {
  throw new Error("Epitaph must be a single line with no newline");
}

const outputDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });

const outputPath: string = join(outputDir, "entry.txt");
writeFileSync(outputPath, EPITAPH, "utf8");

const written: string = readFileSync(outputPath, "utf8");
if (written !== EPITAPH) {
  throw new Error("Verification failed: entry.txt does not match the epitaph");
}
