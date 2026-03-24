# Dynamic PPF Calculator

A modern, interactive web application built with React to calculate and visualize Public Provident Fund (PPF) compounding over long investment periods.

This tool helps Indian investors estimate wealth generation with dynamic inputs, financial-year based calculations, summary cards, and visual growth forecasting.

## Features

- Dynamic calculations based on monthly deposit, start year, start month, interest rate, and tenure.
- Partial first-year support for mid-financial-year starts (for example, starting in August).
- Long-term projection up to 25 years, including extension scenarios.
- Interactive chart to compare cumulative invested amount vs total wealth generated.
- Detailed yearly table with deposited amount, interest earned, and closing balance by financial year.
- Client-side only app (no backend), fast to run and simple to deploy.
- Monthly deposit capped at Rs 12,500 to align with annual PPF limit assumptions.

## Tech Stack

- Frontend Framework: [React](https://react.dev/)
- Build Tool: [Vite](https://vitejs.dev/)
- Styling: Custom CSS
- Data Visualization: [Recharts](https://recharts.org/)
- Deployment: GitHub Pages

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ppf-calculator-india.git
   cd ppf-calculator-india
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open the local URL shown in terminal (usually `http://localhost:5173`).

## Build for Production

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

## GitHub Pages Deployment

This project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that deploys `dist` to the `gh-pages` branch whenever code is pushed to `main`.

After pushing your code:

1. Go to GitHub repository **Settings** -> **Pages**
2. Set source to **Deploy from a branch**
3. Select branch: **gh-pages** and folder: **/(root)**

Your app will be published at:

`https://<your-username>.github.io/<your-repo-name>/`
