"use client";

import { useEffect, useState } from "react";
import type { Entry, Metric } from "@/lib/types";
import { MetricChart } from "@/components/metric-chart";
import { MetricSelector } from "@/components/metric-selector";
import { AddEntryDialog } from "@/components/add-entry-dialog";

const Home = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [metric, setMetric] = useState<Metric>("weight");

  useEffect(() => {
    fetch("/api/entries")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: Entry[]) => setEntries(data))
      .catch(() => {});
  }, []);

  const handleAdd = async (entry: Entry): Promise<boolean> => {
    try {
      const res = await fetch("/api/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });
      if (!res.ok) return false;
      const data = (await res.json()) as Entry[];
      setEntries(data);
      return true;
    } catch {
      return false;
    }
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
