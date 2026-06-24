# binding-sim-edu — Claude Code Guidelines

An educational web app for exploring molecular binding simulations, built for the Allen Institute for Cell Science. Runs interactive binding simulations via the Simularium viewer, guides students through experiments, and displays analysis results (concentration plots, equilibrium graphs).

---

## Quick Reference

```
binding-sim-edu/
├── CLAUDE.md                    <- this file
├── docs/CONTEXT_ORGANIZATION.md <- context/state architecture docs
├── src/
│   ├── components/              <- UI components
│   ├── hooks/                   <- React hooks (incl. useSimulationContext.ts)
│   ├── simulation/              <- simulation engine logic
│   ├── constants/               <- app constants
│   ├── content/                 <- module content / copy
│   ├── types/                   <- shared TypeScript types
│   └── utils/                   <- pure utility functions
└── .claude/skills/              <- Claude Code skills
```

---

## State Architecture

Context is split into three providers — see `docs/CONTEXT_ORGANIZATION.md` for full details:
- **SimulariumUiContext** — page, module, section, viewport type, quiz, progression, completed modules
- **SimulariumSimulationContext** — playback, controller, trajectory, concentrations, agents, handlers
- **SimulariumAnalysisContext** — recorded concentrations, analysis reset

Always import via the typed hooks, not `useContext` directly:
```tsx
import { useSimulariumUi, useSimulariumSimulation, useSimulariumAnalysis } from "../hooks/useSimulationContext";
```

---

## Build Commands

| What       | Command             |
| ---------- | ------------------- |
| Dev server | `bun run dev`       |
| Build      | `bun run build`     |
| Lint       | `bun run lint`      |
| Type check | `bunx tsc --noEmit` |

---

## Code Standards

### General
- Prefer editing existing files over creating new ones
- No speculative abstractions — build for what's needed now
- No commented-out code
- No `console.log` / debug prints left in production code
- Destructured keys in alphabetical order (imports, params, props)

### TypeScript / React
- All public APIs must have explicit types
- Prefer `interface` over `type` for object shapes
- No `any` — use `unknown` + narrowing if type is genuinely unknown
- Components own their props types — don't scatter them into shared types files
- Custom hooks for shared stateful logic, plain functions for shared pure logic
- Co-locate component, styles, and tests in the same directory

### Import order
External libs → internal aliases → relative imports, each group alphabetical.

