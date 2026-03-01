"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { type Entry, type Metric, METRIC_CONFIG } from "@/lib/types";

interface MetricChartProps {
  data: Entry[];
  metric: Metric;
}

export const MetricChart = ({ data, metric }: MetricChartProps) => {
  const { unit, color } = METRIC_CONFIG[metric];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis domain={["auto", "auto"]} label={{ value: unit, angle: -90, position: "insideLeft" }} />
        <Tooltip />
        <Line type="monotone" dataKey={metric} stroke={color} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};
