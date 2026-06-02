# Ashwin Kumar Portfolio

A modern, responsive portfolio website for a Data Science, Machine Learning, and AI student. The projects section is fetched live from the GitHub API, so repositories are never hardcoded.

## Tech Stack

- React + Vite
- Tailwind CSS
- GitHub REST API

## Features

- AI-themed dark UI with neon gradients
- Responsive layout for mobile, tablet, and desktop
- Hero, About, Skills, Projects, Experience, Education, and Contact sections
- Live GitHub repository fetching
- Automatic project ranking using stars and recent activity
- Loading skeleton while GitHub data is being fetched
- Project search and language filtering
- Lightweight GitHub stats summary

## Setup

1. Install dependencies:

```bash
npm install
```

2. Update your personal details in:

`.env`

Create it from the example file:

```bash
cp .env.example .env
```

Then replace:

- `githubUsername`
- `linkedinUrl`
- `email`

You can also customize the portfolio content in:

`src/data/portfolio.js`

That file contains your bio, skill list, experience, and education content.

3. Start the dev server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

## GitHub API Notes

- Repositories are fetched from:

`https://api.github.com/users/<username>/repos?sort=updated&per_page=100`

- The app filters out forks and ranks repositories using:
  - GitHub stars
  - Recent update activity

This gives you a practical "top repositories" view without hardcoding projects.

## Deployment

### Vercel

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Use the default build settings:
   - Build command: `npm run build`
   - Output directory: `dist`

### GitHub Pages

This project uses `base: "./"` in `vite.config.js`, which makes static asset paths friendly for simple static hosting.

1. Run:

```bash
npm run build
```

2. Deploy the contents of the `dist` folder to GitHub Pages using your preferred workflow.

## Folder Structure

```text
Portfolio/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── src/
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── components/
│   │   ├── GitHubSkeleton.jsx
│   │   ├── ProjectCard.jsx
│   │   └── SectionHeading.jsx
│   └── data/
│       └── portfolio.js
└── README.md
```

## Customization Tips

- Add more sections if you want certifications, achievements, or blog links.
- If you want pinned repositories exactly, you can switch to GitHub GraphQL later with an authenticated token.
- You can replace placeholder text with your exact education and internship history whenever you're ready.
