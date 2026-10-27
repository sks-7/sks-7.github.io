# Sachin Kumar — Portfolio

Personal portfolio at https://sks-7.github.io. All content comes from the resume at
`src/Assests/Sachin_Kumar-SDE.pdf`.

## Stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · Lucide icons. No animation library:
motion uses CSS, IntersectionObserver and the View Transitions API (theme switch).

## Scripts

```bash
npm install
npm run dev        # local dev server
npm run lint       # ESLint
npm run typecheck  # TypeScript
npm run build      # type-check + production build into ./build
npm run preview    # serve ./build locally
```

## Updating content

- Text lives in typed data files under `src/data/` (`profile.ts`, `experience.ts`,
  `projects.ts`, `skills.ts`). `**bold**` markers render as emphasis.
- To update the resume, replace `src/Assests/Sachin_Kumar-SDE.pdf`. The build publishes it
  at the stable URL `/Sachin_Kumar-SDE.pdf` (see `vite.config.ts`).

## Deployment

`.github/workflows/deploy.yml` lints and builds on every push to `main` and `uat`, and
deploys to GitHub Pages from `main` only.
