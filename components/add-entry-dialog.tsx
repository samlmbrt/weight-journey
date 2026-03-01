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

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

export function AddEntryDialog({ onAdd }: AddEntryDialogProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(todayISO);
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState("");
  const [waist, setWaist] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    onAdd({
      date,
      weight: parseFloat(weight),
      bmi: parseFloat(bmi),
      waist: parseFloat(waist),
    });

    setWeight("");
    setBmi("");
    setWaist("");
    setOpen(false);
  }

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
          <div className="flex flex-col gap-2">
            <Label htmlFor="date">Date</Label>
            <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="weight">Weight (lbs)</Label>
            <Input
              id="weight"
              type="number"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="bmi">BMI</Label>
            <Input id="bmi" type="number" step="0.1" value={bmi} onChange={(e) => setBmi(e.target.value)} required />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="waist">Waist (inches)</Label>
            <Input
              id="waist"
              type="number"
              step="0.1"
              value={waist}
              onChange={(e) => setWaist(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="mt-2">
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
