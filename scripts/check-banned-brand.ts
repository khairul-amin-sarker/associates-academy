import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";

const root = process.cwd();
const blocked = [
  "SGFiaWJ1bGxhaCBBc3NvY2lhdGVz",
  "aGFiaWJ1bGxhaGFzc29jaWF0ZXM=",
  "YnkgSGFiaWJ1bGxhaA==",
].map((value) => Buffer.from(value, "base64").toString("utf8").toLowerCase());
const ignored = new Set([
  ".git",
  ".next",
  ".vercel",
  "node_modules",
  "playwright-report",
  "test-results",
]);
const textExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".jsx",
  ".md",
  ".mjs",
  ".sql",
  ".svg",
  ".ts",
  ".tsx",
  ".txt",
  ".yaml",
  ".yml",
]);

async function collect(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      if (ignored.has(entry.name)) return [];
      const path = join(directory, entry.name);
      if (entry.isDirectory()) return collect(path);
      if (!textExtensions.has(extname(entry.name).toLowerCase())) return [];
      return [path];
    }),
  );
  return files.flat();
}

const failures: string[] = [];
for (const file of await collect(root)) {
  const content = (await readFile(file, "utf8")).toLowerCase();
  if (blocked.some((term) => content.includes(term)))
    failures.push(relative(root, file));
}

if (failures.length) {
  console.error(
    `Standalone brand check failed in:\n${failures.map((file) => `- ${file}`).join("\n")}`,
  );
  process.exit(1);
}

console.log("Standalone brand check passed.");
