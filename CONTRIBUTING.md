# Contributing to Dashdeck

Thank you for your interest in contributing! This guide will help you get started.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/Santosh-Prasad-Verma/Dashdeck.git`
3. Install dependencies: `npm install`
4. Start the dev server: `npm run dev`
5. Make your changes
6. Submit a pull request

## Development

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run linter
npm run format   # Format code with Biome
```

## Project Structure

- `src/app/(main)/dashboard/` — All dashboard pages
- `src/components/ui/` — Shared shadcn/ui components
- `src/stores/` — Zustand stores for local state
- `src/navigation/` — Sidebar navigation config

## Adding a New Dashboard

1. Create a folder under `src/app/(main)/dashboard/<name>/` with a `page.tsx`
2. Add optional `_components/` folder for page-specific components
3. Add it to `src/navigation/sidebar/sidebar-items.ts`

## Code Style

- TypeScript throughout — no `any` types
- Use existing shadcn/ui components from `@/components/ui/`
- Follow the patterns in existing dashboards
- Charts use Recharts with the `ChartContainer` wrapper
- Client-side state uses Zustand with localStorage persistence

## Pull Request Guidelines

- Keep changes focused and small
- Follow existing code patterns
- Test your changes by running `npm run dev` and `npm run build`
- No backend/database changes — this project is client-side only

## Questions?

Open an issue on GitHub or join the discussion.
