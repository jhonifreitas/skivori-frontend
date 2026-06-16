# Skivori Frontend

Frontend of **Lucky Slots**, a slot machine app built with [Next.js](https://nextjs.org) (App Router). It consumes a REST back-end and provides:

- A searchable list of games (server-side filtering with debounced input).
- A 3-reel slot machine with coin balance and rewards.
- Currency exchange of the balance for display purposes.

## Tech Stack

- Next.js 16 + React 19 (App Router, Server Actions)
- TypeScript
- Tailwind CSS 4 + shadcn/ui (Radix)
- TanStack React Query
- Zustand (state management)

## Requirements

- Node.js 20+
- Yarn

## Setup

1. Install dependencies:

```bash
yarn install
```

2. Create a `.env` file from the provided sample:

```bash
cp .env.sample .env
```

3. Fill in the variables:

```bash
# Generate with: openssl rand -base64 32
API_BASE_URL="http://localhost:3333"
API_TOKEN="your-api-token"
```

| Variable       | Description                                      |
| -------------- | ------------------------------------------------ |
| `API_BASE_URL` | Base URL of the back-end REST API.               |
| `API_TOKEN`    | Bearer token sent in authenticated API requests. |

## Running

Start the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script       | Description                   |
| ------------ | ----------------------------- |
| `yarn dev`   | Start the development server. |
| `yarn build` | Create a production build.    |
| `yarn start` | Run the production build.     |
| `yarn lint`  | Run ESLint.                   |

## Project Structure

```
src/
├── app/              # App Router pages, layout and providers
├── components/       # UI and feature components (game-list, slot-machine, header, ...)
├── hooks/            # Reusable hooks (e.g. use-debounce)
└── lib/
    ├── apis/         # REST API clients (game, user) using Server Actions
    ├── store/        # Zustand stores
    └── utils/        # Helpers (format, fire-confetti, ...)
```

## AI-Assisted Development

This project was developed using [Cursor](https://cursor.com) as the AI tool throughout the entire development process.

The workflow always followed the same cycle: **planning → clarifying doubts → executing tasks**. No feature was implemented without first understanding the requirements and defining an approach.

Cursor was used in three modes:

| Mode | Purpose |
| ---- | ------- |
| **Plan** | Planning tasks, breaking down requirements, and defining the implementation strategy before writing any code. |
| **Ask** | Asking questions, clarifying requirements, and resolving doubts about the codebase, APIs, and technical decisions. |
| **Agent** | Executing planned tasks autonomously — from scaffolding components to refactors and bug fixes. |

AI assistance was applied across the following areas:

- **Commits** — generating commit messages and organizing changes into logical units.
- **Layout & UI** — creating visually appealing interfaces and component structure focused on user experience.
- **Comments** — adding documentation to non-obvious logic where it improved readability.
- **Autocomplete** — accelerating routine coding with context-aware suggestions.
- **Bug fixes** — diagnosing and resolving issues found during development.

## Docker

Build and run the app in a container:

```bash
docker build -t skivori-frontend .
docker run -p 3000:3000 --env-file .env skivori-frontend
```
