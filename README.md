# Weight Journey

A simple web app to visually track your weight loss journey over three metrics: weight (lbs), BMI, and waist size (inches).

Built with Next.js, Recharts, Tailwind CSS, and shadcn/ui. Data is stored locally in a JSON file — no database needed.

## Demo

<!-- TODO: Replace with your video/gif -->

https://github.com/user-attachments/assets/PLACEHOLDER

## Getting Started

```bash
npm install
```

### Development

```bash
npm run dev
```

### Production

```bash
npm run build
npm run start
```

Then open [http://localhost:3000](http://localhost:3000).

## Tracking Your Data

Your data lives in `data/entries.json`. This file is gitignored so your personal data stays private.

To get started, create the file with an empty array:

```bash
echo '[]' > data/entries.json
```

Or copy the example data to see how it looks:

```bash
cp data/entries.example.json data/entries.json
```

You can also skip this step entirely — the app will create the file automatically when you add your first entry.

Each entry has four fields:

```json
{
  "date": "2026-03-01",
  "weight": 185.0,
  "bmi": 26.5,
  "waist": 34.0
}
```

You can add entries through the app's "Add Entry" button, or edit the JSON file directly.
