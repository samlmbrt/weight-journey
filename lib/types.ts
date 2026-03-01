export interface Entry {
  date: string;
  weight: number;
  bmi: number;
  waist: number;
}

export type Metric = "weight" | "bmi" | "waist";

export const METRIC_CONFIG = {
  weight: { label: "Weight", unit: "lbs", color: "#2563eb" },
  bmi: { label: "BMI", unit: "", color: "#16a34a" },
  waist: { label: "Waist", unit: "in", color: "#dc2626" },
} as const satisfies Record<Metric, { label: string; unit: string; color: string }>;

export const METRICS = Object.keys(METRIC_CONFIG) as Metric[];
