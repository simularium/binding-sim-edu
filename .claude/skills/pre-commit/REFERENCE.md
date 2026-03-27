# Pre-Commit Reference: Check Detection & Execution

## Detecting the repo's check system

Check for these in order — use the first match found:

| File | System | Run checks with |
|------|--------|----------------|
| `lefthook.yml` | Lefthook | `npx lefthook run pre-commit` |
| `.husky/pre-commit` | Husky | Read the hook file, run its commands directly |
| `.pre-commit-config.yaml` | pre-commit (Python) | `pre-commit run --all-files` |
| `Makefile` with `lint`/`check` targets | Make | `make lint`, `make check`, etc. |
| `.github/workflows/*.yml` | GitHub Actions (no local runner) | Extract commands from workflow steps |
| `package.json` scripts | npm scripts | Run matching scripts directly |

If no hook system is found, fall back to detecting individual tools.

## Detecting individual checks

### Format

| Look for | Tool | Command |
|----------|------|---------|
| `.prettierrc*`, `prettier` in deps | Prettier | `npx prettier --write .` |
| `pyproject.toml` with `[tool.black]` | Black | `black .` |
| `pyproject.toml` with `[tool.ruff.format]` | Ruff format | `ruff format .` |

### Lint

| Look for | Tool | Command |
|----------|------|---------|
| `.eslintrc*` or `eslint` in deps | ESLint | `npx eslint --fix .` |
| `pyproject.toml` with `[tool.ruff]` | Ruff | `ruff check --fix .` |

### Type check

| Look for | Tool | Command |
|----------|------|---------|
| `tsconfig.json` | TypeScript | `bunx tsc --noEmit` |

### Test

| Look for | Tool | Command |
|----------|------|---------|
| `jest.config.*` or `jest` in deps | Jest | `npx jest` |
| `vitest.config.*` or `vitest` in deps | Vitest | `npx vitest run` |

### Build

| Look for | Tool | Command |
|----------|------|---------|
| `build` script in `package.json` | bun | `bun run build` |

## Execution order and logic

```
1. Format  (auto-fixes → re-stage changed files)
2. Lint    (auto-fixes → re-stage changed files)
3. Type check
4. Test
5. Build
```

After format and lint steps, if files were modified:
```bash
git add -u   # re-stage auto-fixed files
```

## Handling check failures

| Failure type | Action |
|-------------|--------|
| Format diff | Auto-fixed by formatter, re-stage |
| Lint auto-fixable | Auto-fixed by linter, re-stage |
| Lint error (not auto-fixable) | Read the error, fix the code, re-run |
| Type error | Read the error, fix the code, re-run |
| Test failure | Read the failure, fix the code, re-run tests |
| Build failure | Read the error, fix the code, re-run build |
| Unclear / complex failure | Stop and ask the user |

Maximum retry per check: 3 attempts. If still failing after 3, ask the user.
