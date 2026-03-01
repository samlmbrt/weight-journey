"use client";

import { useEffect, useState } from "react";
import { MetricChart, type Metric } from "@/components/metric-chart";
import { MetricSelector } from "@/components/metric-selector";
import { AddEntryDialog } from "@/components/add-entry-dialog";
import type { Entry } from "@/lib/types";

const Home = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [metric, setMetric] = useState<Metric>("weight");

  useEffect(() => {
    fetch("/api/entries")
      .then((res) => res.json())
      .then((data) => setEntries(data));
  }, []);

  const handleAdd = async (entry: Entry) => {
    const res = await fetch("/api/entries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entry),
    });
    const data = (await res.json()) as Entry[];
    setEntries(data);
  };

  return (
    <main className="flex flex-col h-screen p-6 gap-4">
      <MetricSelector selected={metric} onSelect={setMetric} />
      <div className="flex-1 min-h-0 w-full">
        <MetricChart data={entries} metric={metric} />
      </div>
      <div className="flex justify-center">
        <AddEntryDialog onAdd={handleAdd} />
      </div>
    </main>
  );
};

export default Home;
