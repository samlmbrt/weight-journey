"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Entry } from "@/lib/types";

interface AddEntryDialogProps {
  onAdd: (entry: Entry) => void;
}

const todayISO = () => new Date().toISOString().split("T")[0];

const FIELDS = [
  { id: "date", label: "Date", type: "date" },
  { id: "weight", label: "Weight (lbs)", type: "number" },
  { id: "bmi", label: "BMI", type: "number" },
  { id: "waist", label: "Waist (inches)", type: "number" },
] as const;

export const AddEntryDialog = ({ onAdd }: AddEntryDialogProps) => {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({ date: todayISO(), weight: "", bmi: "", waist: "" });

  const updateField = (id: string, value: string) => setValues((prev) => ({ ...prev, [id]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      date: values.date,
      weight: parseFloat(values.weight),
      bmi: parseFloat(values.bmi),
      waist: parseFloat(values.waist),
    });
    setValues({ date: todayISO(), weight: "", bmi: "", waist: "" });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
