# Food Inspection Web Application

A small web application for recording food stall inspections. It helps an inspector enter stall information, check food sanitation items, review the result, and export saved inspections as an Excel report.

## Screenshots

Screenshots are not included in this repository yet.

## Key Features

- Select a market type and inspection location.
- Enter stall, owner, food type, and phone information.
- Review 15 food sanitation checklist items.
- Mark each item as passed, failed, or not applicable.
- Mark critical checklist items and show a failed result when a critical item fails.
- Add custom advice to an inspection.
- Save multiple inspections in the current browser session.
- Edit or delete saved inspections.
- Export inspections grouped by location as an Excel workbook.

## Tech Stack

- React 19
- TypeScript
- Vite
- CSS
- SheetJS loaded from its CDN at export time
- ESLint

## Project Structure

```text
.
├── public/                 # Public icons and favicon
├── src/
│   ├── App.tsx             # Main inspection form and application state
│   ├── ChecklistItem.tsx   # One checklist item and its status buttons
│   ├── ResultPanel.tsx     # Overall inspection result
│   ├── TableView.tsx       # Saved inspection table
│   ├── App.css             # Application styles
│   └── index.css            # Global styles
├── design-system/          # Project design notes
├── .env.example            # Safe environment variable example
├── package.json            # Scripts and dependencies
└── vite.config.ts          # Vite configuration
```

## AI-Assisted Development

ChatGPT and Codex were used to assist with coding, debugging, code review, testing, and improving the project documentation and repository setup. The project was not built entirely by AI; the application decisions and implementation were reviewed and adjusted by the developer.

## Getting Started / Run Locally

### Requirements

- Node.js 20.19+ or 22.12+
- npm

### Install and run

```bash
npm install
npm run dev
```

Open the local URL shown by Vite in your browser.

### Create a production build

```bash
npm run build
npm run preview
```

## Environment Variables

The current application does not require environment variables. The `.env.example` file is included as a safe template for future configuration and does not contain real credentials.

Never commit `.env` files, API keys, access tokens, passwords, private keys, or other secrets.

## Testing / Checks

This project does not currently include an automated test suite. The available checks are:

```bash
npm run lint
npm run build
```

`npm run lint` checks the source code with ESLint. `npm run build` runs the TypeScript build and creates the Vite production output.
