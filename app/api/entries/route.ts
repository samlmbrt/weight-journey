import { NextResponse } from "next/server";
import { readEntries, addEntry } from "@/lib/entries";
import type { Entry } from "@/lib/types";

export async function GET() {
  const entries = readEntries();
  return NextResponse.json(entries);
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<Entry>;

  if (!body.date || body.weight == null || body.bmi == null || body.waist == null) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const entry: Entry = {
    date: body.date,
    weight: body.weight,
    bmi: body.bmi,
    waist: body.waist,
  };

  const entries = addEntry(entry);
  return NextResponse.json(entries);
}
