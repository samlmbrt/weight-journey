import fs from "node:fs";
import path from "node:path";
import type { Entry } from "./types";

const DATA_PATH = path.join(process.cwd(), "data", "entries.json");

export const readEntries = (): Entry[] => {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw) as Entry[];
};

export const addEntry = (entry: Entry): Entry[] => {
  const entries = readEntries();
  entries.push(entry);
  entries.sort((a, b) => a.date.localeCompare(b.date));
  fs.writeFileSync(DATA_PATH, JSON.stringify(entries, null, 2) + "\n");
  return entries;
};
