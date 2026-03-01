"use client";

import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Entry } from "@/lib/types";

interface AddEntryDialogProps {
  onAdd: (entry: Entry) => Promise<boolean>;
  lastEntry?: Entry;
}

const todayISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const FIELDS = [
  { id: "date", label: "Date", type: "date" },
  { id: "weight", label: "Weight (lbs)", type: "number" },
  { id: "bmi", label: "BMI", type: "number" },
  { id: "waist", label: "Waist (inches)", type: "number" },
] as const;

const defaults = (lastEntry?: Entry) => ({
  date: todayISO(),
  weight: lastEntry?.weight.toString() ?? "",
  bmi: lastEntry?.bmi.toString() ?? "",
  waist: lastEntry?.waist.toString() ?? "",
});

export const AddEntryDialog = ({ onAdd, lastEntry }: AddEntryDialogProps) => {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState(defaults(lastEntry));

  const updateField = (id: string, value: string) => setValues((prev) => ({ ...prev, [id]: value }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const weight = parseFloat(values.weight);
    const bmi = parseFloat(values.bmi);
    const waist = parseFloat(values.waist);
    if (isNaN(weight) || isNaN(bmi) || isNaN(waist)) return;

    const ok = await onAdd({ date: values.date, weight, bmi, waist });
    if (!ok) return;

    setValues(defaults(lastEntry));
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (next) setValues(defaults(lastEntry));
        setOpen(next);
      }}
    >
      <DialogTrigger asChild>
        <Button size="lg">Add Entry</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Entry</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {FIELDS.map(({ id, label, type }) => (
            <div key={id} className="flex flex-col gap-2">
              <Label htmlFor={id}>{label}</Label>
              <Input
                id={id}
                type={type}
                step={type === "number" ? "0.1" : undefined}
                value={values[id]}
                onChange={(e) => updateField(id, e.target.value)}
                required
              />
            </div>
          ))}
          <Button type="submit" className="mt-2">
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
