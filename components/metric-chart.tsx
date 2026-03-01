"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { Entry } from "@/lib/types";

export type Metric = "weight" | "bmi" | "waist";

export const METRIC_CONFIG = {
  weight: { label: "Weight", unit: "lbs", color: "#2563eb" },
  bmi: { label: "BMI", unit: "", color: "#16a34a" },
  waist: { label: "Waist", unit: "in", color: "#dc2626" },
} as const satisfies Record<Metric, { label: string; unit: string; color: string }>;

interface MetricChartProps {
  data: Entry[];
  metric: Metric;
}

export const MetricChart = ({ data, metric }: MetricChartProps) => {
  const config = METRIC_CONFIG[metric];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis domain={["auto", "auto"]} label={{ value: config.unit, angle: -90, position: "insideLeft" }} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey={metric}
          stroke={config.color}
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
