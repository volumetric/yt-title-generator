# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development (runs Convex backend + Vite frontend concurrently)
npm run dev

# Build
npm run build

# Lint
npm run lint

# Format
npm run format
```

## Architecture

This is a YouTube title generator app using:
- **Frontend**: React 19 + TanStack Router + TanStack Start + Tailwind CSS v4
- **Backend**: Convex (serverless backend with real-time sync)
- **Build**: Vite 7

### Key Integration Patterns

**Convex + TanStack Query**: The app uses `@convex-dev/react-query` to integrate Convex with TanStack Query. See `src/router.tsx` for the setup pattern using `ConvexQueryClient`.

**File-based routing**: Routes are in `src/routes/` using TanStack Router's file-based routing. The route tree is auto-generated in `src/routeTree.gen.ts`.

**Convex functions**: Backend functions live in `convex/`. Use `query`/`mutation`/`action` for public APIs and `internalQuery`/`internalMutation`/`internalAction` for private functions.

### Convex Guidelines

- Always include argument and return validators for all Convex functions
- Use `v.null()` as return validator when function returns nothing
- Use `withIndex()` instead of `filter()` for queries
- Import function references from `convex/_generated/api` (`api` for public, `internal` for private)
- Add `"use node";` at top of files using Node.js built-in modules in actions
- See `.cursor/rules/convex_rules.mdc` for comprehensive Convex patterns
