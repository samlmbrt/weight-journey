"use client";

import { type Metric, METRIC_CONFIG } from "./metric-chart";

const METRICS: Metric[] = ["weight", "bmi", "waist"];

interface MetricSelectorProps {
  selected: Metric;
  onSelect: (metric: Metric) => void;
}

export const MetricSelector = ({ selected, onSelect }: MetricSelectorProps) => {
  return (
    <div className="flex gap-2 justify-center">
      {METRICS.map((metric) => (
        <button
          key={metric}
          onClick={() => onSelect(metric)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            selected === metric
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          {METRIC_CONFIG[metric].label}
        </button>
      ))}
    </div>
  );
};
