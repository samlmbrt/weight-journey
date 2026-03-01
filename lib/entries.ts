"use server";

import fs from "node:fs/promises";
import path from "node:path";
import type { Entry } from "./types";

const DATA_PATH = path.join(process.cwd(), "data", "entries.json");

export const readEntries = async (): Promise<Entry[]> => {
  const raw = await fs.readFile(DATA_PATH, "utf-8");
  return JSON.parse(raw) as Entry[];
};

export const addEntry = async (entry: Entry): Promise<Entry[]> => {
  const entries = await readEntries();
  entries.push(entry);
  entries.sort((a, b) => a.date.localeCompare(b.date));
  await fs.writeFile(DATA_PATH, JSON.stringify(entries, null, 2) + "\n");
  return entries;
};
