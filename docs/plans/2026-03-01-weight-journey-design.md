# Weight Journey — Design

## Purpose

A simple web app to visually track weight loss progress over three metrics: weight (lbs), BMI, and waist size (inches).

## Tech Stack

- **Framework:** Next.js (React + TypeScript)
- **Charts:** Recharts
- **Styling:** Tailwind CSS + shadcn/ui
- **Data storage:** JSON file on disk (`data/entries.json`)
- **Data access:** Next.js API Routes (GET to read, POST to write)

## Data Model

File: `data/entries.json`

Sorted array of entry objects (ascending by date):

```json
[
  { "date": "2026-03-01", "weight": 185.4, "bmi": 26.1, "waist": 34.5 }
]
```

- `date` — ISO string (YYYY-MM-DD)
- `weight` — pounds (decimal)
- `bmi` — decimal
- `waist` — inches (decimal)
- New entries inserted in sorted position

## API Routes

- `GET /api/entries` — reads and returns the JSON file contents
- `POST /api/entries` — accepts a new entry object, inserts it in sorted order, writes back to file

## UI Structure

- **Top:** Metric selector — toggle between Weight, BMI, Waist (or show all). Exact component TBD (tabs, segmented control, toggle buttons).
- **Center:** Line chart taking up most of the viewport. Displays the selected metric(s) over time. X-axis is date, Y-axis scales per metric.
- **Bottom:** Centered "Add Entry" button. Opens a shadcn/ui dialog with fields for date, weight, BMI, and waist. On save, POSTs to the API and refreshes the chart.

## Notes

- Visual design will be iterated on — this is a functional starting point
- One chart displayed at a time (based on selector), since each metric has different y-axis units/scales
